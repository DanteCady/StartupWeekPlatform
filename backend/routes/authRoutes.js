const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


module.exports = (databasePool) => {

	// ################ Routes ################ //
	// ############################################ //

    // Route to handle user sign-in
    router.post('/sign-in', signInUser)

    // ################ Route Handlers ################ //
	// ############################################ //
  
    async function signInUser(req, res) {
        const { email } = req.body;

        // Check if registrantId is provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            // Log the query and params for debugging
            console.log('Executing query with email:', email);

            // Case-insensitive query for MySQL
            const query = 'SELECT * FROM registrants WHERE LOWER(email) = LOWER(?)';
            const [rows] = await databasePool.query(query, [email]);

            // Check if the query returned any rows
            if (!rows || rows.length === 0) {
                return res.status(404).json({ message: 'email not found' });
            }

            console.log('Sign In successful with email:', email);

            // Send success response
            return res.status(200).json({ message: 'Sign-in successful!' })
            ;

        } catch (error) {
            console.error('Error signing in:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    return router
}
