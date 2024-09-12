import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useMediaQuery, useTheme } from '@mui/material';

const CreateEvent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's mobile view

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const eventData = {
      ...eventDetails,
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
    };
    console.log('Event created:', eventData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '64px',
        paddingBottom: 8,
        overflowX: 'hidden',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', // Stack on mobile, side by side on desktop
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {/* Left side: Date Picker */}
        <Box
          sx={{
            flex: 1,
            padding: isMobile ? '0 0 16px' : '0 16px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              label="Select a date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        {/* Right side: Event details */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: isMobile ? '0' : '16px',
            paddingRight: isMobile ? '0' : '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row', 
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: isMobile ? 2 : 0,
            }}
          >
            {/* Start Time Picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Select Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ marginTop: isMobile ? 2 : 0, width: isMobile ? '100%' : '48%' }} />
                )}
              />
            </LocalizationProvider>
              <br />
            {/* End Time Picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Select End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ marginTop: isMobile ? 2 : 0, width: isMobile ? '100%' : '48%' }} />
                )}
              />
            </LocalizationProvider>
          </Box>

          {/* Title Input */}
          <TextField
            label="Event Title"
            name="title"
            value={eventDetails.title}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />

          {/* Description Input */}
          <TextField
            label="Event Description"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            sx={{ marginTop: 2 }}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3 }}
            onClick={handleSubmit}
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateEvent;
