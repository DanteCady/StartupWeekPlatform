import React, { useState, useEffect } from 'react';
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
import CheckInPage from './views/checkIn/page';
import Layout from './components/global/layout';
import useCheckIn from './hooks/checkIn'; // Import the useCheckIn hook

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to extract eventId
    const { checkIn, loading, error } = useCheckIn(); // Destructure the check-in hook

    // Check localStorage on component mount
    useEffect(() => {
        const authStatus = localStorage.getItem('event_authentication_status'); // Get authentication status from localStorage
        const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL
        const eventId = queryParams.get('event'); // Extract eventId from the URL
        const registrantId = localStorage.getItem('event_registrant_id');  // Get registrantId from localStorage

		// If the user is authenticated and eventId is present, check them in
        if (authStatus === 'authenticated' && eventId && registrantId) {
            setIsAuthenticated(true);
            
            // Automatically check in if the user is authenticated and eventId is present
            checkIn(eventId, registrantId).then((response) => {
                if (response?.message === 'User has already checked in for this event') {
                    alert('You have already checked in!');
                } else if (response) {
                    alert('Check-in successful!');
                    navigate('/profile'); // Redirect to profile or desired page
                }
            });
        } else {
            setIsAuthenticated(false);
        }
    }, [navigate, location.search, checkIn]); // Re-run if navigate, location or checkIn changes

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
