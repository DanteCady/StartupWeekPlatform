import React from 'react';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer,
	Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from '../../constants/index';

const Sidebar = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 240,
				flexShrink: 0,
				marginTop: '80px', // Account for the height of the header
				'& .MuiDrawer-paper': {
					width: 240,
					boxSizing: 'border-box',
					marginTop: '80px', // Sidebar content starts below the header
				},
			}}
		>
			<List>
				{sidebarMenuItems.map((menuItem, index) => (
					<React.Fragment key={index}>
						<ListItem button component={Link} to={menuItem.link}>
							<ListItemIcon>
								<menuItem.icon /> {/* Display the icon */}
							</ListItemIcon>
							<ListItemText primary={menuItem.title} />
						</ListItem>
						{index < sidebarMenuItems.length - 1 && <Divider />}{' '}
						{/* Add a divider between links */}
					</React.Fragment>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
