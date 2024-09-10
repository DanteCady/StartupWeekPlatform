import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';

const Header = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('signin'); // State to control the mode ('signin', 'register', or 'info')
	const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status

	const { signIn, loading, error } = useSignIn(); 

	// Check authentication status when the component mounts
	useEffect(() => {
		const authStatus = localStorage.getItem('event_authentication_status');
		const registrantId = localStorage.getItem('event_registrant_id');
		if (authStatus === 'authenticated') {
			setIsAuthenticated(true);
		}
	}, []);

	// Function to open the modal in sign-in mode
	const handleOpenSignIn = () => {
		setModalMode('signin');
		setModalOpen(true);
	};

	// Function to close the modal
	const handleCloseModal = () => {
		setModalOpen(false);
	};

	// Function to handle sign-in form submission
	const handleSignInSubmit = async (registrantId) => {
		await signIn(registrantId); // Use the signIn function from hook
		setIsAuthenticated(true);  // Update authentication status after sign-in
		window.location.reload(); // Refresh the page
	};

	// Function to handle sign-out
	const handleSignOut = () => {
		localStorage.removeItem('event_authentication_status'); // Clear local storage
		setIsAuthenticated(false); // Update state
		window.location.reload(); // Refresh the page
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
					{/* If authenticated, show sign-out button; otherwise, show sign-in button */}
					{isAuthenticated ? (
						<Box>
							<Button onClick={handleSignOut}>
								<Typography variant="h6" sx={{ color: 'white', mr: 3 }}>
									Sign Out
								</Typography>
							</Button>
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
							<Button onClick={handleOpenSignIn}>
								<Typography variant="h6" sx={{ color: 'white', mr: 3 }}>
									Sign In
								</Typography>
							</Button>
						</Box>
					)}
				</Box>
			</Box>

			{/* Registration/Sign-In Modal */}
			<RegistrationModal
				open={modalOpen}
				onClose={handleCloseModal}
				mode={modalMode} // Set mode to 'signin' or other modes dynamically
				onSubmit={handleSignInSubmit} // Handle sign-in submission
			/>

			{/* Display loading state */}
			{loading && (
				<Typography sx={{ color: 'white' }}>Signing you in...</Typography>
			)}

			{/* Display error message if any */}
			{error && <Typography sx={{ color: 'red' }}>Error: {error}</Typography>}
		</>
	);
};

export default Header;
