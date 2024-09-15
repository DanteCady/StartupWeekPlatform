import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, CircularProgress, Typography, IconButton, Collapse
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import useFetchRegistrants from '../../hooks/getRegistrants';
import moment from 'moment-timezone'; // Import moment for formatting

const AdminRegistrantsComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null); // Track the currently expanded row
  const { registrants, totalCount, loading, error, checkInDetails = {}, registeredEventDetails = {}, fetchEventDetails } = useFetchRegistrants(page, rowsPerPage);

  const handleExpandClick = (registrantId) => {
    if (expandedRow === registrantId) {
      setExpandedRow(null); // Collapse the row if already expanded
    } else {
      setExpandedRow(registrantId); // Expand the row
      fetchEventDetails(registrantId); // Fetch the check-in and registered events
    }
  };

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
    <Box sx={{ width: '100%', marginTop: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="registrants table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Affiliation</TableCell>
              <TableCell>Total Check-Ins</TableCell> {/* New Column for Total Check-Ins */}
              <TableCell>Total Registered Events</TableCell> {/* New Column for Total Registered Events */}
              <TableCell>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrants.map((registrant) => {
              const totalCheckIns = checkInDetails[registrant.registrantId]?.length || 0; // Total check-ins
              const totalRegisteredEvents = registeredEventDetails[registrant.registrantId]?.length || 0; // Total registered events

              return (
                <React.Fragment key={registrant.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleExpandClick(registrant.registrantId)}
                      >
                        {expandedRow === registrant.registrantId ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{registrant.registrantId}</TableCell>
                    <TableCell>{registrant.firstName}</TableCell>
                    <TableCell>{registrant.lastName}</TableCell>
                    <TableCell>{registrant.email}</TableCell>
                    <TableCell>{registrant.phoneNumber}</TableCell>
                    <TableCell>{registrant.affiliation}</TableCell>
                    
                    {/* Total Check-Ins Column */}
                    <TableCell>{totalCheckIns}</TableCell> 

                    {/* Total Registered Events Column */}
                    <TableCell>{totalRegisteredEvents}</TableCell> 

                    <TableCell>{new Date(registrant.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>

                  {/* Expanded row for check-ins and registered events */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                      <Collapse in={expandedRow === registrant.registrantId} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          {/* Check-Ins Section */}
                          <Typography variant="h6" gutterBottom>
                            Check-Ins for {registrant.firstName} {registrant.lastName}
                          </Typography>
                          <Table size="small" aria-label="check-ins">
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
                              {checkInDetails[registrant.registrantId] && checkInDetails[registrant.registrantId].length > 0 ? (
                                checkInDetails[registrant.registrantId].map((event) => {
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
                                  <TableCell colSpan={5}>No check-ins found.</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>

                          {/* Registered Events Section */}
                          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                            Registered Events for {registrant.firstName} {registrant.lastName}
                          </Typography>
                          <Table size="small" aria-label="registered events">
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
                              {registeredEventDetails[registrant.registrantId] && registeredEventDetails[registrant.registrantId].length > 0 ? (
                                registeredEventDetails[registrant.registrantId].map((event) => {
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
                                  <TableCell colSpan={5}>No registered events found.</TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminRegistrantsComponent;
