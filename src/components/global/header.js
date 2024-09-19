import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';
import useCheckIn from '../../hooks/checkIn'; 
import { QrCodeScannerIcon } from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import QrReader from 'react-qr-scanner';

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('signin');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [qrScannerOpen, setQrScannerOpen] = useState(false);
    const [registrantId, setRegistrantId] = useState(null); // Registrant ID

    const { signIn, loading: signInLoading, error: signInError } = useSignIn();
    const { checkIn, loading: checkInLoading, error: checkInError } = useCheckIn(); // Use check-in hook
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile view

    useEffect(() => {
        const authStatus = localStorage.getItem('event_authentication_status');
        const storedRegistrantId = localStorage.getItem('event_registrant_id');
        if (authStatus === 'authenticated' && storedRegistrantId) {
            setIsAuthenticated(true);
            setRegistrantId(storedRegistrantId);
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
        localStorage.removeItem('event_registrant_id');
        localStorage.removeItem('eventId'); // Clear eventId to prevent auto-check-in
        setIsAuthenticated(false);
        setRegistrantId(null); // Reset registrantId state
        window.location.reload(); // Reload the page to reset state and force a fresh login
    };
    

    // Function to handle QR code scanning success
    const handleScanSuccess = async (data) => {
        if (data) {
            // Close the QR scanner
            setQrScannerOpen(false);

            // Use the scanned data directly as the eventId
            const eventId = data.text; 

            if (eventId && registrantId) {
                // Trigger check-in using the extracted eventId and registrantId
                const checkInResponse = await checkIn(eventId, registrantId);

                // If the response contains the success message, handle accordingly
                if (checkInResponse?.message === 'Check-in successful') {
                    alert('Check-in successful');
                } else if (checkInResponse?.message === 'User has already checked in for this event') {
                    alert('User has already checked in for this event');
                } else {
                    alert('Check-in failed. Please try again.');
                }
            } else {
                alert('Missing eventId or registrantId');
            }
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
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {/* Only show QR scanner on mobile */}
                            {isMobile && (
                                <IconButton
                                    onClick={toggleQrScanner}
                                    sx={{ color: 'white', mb: 1 }} 
                                >
                                    <QrCodeScannerIcon />
                                </IconButton>
                            )}

                            <Button
                                onClick={handleSignOut}
                                sx={{
                                    padding: '4px 8px', 
                                    minWidth: 'auto', 
                                }}
                            >
                                <Typography
                                    variant="body2" 
                                    sx={{ 
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        marginRight: isMobile ? 2 : 0,
                                    }}
                                >
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

            {/* Registration/Sign-In Modal */}
            <RegistrationModal
                open={modalOpen}
                onClose={handleCloseModal}
                mode={modalMode}
                onSubmit={handleSignInSubmit}
            />

            {signInLoading && (
                <Typography sx={{ color: 'white' }}>Signing you in...</Typography>
            )}

            {signInError && <Typography sx={{ color: 'red' }}>Error: {signInError}</Typography>}

            {checkInLoading && (
                <Typography sx={{ color: 'white' }}>Checking you in...</Typography>
            )}

            {checkInError && <Typography sx={{ color: 'red' }}>Error: {checkInError}</Typography>}
        </>
    );
};

export default Header;
