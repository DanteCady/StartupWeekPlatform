import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './header';

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
          paddingBottom: theme.spacing(8),
          paddingLeft: isMobile ? theme.spacing(2) : 0,
          paddingRight: isMobile ? theme.spacing(2) : 0,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
