import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';
import Events from '../../components/dashboard/eventsComponent';
import { useMediaQuery, useTheme } from '@mui/material';

const DashboardPage = () => {
	
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: isMobile? 'center' : 'flex-start',
				}}
			>
				<Typography variant="h4">Events</Typography>
				<Typography variant="body1" color="textSecondary">
					Explore our exciting lineup of events designed to connect
					entrepreneurs, showcase innovative startups, and provide invaluable
					networking opportunities. Grow your startup and collaborate with
					industry leaders.
				</Typography>
			</Box>
			<DashboardSideBar />
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Events />
			</Box>
		</Box>
	);
};

export default DashboardPage;
