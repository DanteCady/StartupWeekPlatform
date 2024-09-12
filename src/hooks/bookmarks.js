import { useState, useEffect } from 'react';
import axios from 'axios';

const useBookmarks = (registrantId) => {
	const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
	const [error, setError] = useState(null);
    const usersEndpoint = process.env.REACT_APP_USER_ENDPOINT; 

	// Fetch bookmarks from the backend when the component mounts
	useEffect(() => {
		const fetchBookmarks = async () => {
			try {
				// Fetch bookmarks using GET request with registrantId in the URL
				const response = await axios.get(`${usersEndpoint}/bookmarks/${registrantId}`);
				
				// Response to return full event details
				setBookmarkedEvents(response.data); 
			} catch (err) {
				console.error('Error fetching bookmarks:', err);
				setError('No Events Bookmarked');
			}
		};

		if (registrantId) {
			fetchBookmarks();
		}
	}, [registrantId]);

	// Toggle bookmark: Add or remove an event from the bookmarks
	const toggleBookmark = async (eventId) => {
		try {
			let updatedBookmarks;

			if (bookmarkedEvents.some(event => event.eventId === eventId)) {
				// Remove bookmark using DELETE request
				await axios.delete(`${usersEndpoint}/bookmarks`, {
					data: { registrantId, eventId },
				});
				updatedBookmarks = bookmarkedEvents.filter(event => event.eventId !== eventId);
			} else {
				// Add bookmark using POST request
				await axios.post(`${usersEndpoint}/bookmarks`, {
					registrantId,
					eventId,
				});
				
				// Fetch the full event details for the new bookmark
				const eventResponse = await axios.get(`${usersEndpoint}/events/${eventId}`);
				updatedBookmarks = [...bookmarkedEvents, eventResponse.data];
			}

			// Update the state with the new bookmarks list
			setBookmarkedEvents(updatedBookmarks);
		} catch (err) {
			console.error('Error updating bookmarks:', err);
			setError('Failed to update bookmark');
		}
	};

	return { bookmarkedEvents, toggleBookmark, error };
};

export default useBookmarks;
