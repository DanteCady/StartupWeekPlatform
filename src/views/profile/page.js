import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';
import Bookmarks from '../../components/profile/bookmarksComponent';

const ProfilePage = () => {
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
				}}
			>
				<Typography variant="h4">Profile</Typography>
				<Typography variant="body1" color="textSecondary">
                Discover your bookmarked events and never miss out on the opportunities that matter most to you.
                 Stay connected with the latest insights, workshops, and networking sessions, all curated for your growth and success. 
                 Revisit these events and continue your journey towards innovation and collaboration.
				</Typography>
			</Box>
			<DashboardSideBar />
			<Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'flex-end',
                }}>
				<Bookmarks />
			</Box>
		</Box>
	);
};

export default ProfilePage;
