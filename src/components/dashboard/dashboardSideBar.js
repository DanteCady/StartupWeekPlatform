import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from '../../constants/index';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'fixed',
          top: '80px', // Adjust the top to account for the header height
          height: 'calc(100vh - 80px)', // Sidebar height to fit the viewport below the header
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
            {index < sidebarMenuItems.length - 1 && <Divider />} {/* Add a divider between links */}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
