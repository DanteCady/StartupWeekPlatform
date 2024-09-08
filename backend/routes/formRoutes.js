const express = require('express'); // Express web server framework
const router = express.Router(); // Express router

// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {
	// ################ Routes ################ //
	// ############################################ //

	// Submit form data
	router.post('/submit', submitFormRegistration);

	// ################ Route Handlers ################ //
	// ############################################ //

	// Handle form submission
	async function submitFormRegistration(req, res) {
		try {
			const { firstName, lastName, email, phoneNumber, affiliation } = req.body;
	
			let isUnique = false;
			let registrantId = '';
			
			while (!isUnique) {
				// Generate random registration ID
				const registrationIdNumber = Math.floor(Math.random() * 10000);
				registrantId = `RSW-${firstName[0]}${lastName[0]}-${registrationIdNumber}`;
	
				// Check if the generated registrantId already exists in the database
				const checkQuery = 'SELECT * FROM registrants WHERE registrantId = ?';
				const [existingRegistrant] = await databasePool.query(checkQuery, [registrantId]);
	
				if (existingRegistrant.length === 0) {
					isUnique = true; // If no registrant with this ID, mark as unique and break the loop
				}
			}
	
			// Insert the registrant data into the database
			const query = 'INSERT INTO registrants (registrantId, firstName, lastName, email, phoneNumber, affiliation, createdAt) VALUES (?, ?, ?, ?, ? ,?, NOW())';
			const [result] = await databasePool.query(query, [
				registrantId,
				firstName,
				lastName,
				email,
				phoneNumber,
				affiliation,
			]);
	
			// Send the registration ID back to the client
			res.status(200).json({ registrantId });
		} catch (error) {
			console.error('Error during registration:', error);
			res.status(500).send(error);
		}
	}
	

	return router;
};
