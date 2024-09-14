import React from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useMediaQuery, useTheme } from '@mui/material';
import useRegistrantCheckIns from '../../hooks/getRegistrantCheckIns'; 
import moment from 'moment'; 

const CheckInsTable = ({ registrantId }) => {
  const { checkIns, loading, error } = useRegistrantCheckIns(registrantId);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  if (checkIns.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Typography variant="h6">No check-ins found.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: isMobile ? 300 : 650 }} aria-label="check-ins table">
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
          {checkIns.map((checkIn) => (
            <TableRow key={checkIn.eventId}>
              <TableCell>{checkIn.eventId}</TableCell>
              <TableCell>{checkIn.title}</TableCell>
              <TableCell>{moment(checkIn.date).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{moment(checkIn.startTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
              <TableCell>{moment(checkIn.endTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckInsTable;
