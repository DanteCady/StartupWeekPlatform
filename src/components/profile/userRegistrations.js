import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, CircularProgress, Typography
} from '@mui/material';
import useUserEvents from '../../hooks/getRegistrations'; 
import moment from 'moment-timezone'; // Import moment for formatting

const UserRegistrationsTable = ({ userId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Fetch the registered events for the user
  const { events, loading, error } = useUserEvents(userId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

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

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user registrations table">
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length > 0 ? (
              events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => {
                const formattedDate = moment(event.date).format('MM/DD/YYYY');
                const formattedStartTime = moment(event.startTime, 'HH:mm:ss').format('hh:mm A');
                const formattedEndTime = moment(event.endTime, 'HH:mm:ss').format('hh:mm A');
                return (
                  <TableRow key={event.eventId}>
                    <TableCell>{event.eventId}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>{formattedStartTime}</TableCell>
                    <TableCell>{formattedEndTime}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No registered events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={events.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserRegistrationsTable;