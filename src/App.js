import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Views
import Home from './views/home/page';

//gloabl layout
import Layout from './components/layout';

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
			</Routes>
		</Router>
	);
}

export default App;
