import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';
import { QrCodeScannerIcon } from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode'; // Import QR scanner

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('signin');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [qrScannerOpen, setQrScannerOpen] = useState(false);
    const [qrScannerInstance, setQrScannerInstance] = useState(null);

    const { signIn, loading, error } = useSignIn();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Check authentication status when the component mounts
    useEffect(() => {
        const authStatus = localStorage.getItem('event_authentication_status');
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
        await signIn(registrantId);
        setIsAuthenticated(true);
        window.location.reload();
    };

    // Function to handle sign-out
    const handleSignOut = () => {
        localStorage.removeItem('event_authentication_status');
        setIsAuthenticated(false);
        window.location.reload();
    };

    // Function to handle QR code scanning
    const handleScanSuccess = (decodedText) => {
        console.log('Scanned QR code data:', decodedText);
        setQrScannerOpen(false); // Close QR scanner after successful scan
    };

    const handleError = (error) => {
        console.error('Error scanning QR code:', error);
        alert('There was an issue accessing your camera. Please try again.');
        setQrScannerOpen(false); // Close QR scanner on error
    };

    // Function to stop the scanner
    const stopQrScanner = async () => {
        if (qrScannerInstance) {
            try {
                await qrScannerInstance.stop();
                console.log("Camera stopped.");
                setQrScannerInstance(null);
            } catch (err) {
                console.error("Failed to stop camera:", err);
            }
        }
    };

    // Function to toggle QR scanner visibility
    const toggleQrScanner = async () => {
        if (qrScannerOpen) {
            await stopQrScanner();
            setQrScannerOpen(false);
        } else {
            setQrScannerOpen(true);
        }
    };

    useEffect(() => {
        if (qrScannerOpen && !qrScannerInstance) {
            const qrScanner = new Html5Qrcode("qr-reader");
            qrScanner.start(
                { facingMode: "environment" }, // Use the environment camera on mobile
                { fps: 10, qrbox: 250 },
                handleScanSuccess,
                handleError
            ).catch(err => {
                console.error("Failed to start QR scanner:", err);
                setQrScannerOpen(false);
            });

            setQrScannerInstance(qrScanner);
        }

        return () => {
            stopQrScanner(); // Clean up the scanner when component unmounts
        };
    }, [qrScannerOpen, qrScannerInstance]);

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
                    <div id="qr-reader" style={{ width: '300px' }}></div>
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
