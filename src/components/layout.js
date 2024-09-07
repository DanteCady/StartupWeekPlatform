import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Header from './header';

// Layout component that wraps the children components
const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <>
    <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: theme.spacing(8) }}>
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          {children} 
        </Box>
      </Box>
    </>
  );
};

export default Layout;
