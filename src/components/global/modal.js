import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Modal, IconButton, TextField } from '@mui/material';
import { CloseIcon } from '../../assets/icons';

const RegistrationModal = ({
	open,
	onClose,
	mode = 'info', // 'info', 'register', or 'signin'
	registrantId = '',
	onSubmit, // Function to handle form submission
}) => {
	const navigate = useNavigate();
	const [inputId, setInputId] = useState(''); // For handling user input in 'register' or 'signin' mode

	// Function to copy the registration ID to clipboard (for 'info' mode)
	const handleCopy = () => {
		navigator.clipboard.writeText(registrantId);
		alert('Registrant ID copied to clipboard!');
	};

	// Function to handle close and navigate to events
	const handleClose = () => {
		onClose();
		navigate('/events'); // Navigate to '/events' (or other pages depending on use case)
	};

	// Handle form submission (for 'register' or 'signin' mode)
	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit(inputId); // Pass the input ID to the parent component's handler
		}
		onClose(); // Close the modal
	};


	return (
		<Modal
			open={open}
			onClose={handleClose}
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Box
				sx={{
					backgroundColor: 'white',
					padding: '2rem',
					borderRadius: '8px',
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: 'red',
					}}
				>
					<CloseIcon />
				</IconButton>

				{/* Render different content based on the mode */}
				{/* {mode === 'info' && (
					<>
						<Typography variant="h6">Registration Successful!</Typography>
						<Typography variant="body1" sx={{ marginTop: '1rem' }}>
							Your registrant ID is: <strong>{registrantId}</strong>
						</Typography>
						<Button
							onClick={handleCopy}
							variant="contained"
							sx={{ marginTop: '1rem', backgroundColor: '#f98053' }}
						>
							Copy Registrant ID
						</Button>
						<Typography
							variant="caption"
							sx={{
								marginTop: '0.5rem',
								display: 'block',
								color: 'gray',
								fontSize: '0.75rem',
							}}
						>
							Please copy and save your registration ID. You will need it to register for events throughout the week.
						</Typography>
					</>
				)} */}
					{mode === 'info' && (
					<>
						<Typography variant="h6">Registration Successful!</Typography>
						<Typography variant="body1" sx={{ marginTop: '1rem' }}>
							You can now close this window and sign in <strong>{registrantId}</strong>
						</Typography>
					</>
				)}
				{/* Registration Form for entering registration ID || Email */}
				{mode === 'register' && (
					<>
						<Typography variant="h6" sx={{ marginBottom: 2 }}>
							Register for the Event
						</Typography>
						<TextField
							label="Enter Your Email Address"
							variant="outlined"
							value={inputId}
							onChange={(e) => setInputId(e.target.value)}
							fullWidth
							sx={{ marginBottom: 2 }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							fullWidth
							disabled={!inputId} // Disable button if input is empty
						>
							Register
						</Button>
					</>
				)}

				{/* Sign-in Form for entering registrant ID */}
				{mode === 'signin' && (
					<>
						<Typography variant="h6" sx={{ marginBottom: 2 }}>
							Sign In
						</Typography>
						<TextField
							label="Enter Your Email Address"
							variant="outlined"
							value={inputId}
							onChange={(e) => setInputId(e.target.value)}
							fullWidth
							sx={{ marginBottom: 2 }}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={handleSubmit}
							fullWidth
							disabled={!inputId} // Disable button if input is empty
						>
							Sign In
						</Button>
					</>
				)}
			</Box>
		</Modal>
	);
};

export default RegistrationModal;
