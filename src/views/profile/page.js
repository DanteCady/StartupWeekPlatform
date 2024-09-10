import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, CircularProgress } from '@mui/material';
import { BookmarkIcon, ShareIcon, CalendarMonthIcon } from '../../assets/icons';
import { useFetchEvents } from '../../hooks/fetchEvents';
import moment from 'moment-timezone';

const Profile = () => {
	const [bookmarkedEvents, setBookmarkedEvents] = useState([]); // State for bookmarked events
	const { events, loading, error } = useFetchEvents(); // Use custom hook to fetch events

	// Load bookmarks from localStorage when component mounts
	useEffect(() => {
		const storedBookmarks = localStorage.getItem('bookmarkedEvents');
		if (storedBookmarks) {
			setBookmarkedEvents(JSON.parse(storedBookmarks));
		}
	}, []);

	// Filter bookmarked events from all events
	const filteredEvents = events.filter((event) => bookmarkedEvents.includes(event.id));

	// Handle view loading states and errors
	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	return (
		<Box sx={{ padding: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Your Bookmarked Events
			</Typography>

			{/* Show message if no events are bookmarked */}
			{filteredEvents.length === 0 ? (
				<Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
					You have no bookmarked events.
				</Typography>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{filteredEvents.map((event) => {
						const formattedDate = moment(event.date).format('MMMM Do YYYY');
						const formattedTime = moment(event.time, 'HH:mm').format('h:mm A');

						return (
							<Card key={event.id} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', minWidth: '300px' }}>
								<CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
									<Box>
										<Typography variant="h6">{event.title}</Typography>
										<hr />
										<Typography variant="body2" color="text.secondary" gutterBottom sx={{ marginTop: 1, lineHeight: 2, color: 'black' }}>
											{event.description}
										</Typography>
										<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}>
											<Typography variant="body2" color="black">
												<CalendarMonthIcon sx={{ fontSize: 16, marginRight: 1, color: 'black' }} />
												{formattedDate} at {formattedTime}
											</Typography>
										</Box>
									</Box>

									{/* Bookmark and Share Icons */}
									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<Button variant="contained" color="primary" sx={{ backgroundColor: '#f98053', '&:hover': { backgroundColor: '#f55c23' } }}>
											Register for Event
										</Button>

										<Box sx={{ display: 'flex', gap: 1 }}>
											<IconButton>
												<BookmarkIcon sx={{ color: '#f98053' }} />
											</IconButton>
											<IconButton>
												<ShareIcon sx={{ color: '#252b4e' }} />
											</IconButton>
										</Box>
									</Box>
								</CardContent>
							</Card>
						);
					})}
				</Box>
			)}
		</Box>
	);
};

export default Profile;
