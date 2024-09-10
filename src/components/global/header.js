import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import RegistrationModal from '../global/modal';
import useSignIn from '../../hooks/signIn';
import { QrCodeScannerIcon } from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode'; // Import QR scanner

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('signin'); // State to control the mode ('signin', 'register', or 'info')
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
    const [qrScannerOpen, setQrScannerOpen] = useState(false); // State for QR scanner visibility
    const [qrScannerInstance, setQrScannerInstance] = useState(null); // To hold the QR scanner instance

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

    // Function to toggle QR scanner visibility
	const toggleQrScanner = () => {
		if (qrScannerOpen) {
			if (qrScannerInstance) {
				qrScannerInstance.clear().then(() => {
					console.log("Camera stopped.");
					setQrScannerInstance(null);
					setQrScannerOpen(false);
				}).catch(err => {
					console.error("Failed to stop camera:", err);
				});
			}
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
                setQrScannerOpen(false); // Close QR scanner on error
            });

            setQrScannerInstance(qrScanner); // Save the scanner instance
        }

        return () => {
            // Clean up the QR scanner when component unmounts or scanner is closed
            if (qrScannerInstance) {
                qrScannerInstance.clear().then(() => {
                    console.log("QR scanner cleaned up.");
                }).catch(err => {
                    console.error("Failed to clean up QR scanner:", err);
                });
            }
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
                    {/* If authenticated, show sign-out button and QR scanner; otherwise, show sign-in button */}
                    {isAuthenticated ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button onClick={handleSignOut}>
                                <Typography variant="h6" sx={{ color: 'white', mr: 3 }}>
                                    Sign Out
                                </Typography>
                            </Button>

                            {/* Add QR code scanner icon next to the Sign-Out button (only for signed-in users) */}
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

            {/* QR Scanner Modal */}
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
