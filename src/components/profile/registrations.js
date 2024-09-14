import React from 'react';
import { Box, Typography } from '@mui/material';
import RegistraionsTable from './userRegistrations';

const RegistrationComponents = () => {
  return (
    <>
      <Box
        sx={{
          paddingTop: '64px',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4">Your Registrations</Typography>
        <RegistraionsTable />
      </Box>
    </>
  );
};

export default RegistrationComponents;