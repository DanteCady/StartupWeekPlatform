const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {

    // ################ Routes ################ //
	// ############################################ //

    router.post('/submit', async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, event, affiliation } = req.body; // Destructure the request body
            const query = 'INSERT INTO event_submissions (firstName, lastName, email, phoneNumber, event, affiliation) VALUES (?, ?, ?, ? ,? ,?)'; // SQL query to insert form data
            const [result] = await databasePool.query(query, [firstName, lastName, email, phoneNumber, event, affiliation]); // Execute the query
            res.status(200).send(result); // Send the result
        } catch (error) {
            res.status(500).send(error); // Send the error
        }
    });


    return router;
}