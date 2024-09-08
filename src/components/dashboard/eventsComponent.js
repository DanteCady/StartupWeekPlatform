import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import { events } from '../../constants';


const Events = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch events from the API
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:3002/api/events');
//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      {events.map((event) => (
        <Card key={event.id} sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <CardMedia
            component="img"
            image={event.image_url}
            alt={event.title}
            sx={{ width: 200, height: 200 }}
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
  );
};

export default Events;
