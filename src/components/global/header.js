import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton, Link } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';
import { QrCodeScannerIcon } from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import QrReader from 'react-qr-scanner';

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('signin');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [qrScannerOpen, setQrScannerOpen] = useState(false);
	const [scannedData, setScannedData] = useState(null); // Store scanned QR data

	const { signIn, loading, error } = useSignIn();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		const authStatus = localStorage.getItem('event_authentication_status');
		const registrantId = localStorage.getItem('event_registrant_id');
		if (authStatus === 'authenticated') {
			setIsAuthenticated(true);
		}
	}, []);

	const handleOpenSignIn = () => {
		setModalMode('signin');
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleSignInSubmit = async (registrantId) => {
		await signIn(registrantId);
		setIsAuthenticated(true);
		window.location.reload();
	};

	const handleSignOut = () => {
		localStorage.removeItem('event_authentication_status');
		setIsAuthenticated(false);
		window.location.reload();
	};

	// Function to handle QR code scanning success
	const handleScanSuccess = (data) => {
		if (data) {
			setScannedData(data.text); // Save the scanned QR code
			setQrScannerOpen(false); // Close the QR scanner
		}
	};

	// Function to handle QR code scanning error
	const handleError = (err) => {
		console.error('Error scanning QR code:', err);
		setQrScannerOpen(false);
	};

	const toggleQrScanner = () => {
		setQrScannerOpen(!qrScannerOpen);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					backgroundColor: '#252b4e',
					height: '80px',
					position: 'fixed',
					zIndex: 1000,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-end',
						width: '100%',
						maxWidth: '1200px',
						padding: '0 20px',
					}}
				>
					{isAuthenticated ? (
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Button onClick={handleSignOut}>
								<Typography variant="h6" sx={{ color: 'white', mr: 3 }}>
									Sign Out
								</Typography>
							</Button>

							{isMobile && (
								<IconButton
									onClick={toggleQrScanner}
									sx={{ color: 'white', ml: 1 }}
								>
									<QrCodeScannerIcon />
								</IconButton>
							)}
						</Box>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
								justifyContent: 'flex-end',
								width: '100%',
							}}
						>
							<Box>
								<Typography
									sx={{
										color: 'white',
										flexGrow: 1,
										display: 'flex',
									}}
								>
									Already Registered?
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Button onClick={handleOpenSignIn}>
									<Typography variant="h6" sx={{ color: 'white', mr: 3 }}>
										Sign In
									</Typography>
								</Button>
							</Box>
						</Box>
					)}
				</Box>
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

			{/* Display the scanned data as a clickable link */}
			{scannedData && (
				<Box
					sx={{
						position: 'fixed',
						bottom: '20px',
						left: '50%',
						transform: 'translateX(-50%)',
						backgroundColor: '#fff',
						padding: '10px 20px',
						borderRadius: '10px',
						boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
					}}
				>
					<Typography variant="body1">
						<Link href={scannedData} target="_blank" rel="noopener noreferrer">
							{scannedData}
						</Link>
					</Typography>
				</Box>
			)}

			{/* Registration/Sign-In Modal */}
			<RegistrationModal
				open={modalOpen}
				onClose={handleCloseModal}
				mode={modalMode}
				onSubmit={handleSignInSubmit}
			/>

			{loading && (
				<Typography sx={{ color: 'white' }}>Signing you in...</Typography>
			)}

			{error && <Typography sx={{ color: 'red' }}>Error: {error}</Typography>}
		</>
	);
};

export default Header;
