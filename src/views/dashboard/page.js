import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';
import Events from '../../components/dashboard/eventsComponent';

const DashboardPage = ({ registrantId }) => {
	return (
		<div>
			<Typography variant="h4">Events</Typography>
			<Typography
				variant="body1"
				color="textSecondary"
			>
				Explore our exciting lineup of events designed to connect entrepreneurs,
				showcase innovative startups, and provide invaluable networking
				opportunities. Grow your startup and collaborate with industry leaders.
			</Typography>
			<DashboardSideBar />
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Events />
			</Box>
		</div>
	);
};

export default DashboardPage;
