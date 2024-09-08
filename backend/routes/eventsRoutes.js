const express = require('express'); // Express web server framework
const router = express.Router(); // Express router

// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {
	// ################ Routes ################ //
	// ############################################ //

	// Get all events
	router.get('/all', getAllEvents);
	// Register for an event
	router.post('/register', registerForEvent);

	// Check-in to an event
	router.post('/checkin', checkInToEvent);
	// ################ Route Handlers ################ //
	// ############################################ //
	// Get all events
	async function getAllEvents(req, res) {
		try {
			const query = 'SELECT * FROM events'; // Define the query
			const [events] = await databasePool.query(query); // Execute the query
			res.status(200).json(events); // Send the events data back to the client
		} catch (error) {
			res.status(500).json({ error: 'Error fetching events' }); // Send an error response
		}
	}

	// Register for an event
    async function registerForEvent(req, res) {
        const { eventId, registrantId } = req.body; // Get eventId and registrantId from the request body
    
        if (!eventId || !registrantId) {
            return res.status(400).json({ error: 'Missing eventId or registrantId' }); // Validate input
        }
    
        try {
            // Check if the registrant has already registered for the event
            const checkQuery = 'SELECT * FROM events_registrations WHERE eventId = ? AND registrantId = ?';
            const [existingRegistration] = await databasePool.query(checkQuery, [eventId, registrantId]);
    
            if (existingRegistration.length > 0) {
                return res.status(400).json({ error: 'You have already registered for this event' }); // Registration already exists
            }
    
            // Insert the new registration if not already registered
            const query =
                'INSERT INTO events_registrations (eventId, registrantId, registrationDate) VALUES (?, ?, NOW())';
            await databasePool.query(query, [eventId, registrantId]); // Execute the query
    
            res.status(201).json({ message: 'Registration successful' }); // Send success response
        } catch (error) {
            console.error('Error registering for the event:', error); // Log the error
            res.status(500).json({ error: 'Error registering for the event' }); // Send error response
        }
    }
    

	// Check-in to an event
async function checkInToEvent(req, res) {
    const { eventId, registrantId } = req.body; // Get eventId and registrationId from the request body

    if (!eventId || !registrantId) {
        return res.status(400).json({ error: 'Missing eventId or registrantId' }); // Validate input
    }

    try {
        // Check if the user has already checked in for this event
        const checkQuery = 'SELECT * FROM events_checkins WHERE eventId = ? AND registrantId = ?';
        const [existingCheckIn] = await databasePool.query(checkQuery, [eventId, registrantId]);

        if (existingCheckIn.length > 0) {
            return res.status(400).json({ error: 'User has already checked in for this event' });
        }

        // Insert the check-in details into the 'event_checkins' table
        const insertQuery = 'INSERT INTO events_checkins (eventId, registrantId, checkInTime) VALUES (?, ?, NOW())';
        await databasePool.query(insertQuery, [eventId, registrantId]);

        res.status(201).json({ message: 'Check-in successful' }); // Send success response
    } catch (error) {
        console.error('Error during check-in:', error); // Log the error
        res.status(500).json({ error: 'Error during check-in' }); // Send error response
    }
}

	return router; // Return the router object
};
