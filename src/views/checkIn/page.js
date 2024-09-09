import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const CheckInPage = () => {
	const { eventId } = useParams(); // Get the eventId from the URL
	const [registrantId, setRegistrantId] = useState('');

	const handleCheckIn = () => {
		//TODO - Implement check-in logic
		alert(`Checking in with Registrant ID: ${registrantId} for Event ID: ${eventId}`);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
			<Typography variant="h4">Event Check-In</Typography>
			<Typography variant="body1" sx={{ marginBottom: 2 }}>
				Event ID: {eventId}
			</Typography>

			<TextField
				label="Enter Registrant ID"
				variant="outlined"
				value={registrantId}
				onChange={(e) => setRegistrantId(e.target.value)}
				sx={{ marginBottom: 3, width: '300px' }}
			/>

			<Button
				variant="contained"
				color="primary"
				onClick={handleCheckIn}
				disabled={!registrantId} // Disable button if no registrant ID is entered
			>
				Check In
			</Button>
		</Box>
	);
};

export default CheckInPage;
