import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Avatar } from '@mui/material';
import Sidebar from '../../components/global/leftSideBar';
import Bookmarks from '../../components/profile/bookmarksComponent';
import EventRegistrations from '../../components/profile/registrations';
import EventCheckIns from '../../components/profile/checkIns';
import { useMediaQuery, useTheme } from '@mui/material';
import { sidebarMenuItems } from '../../constants';
import EventsComponent from '../../components/profile/eventsComponent';
import QrReader from 'react-qr-scanner';
import useCheckIn from '../../hooks/checkIn';
import { QrCodeScannerIcon } from '../../assets/icons';

const ProfilePage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [qrScannerOpen, setQrScannerOpen] = useState(false);
	const [registrantId, setRegistrantId] = useState(null); // Registrant ID
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true); 
	const {
		checkIn,
		loading: checkInLoading,
		error: checkInError,
	} = useCheckIn(); // Use check-in hook

	useEffect(() => {
		const authStatus = localStorage.getItem('event_authentication_status');
		const storedRegistrantId = localStorage.getItem('event_registrant_id');
		if (authStatus === 'authenticated' && storedRegistrantId) {
			setIsAuthenticated(true);
			setRegistrantId(storedRegistrantId);
		}
		setLoading(false); // Set loading to false after checking
	}, []);
	
	if (loading) {
		return <div>Loading...</div>; // Display a loading indicator
	}
	// Function to handle QR code scanning error
	const handleError = (err) => {
		console.error('Error scanning QR code:', err);
		setQrScannerOpen(false);
	};

	const toggleQrScanner = () => {
		setQrScannerOpen(!qrScannerOpen);
	};

	// Function to handle QR code scanning success
	const handleScanSuccess = async (data) => {
		if (data) {
			setQrScannerOpen(false);
	
			const eventId = data.text; // Get scanned eventId
			const checkedInEvents = JSON.parse(localStorage.getItem('checkedInEvents')) || [];
	
			if (checkedInEvents.includes(eventId)) {
				alert('You have already checked in for this event.');
				return;
			}
	
			if (eventId && registrantId) {
				const checkInResponse = await checkIn(eventId, registrantId);
	
				if (checkInResponse?.message === 'Check-in successful') {
					alert('Check-in successful');
					checkedInEvents.push(eventId); // Store the checked-in eventId
					localStorage.setItem('checkedInEvents', JSON.stringify(checkedInEvents));
				} else if (checkInResponse?.message === 'User has already checked in for this event') {
					alert('User has already checked in for this event.');
				} else {
					alert('Check-in failed. Please try again.');
				}
			} else {
				alert('Missing eventId or registrantId');
			}
		}
	};
	
	

	return (
		<>
			<Box
				sx={{
					paddingTop: '64px',
					paddingBottom: 8,
					overflowX: 'hidden',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
						maxWidth: isMobile ? '100%' : '1200px', // Limit max width on desktop
					}}
				>
					{/* Full-width content area */}
					<Box
						sx={{
							width: '100%',
							marginBottom: 3,
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Typography
							variant="h4"
							sx={{
								fontSize: isMobile ? '1.5rem' : '2rem',
								fontWeight: 'bold',
								textAlign: 'center',
							}}
						>
							QR Code Check-In
						</Typography>
						<Typography
							variant="body1"
							color="textSecondary"
							sx={{
								marginBottom: 3,
								fontSize: isMobile ? '.875rem' : '1.25rem',
								textAlign: 'center',
								padding: isMobile ? '0 16px' : '0',
								maxWidth: '100%',
							}}
						>
							Discover your bookmarked events and never miss out on the
							opportunities that matter most to you. Stay connected with the
							latest insights, workshops, and networking sessions, all curated
							for your growth and success. Revisit these events and continue
							your journey towards innovation and collaboration.
						</Typography>
						<Box>
							<Button onClick={toggleQrScanner}>
								<QrCodeScannerIcon
									sx={{
										height: '100px',
										width: '100px',
									}}
								/>
							</Button>
						</Box>
						{/* QR Scanner */}
						{qrScannerOpen && (
							<Box
								sx={{
									position: 'fixed',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									backgroundColor: 'rgba(0, 0, 0, 0.7)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									zIndex: 2000,
								}}
							>
								<QrReader
									delay={300}
									onError={handleError}
									onScan={handleScanSuccess}
									style={{ width: '100%' }}
									constraints={{
										video: { facingMode: 'environment' }, // Request video from the rear camera
									}}
								/>
								<Button
									variant="contained"
									color="error"
									onClick={toggleQrScanner}
									sx={{ position: 'absolute', top: '20px', right: '20px' }}
								>
									Close
								</Button>
							</Box>
						)}
						<Sidebar menuItems={sidebarMenuItems} />
					</Box>

					{/* Grid container for content layout */}
					<Grid
						container
						sx={{ width: '100%', margin: 0, justifyContent: 'center' }}
					>
						{/* EventRegistrations area */}
						<Grid item xs={12}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
									borderBottom: !isMobile ? 1 : 0,
									borderColor: 'divider',
									borderRadius: 1,
									padding: isMobile ? 1 : 2,
									maxWidth: '100%',
									overflowX: 'hidden', // Prevent horizontal scrolling
								}}
							>
								<EventsComponent />
								<EventRegistrations />
								<EventCheckIns />
								{/* <Bookmarks /> */}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>

			{checkInError && (
				<Typography sx={{ color: 'red' }}>Error: {checkInError}</Typography>
			)}
		</>
	);
};

export default ProfilePage;
