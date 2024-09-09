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

  // Define heights of the header and footer
  const headerHeight = '80px'; 
  const footerHeight = '150px'; 

  // Calculate available height for the sidebar (between header and footer)
  const availableHeight = `calc(100vh - ${headerHeight} - ${footerHeight})`;

  // Toggle Drawer for mobile view
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <>
      {/* Close Button in the Drawer (only on mobile) */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end',}}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{ color: '#f98053' }} />
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
              width: 240,
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
