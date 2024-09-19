import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Home from './views/home/page';
import Profile from './views/profile/page';
import AuthOptions from './views/authOptions/page'; 
import Layout from './components/global/layout';
import useCheckIn from './hooks/checkIn'; 

const safeLocalStorage = {
    getItem: (key) => {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error("LocalStorage access error:", error);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error("LocalStorage set error:", error);
        }
    }
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkInComplete, setCheckInComplete] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { checkIn } = useCheckIn();
    const firstRender = useRef(true);

    useEffect(() => {
        const authStatus = safeLocalStorage.getItem('event_authentication_status');
        const queryParams = new URLSearchParams(location.search);
        const eventId = queryParams.get('event');
        const registrantId = safeLocalStorage.getItem('event_registrant_id');

        // Store the eventId in localStorage if it comes from the URL
        if (eventId) {
            console.log(`Storing eventId: ${eventId}`);
            safeLocalStorage.setItem('eventId', eventId);
        }

        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // Case 1: User is authenticated and eventId is present (check-in process after login)
        if (authStatus === 'authenticated' && !checkInComplete) {
            setIsAuthenticated(true);

            const storedEventId = safeLocalStorage.getItem('eventId'); // Retrieve stored eventId after login
            if (storedEventId && registrantId) {
                console.log("Starting check-in process for event:", storedEventId);

                checkIn(storedEventId, registrantId)
                    .then((response) => {
                        if (response?.message === 'User has already checked in for this event') {
                            console.log("User already checked in.");
                            alert('You have already checked in!');
                        } else if (response) {
                            console.log("Check-in successful!");
                            alert('Check-in successful!');
                        }
                        setCheckInComplete(true);
                        navigate('/profile'); // Redirect to profile after successful check-in
                    })
                    .catch((error) => {
                        console.error("Check-in error:", error);
                        setError("Check-in failed.");
                    });
            } else {
                console.log("No eventId stored, continuing normal login flow.");
                setCheckInComplete(true);
                navigate('/profile'); // Normal login flow without check-in
            }
        }

        // Case 2: User is not authenticated and eventId is present (redirect to login)
        else if (!authStatus && eventId) {
            console.log("User not authenticated, redirecting to auth-options.");
            navigate('/auth-options');
        }

    }, [location.search, checkInComplete, checkIn, navigate]);

    if (error) {
        return <div>Error: {error}</div>; // Display error if any during check-in
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        <Layout>
                            <Home />
                        </Layout>
                    ) : (
                        <Navigate to="/auth-options" replace />
                    )
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
                    isAuthenticated && checkInComplete ? (
                        <Layout>
                            <Profile />
                        </Layout>
                    ) : (
                        <Navigate to="/auth-options" replace />
                    )
                }
            />
            <Route path="/auth-options" element={<Layout><AuthOptions /></Layout>} />
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
