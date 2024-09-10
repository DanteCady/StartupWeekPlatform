import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './header';
import Footer from './footer';

// Layout component that wraps the children components
const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '64px', 
          paddingBottom: '110px',
          overflowX: 'hidden',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
