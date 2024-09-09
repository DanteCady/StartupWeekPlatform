import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import useCheckIn from '../../hooks/checkIn'; 

const CheckInPage = () => {
    const { eventId } = useParams(); // Extract eventId from the URL path
    const [registrantId, setRegistrantId] = useState('');
    const { checkIn, loading, error } = useCheckIn(); // Destructure hook results

    const handleCheckIn = async () => {
        const result = await checkIn(eventId, registrantId);
        if (result) {
            alert(result.message); // Show success message
        } else {
            alert('Check-in failed'); // Show failure message if any
        }
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
                disabled={loading} // Disable input during loading
            />

            {error && (
                <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckIn}
                disabled={!registrantId || loading} // Disable the button if no registrant ID or during loading
            >
                {loading ? 'Checking In...' : 'Check In'}
            </Button>
        </Box>
    );
};

export default CheckInPage;
