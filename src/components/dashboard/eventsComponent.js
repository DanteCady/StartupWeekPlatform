import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { BookmarkIcon, ShareIcon, ViewListIcon, ViewModuleIcon, ViewModuleOutlinedIcon, ViewListOutlinedIcon } from '../../assets/icons';
import { events } from  '../../constants/index';

const Events = () => {
  const [view, setView] = useState('list'); // State to toggle between list and grid view

  // Handle view change (list or grid)
  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Buttons to switch between List View and Grid View */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        sx={{ 
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'flex-end',
        }}
      >
        <ToggleButton 
          value="list"
          sx={{
            color: view === 'list' ? '#f98053' : '#252b4e',
            borderColor: 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'transparent', // Disable default MUI background
            },
          }}
        >
          {view === 'list' ? (
            <ViewListOutlinedIcon sx={{ color: '#f98053' }} />
          ) : (
            <ViewListIcon sx={{ color: '#252b4e' }} />
          )}
        </ToggleButton>
        <ToggleButton 
          value="grid"
          sx={{
            color: view === 'grid' ? '#f98053' : '#252b4e',
            borderColor: 'transparent',
            '&.Mui-selected': {
              backgroundColor: 'transparent', // Disable default MUI background
            },
          }}
        >
          {view === 'grid' ? (
            <ViewModuleOutlinedIcon sx={{ color: '#f98053' }} />
          ) : (
            <ViewModuleIcon sx={{ color: '#252b4e' }} />
          )}
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Conditional rendering based on the view */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: view === 'list' ? 'column' : 'row',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {events.map((event) => (
          <Card
            key={event.id}
            sx={{
              display: view === 'list' ? 'flex' : 'block',
              flexDirection: 'row',
              gap: 2,
              width: view === 'list' ? '100%' : '30%',
            }}
          >
            <CardMedia
              component="img"
              image={event.image_url}
              alt={event.title}
              sx={{ width: view === 'list' ? 200 : '100%', height: 200 }}
            />
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Events;
