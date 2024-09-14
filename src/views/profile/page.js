import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from '../../components/global/leftSideBar';
import Bookmarks from '../../components/profile/bookmarksComponent';
import EventRegistrations from '../../components/profile/registrations';
import EventCheckIns from '../../components/profile/checkIns';
import { useMediaQuery, useTheme } from '@mui/material';
import { sidebarMenuItems } from '../../constants';

const ProfilePage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box
			sx={{
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
			}}
		>
			{/* Flex container to manage content and bookmarks */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Full-width content area */}
				<Box
					sx={{
						width: '100%',
						marginBottom: 3,
						alignItems: isMobile ? 'center' : 'flex-start',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h4">Profile</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						sx={{ marginBottom: 3 }}
					>
						Discover your bookmarked events and never miss out on the
						opportunities that matter most to you. Stay connected with the latest
						insights, workshops, and networking sessions, all curated for your
						growth and success. Revisit these events and continue your journey
						towards innovation and collaboration.
					</Typography>
					<Sidebar menuItems={sidebarMenuItems} />
				</Box>

				{/* Grid container for content layout */}
				<Grid container spacing={2}>
					{/* EventRegistrations area on the left */}
					<Grid item xs={isMobile ? 12 : 8}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: '100%',
								borderBottom: !isMobile ? 1 : 0, // Only show the border on larger screens
								borderColor: 'divider',
								borderRadius: 1,
							}}
						>
							<EventRegistrations />
							<EventCheckIns />
						</Box>
					</Grid>

					{/* Bookmarks area on the right */}
					<Grid item xs={isMobile ? 12 : 4}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								width: '100%',
								padding: 2,
								borderLeft: !isMobile ? 1 : 0, // Only show the border on larger screens
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