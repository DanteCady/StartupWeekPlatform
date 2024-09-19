import React, { useState, useEffect, useRef } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom';

// Views
import Home from './views/home/page';
import Profile from './views/profile/page';
import AuthOptions from './views/authOptions/page'; 
import Layout from './components/global/layout';
import useCheckIn from './hooks/checkIn'; 

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkInComplete, setCheckInComplete] = useState(false); // Track if check-in has completed
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to extract eventId
    const { checkIn } = useCheckIn(); // Destructure the check-in hook
    const firstRender = useRef(true); // Use ref to prevent multiple useEffect runs

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false; // Ensure this useEffect only runs once initially
            return;
        }

        const authStatus = localStorage.getItem('event_authentication_status'); // Get authentication status from localStorage
        const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL
        const eventId = queryParams.get('event'); // Extract eventId from the URL
        const registrantId = localStorage.getItem('event_registrant_id');  // Get registrantId from localStorage

        // Store eventId in localStorage if present in URL
        if (eventId) {
            localStorage.setItem('eventId', eventId); // Store eventId for future use (if user needs to log in)
        }

        // Case 1: User is authenticated and scans QR code
        if (authStatus === 'authenticated' && eventId && registrantId && !checkInComplete) {
            setIsAuthenticated(true);
            checkIn(eventId, registrantId).then((response) => {
                if (response?.message === 'User has already checked in for this event') {
                    alert('You have already checked in!');
                } else if (response) {
                    alert('Check-in successful!');
                }
                setCheckInComplete(true); // Mark check-in as completed
                navigate('/profile', { replace: true });
            });
        } 
        // Case 2: User is not authenticated and scans QR code or visits the root path
        else if (!authStatus && eventId) {
            navigate('/auth-options'); // Redirect to Login/Register prompt screen
        }
        // Case 3: User is not authenticated and visits the root path without an event
        else if (!authStatus && !eventId && location.pathname === '/') {
            navigate('/auth-options'); // Redirect to Login/Register if no eventId
        }
        // Case 4: Normal navigation without event ID
        else if (authStatus === 'authenticated' && !eventId) {
            setIsAuthenticated(true);
            navigate('/profile', { replace: true });
        }
    }, [location.search, checkIn, navigate, checkInComplete, location.pathname]); // Add location.pathname and checkInComplete to dependencies

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
                <Route
                path="/register"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />
            <Route
                path="/profile"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <Profile />
                        </Layout>
                    ) : (
                        <Navigate to="/" replace /> // Redirect to home if not authenticated
                    )
                }
            />

            {/* Route for the Login/Register prompt screen */}
            <Route
                path="/auth-options"
                element={
                    <Layout>
                        <AuthOptions />
                    </Layout>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

const WrappedApp = () => (
    <Router>
        <App />
    </Router>
);

export default WrappedApp;