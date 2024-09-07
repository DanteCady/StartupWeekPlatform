import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import FormComponent from '../../components/form';
import { eventRegistrationForm } from '../../utils/formConfiguration';
import { useTheme } from '@mui/material/styles';

// Page component that renders the event registration form
const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // Main container for the HomePage
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        mt: '2rem',
        position: 'relative',
      }}
    >
      {/* Box component that wraps the form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          border: '1px solid #252b4e',
          borderRadius: '8px',
          position: isMobile ? 'static' : 'relative',
          right: isMobile ? '0' : '-300px',
          mt: '2rem',
          backgroundColor: '#252b4e',
          color: '#fff',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Event Registration
          </Typography>
          <Typography variant="body2" gutterBottom>
            Register for the 2024 Rhode Island Startup Week Event
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/* FormComponent that takes the formConfig as props */}
          <FormComponent formConfig={eventRegistrationForm()} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
