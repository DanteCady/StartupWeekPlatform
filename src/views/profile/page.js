import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DashboardSideBar from '../../components/dashboard/dashboardSideBar';
import Bookmarks from '../../components/profile/bookmarksComponent';

const ProfilePage = () => {
	return (
		<Box
			sx={{
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
			}}
		>
			{/* Flex container to manage content and bookmarks */}
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{/* Full-width content area */}
				<Box sx={{ width: '100%', marginBottom: 3 }}>
					<Typography variant="h4">Profile</Typography>
					<Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
						Discover your bookmarked events and never miss out on the opportunities that matter most to you.
						Stay connected with the latest insights, workshops, and networking sessions, all curated for your growth and success.
						Revisit these events and continue your journey towards innovation and collaboration.
					</Typography>
					<DashboardSideBar />
				</Box>

				{/* Bookmarks area aligned to the right */}
				<Grid container spacing={2}>
					<Grid item xs={8}>
						{/* Empty to create spacing */}
					</Grid>
					<Grid item xs={4}>
						<Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            padding: 2,
                            borderLeft: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                        }}
                        >
							<Bookmarks />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ProfilePage;
