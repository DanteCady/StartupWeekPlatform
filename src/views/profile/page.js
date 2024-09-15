import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Sidebar from '../../components/global/leftSideBar';
import Bookmarks from '../../components/profile/bookmarksComponent';
import EventRegistrations from '../../components/profile/registrations';
import EventCheckIns from '../../components/profile/checkIns';
import { useMediaQuery, useTheme } from '@mui/material';
import { sidebarMenuItems } from '../../constants';
import EventsComponent from '../../components/dashboard/eventsComponent';	

const ProfilePage = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box
			sx={{
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
				width: '100%',
				display: 'flex',
				justifyContent: 'center', 
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					maxWidth: isMobile ? '100%' : '1200px', // Limit max width on desktop
				}}
			>
				{/* Full-width content area */}
				<Box
					sx={{
						width: '100%',
						marginBottom: 3,
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography variant="h4" sx={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', textAlign: 'center' }}>
						Profile
					</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						sx={{
							marginBottom: 3,
							fontSize: isMobile ? '.875rem' : '1.25rem',
							textAlign: 'center',
							padding: isMobile ? '0 16px' : '0',
							maxWidth: '100%', 
						}}
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
				<Grid container sx={{ width: '100%', margin: 0, justifyContent: 'center' }}>
					{/* EventRegistrations area */}
					<Grid item xs={12}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								borderBottom: !isMobile ? 1 : 0,
								borderColor: 'divider',
								borderRadius: 1,
								padding: isMobile ? 1 : 2,
								maxWidth: '100%',
								overflowX: 'hidden', // Prevent horizontal scrolling
							}}
						>
							<EventsComponent />
							<EventRegistrations />
							<EventCheckIns />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default ProfilePage;
