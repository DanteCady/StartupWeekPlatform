import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RegistrationModal from '../../components/global/modal';
import useSignIn from '../../hooks/signIn';

const AuthOptions = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen size is mobile
    const [isModalOpen, setModalOpen] = useState(false); // State to handle modal open/close

    // Destructure the signIn hook
    const { signIn, loading, error } = useSignIn(); // call signIn when user submits the form

    // Handle modal open
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box 
             sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 30,
                maxHeight: '100%',
             }}
                
                px={isMobile ? 2 : 4} // padding for mobile vs desktop
            >
                <Typography 
                    variant={isMobile ? 'h5' : 'h4'} // heading size for mobile
                    component="h1" 
                    align="center" 
                    gutterBottom
                >
                    Please Login or Register
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleOpenModal} // Open the login modal
                            sx={{
                                padding: isMobile ? theme.spacing(1) : theme.spacing(1.5), // Adjust button padding for mobile
                                fontSize: theme.typography.h6.fontSize,
                                backgroundColor:  "#252b4e",
                            }}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/register')} // Navigate to register route
                            sx={{
                                padding: isMobile ? theme.spacing(1) : theme.spacing(1.5), // Adjust button padding for mobile
                                fontSize: theme.typography.h6.fontSize,
                                backgroundColor:  "#f98053",
                                color: "white"
                            }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Login Modal */}
            <RegistrationModal 
                open={isModalOpen}
                onClose={handleCloseModal}
                mode="signin" // Set the mode to signin for the login flow
                onSubmit={(inputId) => {
                    // Call signIn from useSignIn hook when form is submitted
                    signIn(inputId); 
                }}
            />

            {/* show loading or error */}
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
};

export default AuthOptions;
