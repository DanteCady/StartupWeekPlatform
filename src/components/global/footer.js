import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#252b4e',
        height: '110px',
        position: 'relative', // Change this to relative to avoid overlap issues
        bottom: 0,
        marginTop: 'auto',
      }}
    >
      <Typography sx={{ color: 'white' }}>
        &copy; {new Date().getFullYear()} Event Manager
      </Typography>
    </Box>
  );
};

export default Footer;
