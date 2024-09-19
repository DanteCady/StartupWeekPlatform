import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import CheckInsTable from './userCheckIn';

const CheckInComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        paddingTop: isMobile ? '32px' : '64px',
        paddingLeft: isMobile ? '16px' : '64px',
        paddingRight: isMobile ? '16px' : '64px',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          fontSize: isMobile ? '1.5rem' : '2.125rem',
          textAlign: isMobile ? 'center' : 'center', 
          fontWeight: 'bold', 
          marginBottom: isMobile ? '12px' : '24px', 
        }}
      >
        Your Check-Ins
      </Typography>
      <Box sx={{ marginTop: isMobile ? 0 : '32px' }}>
        <CheckInsTable />
      </Box>
    </Box>
  );
};

export default CheckInComponent;
