import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Views
import Home from './views/home/page';
import Dashboard from './views/dashboard/page';
import CheckInPage from './views/checkIn/page';
import AdministrationPage from './views/administration/page';
import Profile from './views/profile/page';


//gloabl layout
import Layout from './components/global/layout';

function App() {
	const isAuthenticated = localStorage.getItem('event_authentication_status') === 'authenticated'; // Check if user is authenticated

	return (
		<Router>
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
					path="/events"
					element={
						<Layout>
							<Dashboard />
						</Layout>
					}
				/>
				<Route
					path="/register/:eventId/check-in"
					element={
						<Layout>
							<CheckInPage />
						</Layout>
					}
				/>
				<Route
					path="/administration"
					element={
						<Layout>
							<AdministrationPage />
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
							<Navigate to="/" /> // Redirect to home if not authenticated
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
