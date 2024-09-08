import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Views
import Home from './views/home/page';
import Dashboard from './views/dashboard/page';

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
			</Routes>
		</Router>
	);
}

export default App;
