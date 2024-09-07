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
    // Main container for the home page
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: '2rem',
        position: 'relative',
        overflowY: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: isMobile ? '100%' : '60%',
          padding: '2rem',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#252b4e',
            fontWeight: 'bold',
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontFamily: 'Montserrat',
          }}
        >
          Welcome to <span style={{ color: '#f98053', fontWeight: 'bold' }}>Rhode Island</span> Startup Week
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            fontFamily: 'Segoe UI. sans-serif',
            lineHeight: isMobile ? '1.5' : '1.75',
          }}
        >
          Join us for an exciting week filled with hands-on events, insightful workshops,
          and invaluable networking opportunities designed to empower startups and entrepreneurs.
          Whether you're looking to grow your business, connect with industry leaders, or
          explore the latest innovations, this is the perfect chance to ignite your entrepreneurial
          journey and make lasting connections.
        </Typography>
      </Box>
      {/* Box component that wraps the form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? '100%' : '40%',
          padding: '2rem',
          border: '1px solid #252b4e',
          borderRadius: '8px',
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
        {/* Box component that wraps the form */}
        <Box sx={{ width: '100%' }}>
          <FormComponent formConfig={eventRegistrationForm()} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
