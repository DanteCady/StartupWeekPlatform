const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


// Module exports function that takes a database pool as an argument and returns the router object
module.exports = (databasePool) => {

    // ################ Routes ################ //
	// ############################################ //

    router.post('/submit', async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, affiliation } = req.body;
    
            // Generate random registration ID
            const registrationIdNumber = Math.floor(Math.random() * 10000);
            const registrationID = `RSW-${firstName[0]}${lastName[0]}-${registrationIdNumber}`;
    
            const query = 'INSERT INTO registrants (registrationId, firstName, lastName, email, phoneNumber, affiliation, createdAt) VALUES (?, ?, ?, ?, ? ,?, NOW())';
            const [result] = await databasePool.query(query, [registrationID, firstName, lastName, email, phoneNumber, affiliation]);
            
            // Send the registration ID back to the client
            res.status(200).json({ registrationID });
        } catch (error) {
            res.status(500).send(error);
        }
    });
    


    return router;
}