import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from '../../constants/index';
import { useMediaQuery, useTheme } from '@mui/material';
import { MenuIcon, CloseIcon } from '../../assets/icons';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small
  const [open, setOpen] = useState(false);

  // Toggle Drawer for mobile view
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <>
      {/* Close Button in the Drawer (only on mobile) */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{color: '#f98053'}} />
          </IconButton>
        </Box>
      )}
      <List>
        {sidebarMenuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ListItem button component={Link} to={menuItem.link} onClick={toggleDrawer}>
              <ListItemIcon>
                <menuItem.icon /> {/* Display the icon */}
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
            {index < sidebarMenuItems.length - 1 && <Divider />} {/* Add a divider between links */}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          {/* Only show the MenuIcon when the Drawer is closed */}
          {!open && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ position: 'fixed', top: '10px', left: '10px', zIndex: 1300 }} // Position for mobile
            >
              <MenuIcon sx={{color: '#f98053'}} />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            sx={{ '& .MuiDrawer-paper': { width: 240 } }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'fixed',
              top: '80px',
              height: 'calc(100vh - 80px)', // Sidebar height to fit the viewport below the header
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
