import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import Sidebar from '../../components/global/leftSideBar';
import EventCheckIns from '../../components/profile/checkIns';
import { useMediaQuery, useTheme } from '@mui/material';
import { sidebarMenuItems } from '../../constants';
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
	const [checkInMessage, setCheckInMessage] = useState(''); // New state for check-in message
	const { checkIn, loading: checkInLoading, error: checkInError } = useCheckIn();

	useEffect(() => {
		const authStatus = localStorage.getItem('event_authentication_status');
		const storedRegistrantId = localStorage.getItem('event_registrant_id');
		if (authStatus === 'authenticated' && storedRegistrantId) {
			setIsAuthenticated(true);
			setRegistrantId(storedRegistrantId);
		}
		setLoading(false); // Set loading to false after checking
	}, []);

	// Function to handle QR code scanning error
	const handleError = (err) => {
		console.error('Error scanning QR code:', err);
		setQrScannerOpen(false);
		setCheckInMessage('Error scanning QR code. Please try again.');
	};

	const toggleQrScanner = () => {
		setQrScannerOpen(!qrScannerOpen);
		setCheckInMessage(''); // Clear message when toggling QR scanner
	};

	// Function to handle QR code scanning success
	const handleScanSuccess = async (data) => {
		if (data) {
			setQrScannerOpen(false);
			setCheckInMessage(''); // Clear previous message

			const eventId = data.text; // Get scanned eventId
			const checkedInEvents = JSON.parse(localStorage.getItem('checkedInEvents')) || [];

			if (checkedInEvents.includes(eventId)) {
				setCheckInMessage('You have already checked in for this event.');
				return;
			}

			if (eventId && registrantId) {
				try {
					const checkInResponse = await checkIn(eventId, registrantId);

					if (checkInResponse?.message === 'Check-in successful') {
						setCheckInMessage('Check-in successful!');
						checkedInEvents.push(eventId); // Store the checked-in eventId
						localStorage.setItem('checkedInEvents', JSON.stringify(checkedInEvents));
					} else if (checkInResponse?.message === 'User has already checked in for this event') {
						setCheckInMessage('You have already checked in for this event.');
					} else {
						setCheckInMessage('Check-in failed. Please try again.');
					}
				} catch (error) {
					setCheckInMessage(error.response?.data?.error || 'An error occurred during check-in. Please try again.');
					console.error('Error during check-in:', error);
				}
			} else {
				setCheckInMessage('Missing eventId or registrantId.');
			}
		}
	};

	return (
		<>
			<Box
				sx={{
					paddingTop: '64px',
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
							Thank you for checking in
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
							The top 3 people with the most check-ins will win amazing prizes from RI Startup Week!
						</Typography>
						<Typography variant="body2" color="textSecondary">
							Click the button below to check into a new event.
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

					<Typography variant="h6" sx={{ marginBottom: 2 }}>
						All of your event check-ins are listed below.
					</Typography>
					<EventCheckIns />
				</Box>
			</Box>

			{checkInError && (
				<Typography sx={{ color: 'red' }}>Error: {checkInError}</Typography>
			)}
		</>
	);
};

export default ProfilePage;
