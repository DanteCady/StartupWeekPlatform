import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Card,
	CardContent,
	IconButton,
	ToggleButtonGroup,
	ToggleButton,
	Button,
	Pagination,
} from '@mui/material';
import {
	BookmarkBorderOutlinedIcon,
	ShareIcon,
	ViewListIcon,
	ViewModuleIcon,
	ViewModuleOutlinedIcon,
	ViewListOutlinedIcon,
	CalendarMonthIcon,
	BookmarkIcon,
} from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import { useFetchEvents } from '../../hooks/fetchEvents';
import QRCode from '../../components/dashboard/qr';
import RegistrationModal from '../global/modal';
import {useEventRegistration} from '../../hooks/eventRegistration';
import moment from 'moment-timezone';
import axios from 'axios';

const Events = () => {
	const [view, setView] = useState('grid'); // State to toggle between list and grid view
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small
	const { events, loading, error } = useFetchEvents(); // Use custom hook to fetch events
	const [openModal, setOpenModal] = useState(false); // Modal visibility state
	const [modalMode, setModalMode] = useState('info'); // Default modal mode
	const [selectedEventId, setSelectedEventId] = useState(null); // To store selected event ID
	const [bookmarkedEvents, setBookmarkedEvents] = useState([]); // State for bookmarked events
	const [registrantId, setRegistrantId] = useState(null); // State for registrantId

	const usersEndpoint = process.env.REACT_APP_USER_ENDPOINT;
	const { registerForEvent } = useEventRegistration();

	// Fetch registrantId from localStorage when the component mounts
	useEffect(() => {
		const storedRegistrantId = localStorage.getItem('event_registrant_id');
		if (storedRegistrantId) {
			setRegistrantId(storedRegistrantId);
		}
	}, []);

	// Ensure that no request is made until registrantId is set
	useEffect(() => {
		if (registrantId) {
			const fetchBookmarks = async () => {
				try {
					const response = await axios.get(`${usersEndpoint}/bookmarks/${registrantId}`);
					setBookmarkedEvents(response.data.map((bookmark) => bookmark.eventId));
				} catch (error) {
					console.error('Error fetching bookmarks:', error);
				}
			};

			fetchBookmarks();
		}
	}, [registrantId, usersEndpoint]);

	// Handle bookmarking
	const toggleBookmark = async (eventId) => {
		if (!registrantId) {
			console.error('Registrant ID is missing');
			return;
		}

		let updatedBookmarks;
		try {
			if (bookmarkedEvents.includes(eventId)) {
				// If event is already bookmarked, remove it
				await axios.delete(`${usersEndpoint}/bookmarks/${registrantId}/${eventId}`);
				updatedBookmarks = bookmarkedEvents.filter((id) => id !== eventId);
			} else {
				// If event is not bookmarked, add it
				await axios.post(`${usersEndpoint}/bookmarks`, {
					registrantId,
					eventId,
				});
				updatedBookmarks = [...bookmarkedEvents, eventId];
			}
			setBookmarkedEvents(updatedBookmarks);
		} catch (error) {
			console.error('Error updating bookmarks:', error);
		}
	};


	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const eventsPerPage = 6; // Number of events per page

	// Calculate pagination details
	const indexOfLastEvent = currentPage * eventsPerPage;
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
	const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent); // Events for the current page
	const totalPages = Math.ceil(events.length / eventsPerPage);

	// Handle page change
	const handlePageChange = (event, value) => {
		setCurrentPage(value);
	};

	// Handle opening the modal in 'register' mode
	const handleOpenRegisterModal = (eventId) => {
		setSelectedEventId(eventId);
		setModalMode('register');
		setOpenModal(true);
	};

	// Handle registration form submission
	const handleRegistrationSubmit = async (registrantId) => {
		const result = await registerForEvent(selectedEventId, { registrantId });
		if (result.success) {
		  alert(result.message);
		} else {
		  alert(result.message);
		}
	  };

	// Handle view change (list or grid)
	const handleViewChange = (event, newView) => {
		if (newView !== null) {
			setView(newView);
		}
	};

	// Show a message when no events are available
	if (!loading && events.length === 0) {
		return (
			<Typography
				variant="h6"
				color="textSecondary"
				sx={{ textAlign: 'center', marginTop: 2 }}
			>
				No events scheduled at this time.
			</Typography>
		);
	}

	// Show error message if something went wrong
	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	return (
		<Box
			sx={{
				padding: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Buttons to switch between List View and Grid View */}
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={handleViewChange}
				sx={{
					marginBottom: 2,
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<ToggleButton
					value="list"
					sx={{
						color: view === 'list' ? '#f98053' : '#252b4e',
						borderColor: 'transparent',
						'&.Mui-selected': {
							backgroundColor: 'transparent',
						},
					}}
				>
					{view === 'list' ? (
						<ViewListOutlinedIcon sx={{ color: '#f98053', marginRight: 1 }} />
					) : (
						<ViewListIcon sx={{ color: '#252b4e', marginRight: 1 }} />
					)}
					<Typography
						sx={{
							color: view === 'list' ? '#f98053' : '#252b4e',
							fontWeight: 'bold',
						}}
					>
						List
					</Typography>
				</ToggleButton>

				<ToggleButton
					value="grid"
					sx={{
						color: view === 'grid' ? '#f98053' : '#252b4e',
						borderColor: 'transparent',
						'&.Mui-selected': {
							backgroundColor: 'transparent',
						},
					}}
				>
					{view === 'grid' ? (
						<ViewModuleOutlinedIcon sx={{ color: '#f98053', marginRight: 1 }} />
					) : (
						<ViewModuleIcon sx={{ color: '#252b4e', marginRight: 1 }} />
					)}
					<Typography
						sx={{
							color: view === 'grid' ? '#f98053' : '#252b4e',
							fontWeight: 'bold',
						}}
					>
						Grid
					</Typography>
				</ToggleButton>
			</ToggleButtonGroup>

			{/* Conditional rendering based on the view */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: view === 'list' ? 'column' : 'row',
					gap: 2,
					flexWrap: 'wrap',
					minHeight: '400px', // Ensure a minimum height for the container
					justifyContent: currentEvents.length === 1 ? 'center' : 'flex-start', // Center single card
				}}
			>
				{currentEvents.map((event) => {
					const currentDateTime = moment.tz('America/New_York');

					// Correctly combine the event date and startTime in local time
					const eventDateTime = moment.tz(
						`${event.date} ${event.startTime}`,
						'YYYY-MM-DD HH:mm:ss',
						'America/New_York'
					);

					// Adjust the end date if the event ends after midnight
					const eventEndDate =
						event.startTime > event.endTime
							? moment(event.date).add(1, 'day')
							: moment(event.date);
					const eventEndTime = moment.tz(
						`${eventEndDate.format('YYYY-MM-DD')} ${event.endTime}`,
						'YYYY-MM-DD HH:mm:ss',
						'America/New_York'
					);

					// Check if the event has started or ended
					const hasEventStarted = currentDateTime.isSameOrAfter(eventDateTime);
					const hasEventEnded = currentDateTime.isSameOrAfter(eventEndTime);

					const formattedDate = eventDateTime.format('MMMM Do YYYY');
					const formattedTime = eventDateTime.format('h:mm A'); // 12-hour format with AM/PM
					const formattedEndTime = eventEndTime.format('h:mm A'); // 12-hour format with AM/PM

					return (
						<Card
							key={event.eventId}
							sx={{
								display: view === 'list' ? 'flex' : 'block',
								flexDirection: view === 'list' ? 'row' : 'column',
								gap: 2,
								width: view === 'list' ? '100%' : isMobile ? '100%' : '30%',
								minWidth: '300px', // Ensure a minimum width for the card
								height: '380px', // Set a fixed height for uniformity
								justifyContent: 'space-between',
								borderRadius: 1,
							}}
						>
							<CardContent
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									height: '100%',
								}}
							>
								{/* Title and description section */}
								<Box>
									<Typography variant="h6">{event.eventTitle}</Typography>
									<hr />
									<Typography
										variant="body2"
										color="text.secondary"
										gutterBottom
										sx={{ marginTop: 1, lineHeight: 2, color: 'black' }}
									>
										{event.description}
									</Typography>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											justifyContent: 'space-between',
											marginTop: 1,
											mr: 1,
										}}
									>
										<Typography variant="body2" color="black">
											<CalendarMonthIcon
												sx={{ fontSize: 16, marginRight: 1, color: 'black' }}
											/>
											{event.date} at {event.startTime} - {event.endTime}
										</Typography>
									</Box>
								</Box>

								{/* Conditionally show the register button or QR code */}
								{hasEventEnded ? (
									<Box
										sx={{
											marginTop: 2,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											flexGrow: 1, // Ensure the height fills evenly
										}}
									>
										<Typography variant="body1" color="error">
											Event has ended
										</Typography>
									</Box>
								) : hasEventStarted ? (
									<Box
										sx={{
											marginTop: 2,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											flexGrow: 1, // Ensure the height fills evenly
										}}
									>
										<Box
											sx={{
												height: 80,
												width: 80,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											{/* <QRCode value={registrationUrl} /> */}
										</Box>
										<Typography
											variant="body1"
											color="primary"
											sx={{ marginTop: 3 }}
										>
											Event Started, Check In now
										</Typography>
									</Box>
								) : (
									<Box
										sx={{
											marginTop: 2,
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											flexGrow: 1, // Ensure the height fills evenly
										}}
									>
										{/* Register Button */}
										{/* <Button
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
										</Button> */}

										{/* Bookmark and Share Icons */}
										{/* <Box 
										sx={{ 
											display: 'flex', 
											gap: 1, 
											justifyContent: 'flex-end' , 
											alignItems: 'flex-end'
											}}>
											<IconButton onClick={() => toggleBookmark(event.eventId)}>
												{bookmarkedEvents.includes(event.eventId) ? (
													<BookmarkIcon sx={{ color: '#f98053' }} />
												) : (
													<BookmarkBorderOutlinedIcon sx={{ color: '#252b4e' }} />
												)}
											</IconButton>
											<IconButton>
												<ShareIcon sx={{ color: '#252b4e' }} />
											</IconButton>
										</Box> */}
									</Box>
								)}
							</CardContent>
						</Card>
					);
				})}
			</Box>

			{/* Pagination Controls */}
			<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					color="primary"
				/>
			</Box>

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

export default Events;
