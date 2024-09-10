import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Views
import Home from './views/home/page';
import Dashboard from './views/dashboard/page';
import CheckInPage from './views/checkIn/page';
import AdministrationPage
 from './views/administration/page';
//gloabl layout
import Layout from './components/global/layout';

function App() {
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
			</Routes>
		</Router>
	);
}

export default App;
