import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Modal, IconButton } from '@mui/material';
import { CloseIcon } from '../assets/icons';

const RegistrationModal = ({ open, onClose, registrationID }) => {
  const navigate = useNavigate();

  // Function to copy the registration ID to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(registrationID);
    alert('Registration ID copied to clipboard!');
  };

  // Function to handle close and navigate to dashboard
  const handleClose = () => {
    onClose();
    navigate('/dashboard'); // Navigate to '/dashboard'
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6">Registration Successful!</Typography>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          Your registration ID is: <strong>{registrationID}</strong>
        </Typography>
        <Button onClick={handleCopy} variant="contained" sx={{ marginTop: '1rem', backgroundColor: '#f98053' }}>
          Copy Registration ID
        </Button>

        {/* Fine print below the button */}
        <Typography
          variant="caption"
          sx={{ marginTop: '0.5rem', display: 'block', color: 'gray', fontSize: '0.75rem' }}
        >
          Please copy and save your registration ID. You will need it to access the events portal in the future.
        </Typography>
      </Box>
    </Modal>
  );
};

export default RegistrationModal;
