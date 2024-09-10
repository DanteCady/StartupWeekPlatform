import React, {useState} from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import { BookmarkIcon, ShareIcon } from '../../assets/icons';
import useBookmarks from '../../hooks/bookmarks'; 
import moment from 'moment-timezone';
import RegistrationModal from '../global/modal';
import registerForEvent from '../../hooks/eventRegistration';

const Bookmarks = () => {
	const registrantId = localStorage.getItem('event_registrant_id'); // Fetch registrantId from localStorage
	const { bookmarkedEvents, toggleBookmark, error } = useBookmarks(registrantId); // Use custom hook to fetch and manage bookmarks
	const [openModal, setOpenModal] = useState(false); // Modal visibility state
	const [modalMode, setModalMode] = useState('info'); // Default modal mode
	const [selectedEventId, setSelectedEventId] = useState(null); // To store selected event ID

	// Show error message if any
	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	// Handle opening the modal in 'register' mode
	const handleOpenRegisterModal = (eventId) => {
		setSelectedEventId(eventId);
		setModalMode('register');
		setOpenModal(true);
	};

	// Handle registration form submission
	const handleRegistrationSubmit = async (registrantId) => {
		const result =  registerForEvent(selectedEventId, { registrantId }); // Call the hook with the selected event and registration ID
		if (result.success) {
			alert(result.message);
		} else {
			alert(result.message);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
			}}
		>
			
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Bookmarked Events
			</Typography>

			{/* Show message if no events are bookmarked */}
			{bookmarkedEvents.length === 0 ? (
				<Typography
					variant="h6"
					color="textSecondary"
					sx={{ textAlign: 'center', marginTop: 2 }}
				>
					You have no bookmarked events.
				</Typography>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
						gap: 2,
						width: '100%',
					}}
				>
					{bookmarkedEvents.map((event) => {
						const eventDateTime = moment.tz(
							`${event.date} ${event.startTime}`,
							'YYYY-MM-DD HH:mm:ss',
							'America/New_York'
						);
						const formattedDate = eventDateTime.format('MMMM Do YYYY');
						const formattedTime = eventDateTime.format('h:mm A');

						return (
							<Card
								key={event.eventId}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
									width: '100%',
								}}
							>
								<CardContent
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<Box>
										<Typography variant="h6">{event.title}</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											gutterBottom
											sx={{ marginTop: 1 }}
										>
											{event.description}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{formattedDate} at {formattedTime}
										</Typography>
									</Box>

									{/* Bookmark and Share Icons */}
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										{/* Register Button */}
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleOpenRegisterModal(event.eventId)}
											sx={{
												backgroundColor: '#f98053',
												'&:hover': {
													backgroundColor: '#f55c23',
												},
												marginRight: 2, // Add margin to separate button and icons
											}}
										>
											Register for Event
										</Button>

										<Box sx={{ display: 'flex', gap: 1 }}>
											<IconButton onClick={() => toggleBookmark(event.eventId)}>
												<BookmarkIcon
													sx={{ color: bookmarkedEvents.some((e) => e.eventId === event.eventId) ? '#f98053' : '#252b4e' }}
												/>
											</IconButton>
											{/* <IconButton>
												<ShareIcon sx={{ color: '#252b4e' }} />
											</IconButton> */}
										</Box>
									</Box>
								</CardContent>
							</Card>
						);
					})}
				</Box>
			)}
				{/* Modal */}
				<RegistrationModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				mode={modalMode}
				onSubmit={handleRegistrationSubmit} // Pass the handler to process registration
			/>
		</Box>
	);
};

export default Bookmarks;
