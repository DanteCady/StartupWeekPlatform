const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


module.exports = (databasePool) => {

	// ################ Routes ################ //
	// ############################################ //

    // Route to handle user sign-in
    router.post('/bookmarks', createBookmark);
    router.delete('/bookmarks', deleteBookmark);
    router.get('/bookmarks/:registrantId', getBookmarks);
    // ################ Route Handlers ################ //
	// ############################################ //
  
    async function createBookmark(req, res) {
        const { registrantId, eventId } = req.body;
    
        if (!registrantId || !eventId) {
            return res.status(400).json({ message: 'User ID and Event ID are required' });
        }
    
        try {
            // Insert the bookmark into the database
            const query = 'INSERT INTO registrants_bookmarks (registrantId, eventId) VALUES (?, ?)';
            await databasePool.query(query, [registrantId, eventId]);
            res.status(200).json({ message: 'Bookmark added successfully!' });
        } catch (err) {
            console.error('Error adding bookmark:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async function deleteBookmark(req, res) {
        const { registrantId, eventId } = req.body;
    
        if (!registrantId || !eventId) {
            return res.status(400).json({ message: 'User ID and Event ID are required' });
        }
    
        try {
            // Delete the bookmark from the database
            const query = 'DELETE FROM registrants_bookmarks WHERE registrantId = ? AND eventId = ?';
            await databasePool.query(query, [registrantId, eventId]);
            res.status(200).json({ message: 'Bookmark deleted successfully!' });
        } catch (err) {
            console.error('Error deleting bookmark:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async function getBookmarks(req, res) {
        const { registrantId } = req.params;
    
        if (!registrantId) {
            return res.status(400).json({ message: 'Registrant ID is required' });
        }
    
        try {
            // Query to join `registrants_bookmarks` and `events` to get detailed event information
            const query = `
                SELECT events.eventId, events.title, events.description, events.date, events.startTime, events.endTime, events.image
                FROM registrants_bookmarks 
                JOIN events ON registrants_bookmarks.eventId = events.eventId
                WHERE registrants_bookmarks.registrantId = ?`;
    
            const [rows] = await databasePool.query(query, [registrantId]);
    
            if (rows.length === 0) {
                return res.status(404).json({ message: 'No bookmarked events found for this user' });
            }
    
            res.status(200).json(rows); // Send the rows with event details as the response
        } catch (err) {
            console.error('Error getting bookmarks:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    

    return router
}
