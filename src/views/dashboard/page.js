import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';

const DashboardPage = ({ registrationId }) => {
	return (
		<div>
			<h1>Dashboard Page</h1>
			<DashboardSideBar />
		</div>
	);
};

export default DashboardPage;
