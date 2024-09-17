import React from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useUserEvents from '../../hooks/getRegistrations'; 
import moment from 'moment'; 

const UserRegistrationsTable = () => {
  const { events, loading, error } = useUserEvents();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Typography variant="h6">You are currently not registered for any events.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user registrations table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Event ID</TableCell> */}
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.eventId}>
              {/* <TableCell>{event.eventId}</TableCell> */}
              <TableCell>{event.title}</TableCell>
              <TableCell>{moment(event.date).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{moment(event.startTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
              <TableCell>{moment(event.endTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserRegistrationsTable;
