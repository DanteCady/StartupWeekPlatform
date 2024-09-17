const { ro } = require('date-fns/locale');
const express = require('express'); // Express web server framework
const router = express.Router(); // Express router


module.exports = (databasePool) => {

	// ################ Routes ################ //
	// ############################################ //
 
    router.post('/bookmarks', createBookmark);
    router.delete('/bookmarks', deleteBookmark);
    router.get('/bookmarks/:registrantId', getBookmarks);
    router.get('/registrants', getRegistrants);    
    router.get('/registrants/:registrantId/events', getEventsForRegistrant); // New route
    router.get('/:registrantId/check-ins', getCheckInsForRegistrant);
    
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
                SELECT events.eventId, events.title, events.description, events.date, events.startTime, events.endTime, 
                FROM registrants_bookmarks 
                JOIN events ON registrants_bookmarks.eventId = events.eventId
                WHERE registrants_bookmarks.registrantId = ?`;
    
            const [rows] = await databasePool.query(query, [registrantId]);
    
            // Return an empty array if no bookmarked events found
            res.status(200).json(rows);
        } catch (err) {
            console.error(`Error getting bookmarks for registrantId ${registrantId}:`, err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    
    // Function to get all registrants with pagination and check-in count
	async function getRegistrants(req, res) {
		const { page = 0, limit = 10 } = req.query; // Default to page 0, limit 10

		try {
			// Query to get registrants and check-in count (number of events they've registered for)
			const query = `
				SELECT 
					r.id,
					r.registrantId,
					r.firstName,
					r.lastName,
					r.email,
					r.phoneNumber,
					r.affiliation,
					r.createdAt,
					COUNT(er.eventId) AS checkInCount
				FROM registrants r
				LEFT JOIN events_registrations er ON r.registrantId = er.registrantId
				GROUP BY r.id
				ORDER BY r.createdAt DESC
				LIMIT ?, ?`; // Pagination query

			// Execute the query with pagination (offset and limit)
			const [rows] = await databasePool.query(query, [parseInt(page) * parseInt(limit), parseInt(limit)]);

			// Query to get the total number of registrants for pagination purposes
			const [totalRows] = await databasePool.query('SELECT COUNT(*) as totalCount FROM registrants');
			const totalCount = totalRows[0].totalCount;

			// Send the registrants data and total count back to the client
			res.status(200).json({
				registrants: rows,
				totalCount: totalCount,
			});
		} catch (error) {
			console.error('Error fetching registrants:', error); // Log the error
			res.status(500).json({ error: 'Error fetching registrants' }); // Send an error response
		}
	}
 // Function to get events for a particular registrant
 async function getEventsForRegistrant(req, res) {
    const { registrantId } = req.params;

    try {
        const query = `
            SELECT 
                events.eventId, events.title, events.description, events.date, events.startTime, events.endTime
            FROM events 
            JOIN events_registrations ON events.eventId = events_registrations.eventId
            WHERE events_registrations.registrantId = ?
        `;

        const [events] = await databasePool.query(query, [registrantId]);

        // Return an empty array if no events are found
        res.status(200).json({ events: events || [] });
    } catch (err) {
        console.error('Error fetching events for registrant:', err);
        res.status(500).json({ error: 'Error fetching events' });
    }
}


async function getCheckInsForRegistrant(req, res) {
    const { registrantId } = req.params;

    try {
        const query = `
            SELECT 
                events.eventId, events.title, events.date, events.startTime, events.endTime
            FROM events
            JOIN events_checkins ON events.eventId = events_checkins.eventId
            WHERE events_checkins.registrantId = ?
        `;

        const [checkIns] = await databasePool.query(query, [registrantId]);

        // Return an empty array if no check-ins are found
        res.status(200).json({ checkIns: checkIns || [] });
    } catch (err) {
        console.error('Error fetching check-ins for registrant:', err);
        res.status(500).json({ error: 'Error fetching check-ins' });
    }
}


    return router
}
