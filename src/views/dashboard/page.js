import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';
import Events from '../../components/dashboard/eventsComponent';

const DashboardPage = ({ registrationId }) => {
	return (
		<div>
			<Typography variant='h4'>Events</Typography>
			<DashboardSideBar />
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Events />
            </Box>
		</div>
	);
};

export default DashboardPage;
