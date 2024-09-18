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
import Layout from './components/global/layout';
import useCheckIn from './hooks/checkIn'; // Import the useCheckIn hook

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to extract eventId
    const { checkIn } = useCheckIn(); // Destructure the check-in hook

    // Check localStorage on component mount
    useEffect(() => {
        const authStatus = localStorage.getItem('event_authentication_status'); // Get authentication status from localStorage
        const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL
        const eventId = queryParams.get('event'); // Extract eventId from the URL
        const registrantId = localStorage.getItem('event_registrant_id');  // Get registrantId from localStorage

        // Ensures that state update or navigation happens only when necessary
        if (authStatus === 'authenticated') {
            setIsAuthenticated(true);

            // Only check-in if eventId exists in the URL (QR code scan case)
            if (eventId && registrantId) {
                checkIn(eventId, registrantId).then((response) => {
                    if (response?.message === 'User has already checked in for this event') {
                        alert('You have already checked in!');
                    } else if (response) {
                        alert('Check-in successful!');
                    }
                    // Always navigate to profile after check-in
                    navigate('/profile', { replace: true });
                });
            } else {
                // If no eventId, just navigate to profile without triggering check-in
                navigate('/profile', { replace: true });
            }
        }
    }, [location.search, checkIn, navigate]); // Dependency array now only includes location.search to avoid infinite loop
		// Infinite loop is avoided by removing isAuthenticated from the dependency array 
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
                path="/home"
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
