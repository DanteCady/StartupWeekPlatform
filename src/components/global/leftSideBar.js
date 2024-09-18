import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, IconButton, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { MenuIcon, CloseIcon } from '../../assets/icons';

const Sidebar = ({ menuItems = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const location = useLocation(); // Hook to get current path

  // Define heights of the header and footer
  const headerHeight = '80px'; 
  const footerHeight = '250px'; 

  // Calculate available height for the sidebar (between header and footer)
  const availableHeight = `calc(100vh - ${headerHeight} - ${footerHeight})`;

  // Toggle Drawer for mobile view
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    const authStatus = localStorage.getItem('event_authentication_status');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const drawerContent = (
    <>
      {/* Close Button in the Drawer (only on mobile) */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{ color: '#f98053' }} />
          </IconButton>
        </Box>
      )}

      {/* Sidebar menu items */}
      <List>
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <ListItem 
              button 
              component={Link} 
              to={menuItem.link} 
              onClick={toggleDrawer}
              sx={{
                color: location.pathname === menuItem.link ? '#f98053' : 'inherit', // Highlight active link
                backgroundColor: location.pathname === menuItem.link ? 'rgba(249, 128, 83, 0.1)' : 'inherit', // light background for active link
              }}
            >
              <ListItemIcon>
                <menuItem.icon sx={{ color: location.pathname === menuItem.link ? '#f98053' : 'inherit' }} /> {/* Change icon color */}
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItem>
            {index < menuItems.length - 1 && <Divider />} {/* Add a divider between links */}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          {!open && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ 
                position: 'fixed', 
                top: '10px', 
                left: '10px', 
                zIndex: 1400, 
                borderRadius: '50%', 
                padding: '8px', 
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)' // Add shadow for better visibility
              }} 
            >
              <MenuIcon sx={{ color: '#f98053' }} />
            </IconButton>
          )}
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            sx={{ '& .MuiDrawer-paper': { width: 240 } }}
          >
            <Box sx={{ height: availableHeight, overflowY: 'auto' }}>
              {drawerContent}
            </Box>
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 150,
              position: 'fixed',
              top: headerHeight, 
              height: availableHeight, 
              border: 'none', 
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
