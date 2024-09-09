import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import useCheckIn from '../../hooks/checkIn'; 
import Logo from '../../assets/2023-RI-startup-week-logo.png';   


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

    // Split eventId eventiD to get the actual ID
    const id = eventId.split('=')[1]; // Extract the actual ID from the URL by splitting the string at '=' and getting the second part

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
            <img src={Logo} alt="RI Startup Week Logo" style={{ width: '250px' }} />
            <hr style={{border: '1px solid black', width: '100%'}}/>
            <Typography variant="h4">Event Check-In</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Event ID: {id}
            </Typography>

            <TextField
                label="Enter Your Registrant ID"
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
