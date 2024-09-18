import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, CircularProgress, Typography, useMediaQuery, useTheme
} from '@mui/material';import useRegistrantCheckIns from '../../hooks/getRegistrantCheckIns'; 
import moment from 'moment'; 

const CheckInsTable = ({ registrantId }) => {
  const { checkIns, loading, error } = useRegistrantCheckIns(registrantId);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  
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

  if (checkIns.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Typography variant="h6">No check-ins found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: isMobile ? 300 : 650 }} aria-label="check-ins table">
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
          {checkIns.map((checkIn) => (
            <TableRow key={checkIn.eventId}>
              {/* <TableCell>{checkIn.eventId}</TableCell> */}
              <TableCell>{checkIn.eventTitle}</TableCell>
              <TableCell>{checkIn.date}</TableCell>
              <TableCell>{moment(checkIn.startTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
              <TableCell>{moment(checkIn.endTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
      component="div"
      count={checkIns.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </Box>
  );
};

export default CheckInsTable;
