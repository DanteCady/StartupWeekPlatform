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
    const [checkInComplete, setCheckInComplete] = useState(false); // Track if check-in has completed
    const [loading, setLoading] = useState(true);
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
    
        const storeEventId = (newEventId) => {
            let eventIds = JSON.parse(safeLocalStorage.getItem('eventIds')) || [];
            if (!eventIds.includes(newEventId)) {
                eventIds.push(newEventId);
                safeLocalStorage.setItem('eventIds', JSON.stringify(eventIds));
            }
        };
    
        // Store eventId if present
        if (eventId) {
            console.log(`Storing eventId: ${eventId}`);
            storeEventId(eventId);
        }
    
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
    
        // Case 1: User is authenticated and eventId is present (check-in process)
        if (authStatus === 'authenticated' && eventId && registrantId && !checkInComplete) {
            console.log("Starting check-in process...");
            setIsAuthenticated(true);
            setLoading(true); // Ensure loading state is true during check-in
    
            checkIn(eventId, registrantId)
                .then((response) => {
                    if (response?.message === 'User has already checked in for this event') {
                        console.log("User already checked in.");
                        alert('You have already checked in!');
                        navigate('/profile'); // Redirect to profile even if already checked in
                    } else if (response) {
                        console.log("Check-in successful!");
                        alert('Check-in successful!');
                        navigate('/profile'); // Redirect to profile after successful check-in
                    }
                    setCheckInComplete(true);
                })
                .catch((error) => {
                    console.error("Check-in error:", error);
                    setError("Check-in failed.");
                })
                .finally(() => {
                    console.log("Check-in process finished.");
                    setLoading(false); // Ensure loading is turned off
                });
        }
    
        // Case 2: User is authenticated but no eventId present (normal login)
        else if (authStatus === 'authenticated' && !eventId && !checkInComplete) {
            console.log("Normal login detected. Redirecting to profile.");
            setIsAuthenticated(true);
            setCheckInComplete(true);
            setLoading(false);
            navigate('/profile'); // Redirect to profile for normal login
        }
    
        // Case 3: User is not authenticated and eventId is present (redirect to login)
        else if (!authStatus && eventId) {
            console.log("User not authenticated, redirecting to auth-options.");
            navigate('/auth-options');
        }
    
        // Case 4: User is not authenticated and no eventId is present (redirect to login)
        else if (!authStatus && !eventId) {
            console.log("No authentication and no eventId, redirecting to auth-options.");
            navigate('/auth-options');
        }
    
    }, [location.search, checkInComplete, checkIn]);
    
    if (loading) {
        return <div>Loading...</div>; // Prevent rendering until all checks complete
    }

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
