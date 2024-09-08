const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {

    // ################ Routes ################ //
	// ############################################ //

    router.get('/all', async (req, res) => {
        try {
            const query = 'SELECT * FROM events'; // Define the query
            const [events] = await databasePool.query(query); // Execute the query
            res.status(200).json(events); // Send the events data back to the client
        } catch (error) {
            // Send an error response if there's an error
        }
    }
    );


    return router;
}