import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';
import { QrCodeScannerIcon } from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import QrReader from 'react-qr-scanner';

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('signin'); // State to control the mode ('signin', 'register', or 'info')
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
    const [qrScannerOpen, setQrScannerOpen] = useState(false); // State for QR scanner visibility

    const { signIn, loading, error } = useSignIn();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        setIsAuthenticated(true); // Update authentication status after sign-in
        window.location.reload(); // Refresh the page
    };

    // Function to handle sign-out
    const handleSignOut = () => {
        localStorage.removeItem('event_authentication_status'); // Clear local storage
        setIsAuthenticated(false); // Update state
        window.location.reload(); // Refresh the page
    };

    // Function to handle QR code scanning success
    const handleScanSuccess = (data) => {
        if (data) {
            console.log('Scanned QR code data:', data.text);
            setQrScannerOpen(false); // Close QR scanner after successful scan
        }
    };

    // Function to handle QR code scanning error
    const handleError = (err) => {
        console.error('Error scanning QR code:', err);
        setQrScannerOpen(false); // Close QR scanner on error
    };

    // Function to toggle QR scanner visibility
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
                mode={modalMode} // Set mode to 'signin' or other modes dynamically
                onSubmit={handleSignInSubmit} // Handle sign-in submission
            />

            {loading && (
                <Typography sx={{ color: 'white' }}>Signing you in...</Typography>
            )}

            {error && <Typography sx={{ color: 'red' }}>Error: {error}</Typography>}
        </>
    );
};

export default Header;
