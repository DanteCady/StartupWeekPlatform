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
		const { eventId, registrationId } = req.body; // Get eventId and registrationId from the request body

		if (!eventId || !registrationId) {
			return res
				.status(400)
				.json({ error: 'Missing eventId or registrationId' }); // Validate input
		}

		try {
			// Insert the registration details into the 'registrations' table
			const query =
				'INSERT INTO events_registrations (eventId, registrationId, createdAt) VALUES (?, ?, NOW())';
			await databasePool.query(query, [eventId, registrationId]); // Execute the query

			res.status(201).json({ message: 'Registration successful' }); // Send success response
		} catch (error) {
			console.error('Error registering for the event:', error); // Log the error
			res.status(500).json({ error: 'Error registering for the event' }); // Send error response
		}
	}

	return router; // Return the router object
};
