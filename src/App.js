import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';

// Views
import Home from './views/home/page';
import Dashboard from './views/dashboard/page';
import CheckInPage from './views/checkIn/page';
import AdministrationPage from './views/administration/page';
import Profile from './views/profile/page';
import CreateEventPage from './views/administration/createEvent';
import ManageRegistrantsPage from './views/administration/manageRegistrants';

// Global layout
import Layout from './components/global/layout';

function App() {
	// Store authentication status in state
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	// Check localStorage on component mount
	useEffect(() => {
		const authStatus = localStorage.getItem('event_authentication_status');
		if (authStatus === 'authenticated') {
			setIsAuthenticated(true);
			// Redirect the user to /profile if authenticated
			navigate('/profile', { replace: true });
		} else {
			setIsAuthenticated(false);
		}
	}, [navigate]); // useEffect will run only when the component mounts or navigate changes

	return (
		<Routes>
			{/* Public Routes */}
			<Route
				path="/"
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
			
			{/* Protected Route for Profile */}
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

			{/* Catch-all Route: Redirect to Home for unknown paths */}
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
