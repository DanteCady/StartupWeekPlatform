import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import RegistrationsTable from './userRegistrations';

const RegistrationComponent = () => {
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
        display: 'flex',
        justifyContent: isMobile ? 'left' : 'center',
        }}>
        Your Registrations
      </Typography>
      <Box sx={{ marginTop: isMobile ? '16px' : '32px' }}>
        <RegistrationsTable />
      </Box>
    </Box>
  );
};

export default RegistrationComponent;
