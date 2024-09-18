const express = require('express'); // Express web server framework
const router = express.Router(); // Express router
const crypto = require('crypto');
const moment = require('moment-timezone');

// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {
    // ################ Routes ################ //
    // ############################################ //

    // Get all events
    router.get('/all', getAllEvents);
    // Register for an event
    router.post('/register', registerForEvent);
    // Check-in to an event
    router.post('/check-in', checkInToEvent);
    // Create a new event
    router.post('/create', createEvent);
    // Get events by userId
    router.get('/:userId', getEventsByUser);

    // ################ Route Handlers ################ //
    // ############################################ //

    // Get all events
    async function getAllEvents(req, res) {
        try {
            // Update the query to sort by date and time in ascending order
            const query = 'SELECT * FROM events2 ORDER BY sqlDate ASC, sqlStartTime ASC';
            const [events] = await databasePool.query(query); // Execute the query
            res.status(200).json(events); // Send the events data back to the client
        } catch (error) {
            console.error('Error fetching events:', error); // Log the error
            res.status(500).json({ error: 'Error fetching events' }); // Send an error response
        }
    }

    // Register for an event
    async function registerForEvent(req, res) {
        const { eventId, registrantId } = req.body;

        // Validate the input data
        if (!eventId || typeof eventId !== 'string' || !registrantId || typeof registrantId !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing eventId or registrantId' });
        }

        try {
            // Check if the registrant has already registered for the event
            const checkQuery = 'SELECT * FROM events_registrations WHERE eventId = ? AND registrantId = ?';
            const [existingRegistration] = await databasePool.query(checkQuery, [eventId, registrantId]);

            if (existingRegistration.length > 0) {
                return res.status(400).json({ error: 'You have already registered for this event' });
            }

            // Insert the new registration if not already registered
            const query = 'INSERT INTO events_registrations (eventId, registrantId, registrationDate) VALUES (?, ?, NOW())';
            await databasePool.query(query, [eventId, registrantId]);

            return res.status(201).json({ message: 'Registration successful' });

        } catch (error) {
            console.error('Error registering for the event:', error);
            return res.status(500).json({ error: 'An internal server error occurred during registration' });
        }
    }

  // Function to handle event check-in
async function checkInToEvent(req, res) {
    const { eventId, registrantId } = req.body;

    // Check if eventId or registrantId is missing
    if (!eventId || !registrantId) {
        return res.status(400).json({ error: 'Missing eventId or registrantId' });
    }

    try {
        // Check if eventId exists in the events2 table
        const eventCheckQuery = 'SELECT * FROM events2 WHERE eventId = ?';
        const [event] = await databasePool.query(eventCheckQuery, [eventId]);

        if (event.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Optional: Check if registrantId exists in the registrants table (if applicable)
        const registrantCheckQuery = 'SELECT * FROM registrants WHERE registrantId = ?';
        const [registrant] = await databasePool.query(registrantCheckQuery, [registrantId]);

        if (registrant.length === 0) {
            return res.status(404).json({ error: 'Registrant not found' });
        }

        // Check if the registrant has already checked in for this event
        const checkInQuery =
            'SELECT * FROM events_checkins WHERE eventId = ? AND registrantId = ?';
        const [existingCheckIn] = await databasePool.query(checkInQuery, [eventId, registrantId]);

        if (existingCheckIn.length > 0) {
            return res
                .status(400)
                .json({ error: 'User has already checked in for this event' });
        }

        // Insert a new check-in record
        const insertQuery =
            'INSERT INTO events_checkins (eventId, registrantId, checkInTime) VALUES (?, ?, NOW())';
        await databasePool.query(insertQuery, [eventId, registrantId]);

        return res.status(201).json({ message: 'Check-in successful' });
    } catch (error) {
        console.error('Error during check-in:', error);

        // Optional: More specific error handling
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ error: 'Invalid foreign key. Ensure eventId and registrantId are correct.' });
        }

        return res.status(500).json({ error: 'Error during check-in' });
    }
}
    // Create a new event
    async function createEvent(req, res) {
        // Function to generate eventId in the format: rsw-event-{random 6 characters}
        function generateEventId() {
            return `rsw-event-${crypto.randomBytes(3).toString('hex')}`; // Generates a 6 character string
        }

        const { title, description, date, startTime, endTime } = req.body;

        if (!title || !date || !startTime || !endTime) {
            return res.status(400).json({
                error: 'Missing required fields: title, date, startTime, or endTime',
            });
        }

        const eventId = generateEventId(); // Generate eventId

        // Convert date to YYYY-MM-DD in EST
        const formattedDate = moment.tz(date, "America/New_York").format("YYYY-MM-DD");

        // Convert startTime and endTime to HH:MM:SS in EST
        const formattedStartTime = moment.tz(startTime, "America/New_York").format("HH:mm:ss");
        const formattedEndTime = moment.tz(endTime, "America/New_York").format("HH:mm:ss");

        try {
            const query = `
                INSERT INTO events (eventId, title, description, date, startTime, endTime)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            await databasePool.query(query, [
                eventId,
                title,
                description,
                formattedDate,        // Use the formatted date in EST
                formattedStartTime,    // Use the formatted start time in EST (HH:MM:SS)
                formattedEndTime,      // Use the formatted end time in EST (HH:MM:SS)
            ]);

            res.status(201).json({ message: 'Event created successfully', eventId });
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ error: 'Error creating event' });
        }
    }

// Get events by userId
async function getEventsByUser(req, res) {
    const { userId } = req.params;

    // Validate that userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId' });
    }

    try {
        // Query to get all events the user is registered for
        const query = `
            SELECT e.*
            FROM events_registrations er
            JOIN events e ON er.eventId = e.eventId
            WHERE er.registrantId = ?
            ORDER BY e.date ASC, e.startTime ASC
        `;

        // Execute the query
        const [events] = await databasePool.query(query, [userId]);

        // Return an empty array if no events are found (instead of 404)
        if (events.length === 0) {
            return res.status(200).json([]);
        }

        // Return the events if found
        return res.status(200).json(events);

    } catch (error) {
        console.error('Error fetching events for user:', error);
        return res.status(500).json({ error: 'An error occurred while fetching events' });
    }
}


    return router; 
};