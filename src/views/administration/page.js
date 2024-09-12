import React from 'react';
import { Box, Typography } from '@mui/material';
import Sidebar from '../../components/global/leftSideBar'; 
import { adminSidebarMenuItems } from '../../constants/index'; 

const AdministrationPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
				width: '100%',
			}}
		>
        <Typography variant="h4">Administration</Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your events, registrants, and other settings here.
        </Typography>
			{/* Pass the admin menu items to the Sidebar */}
			<Sidebar menuItems={adminSidebarMenuItems} />
		</Box>
	);
};

export default AdministrationPage;
