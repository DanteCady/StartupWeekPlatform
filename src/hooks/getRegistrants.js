import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRegistrants = (page, rowsPerPage) => {
  const [registrants, setRegistrants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventDetails, setEventDetails] = useState({}); // Store event details for registrants

  const usersEndpoint = process.env.REACT_APP_USER_ENDPOINT;

  useEffect(() => {
    const fetchRegistrants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${usersEndpoint}/registrants`, {
          params: {
            page: page,
            limit: rowsPerPage,
          },
        });
        setRegistrants(response.data.registrants);
        setTotalCount(response.data.totalCount);
      } catch (err) {
        setError(err.message || 'Error fetching registrants');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrants();
  }, [page, rowsPerPage, usersEndpoint]);

  const fetchEventDetails = async (registrantId) => {
    if (!eventDetails[registrantId]) {
      try {
        const response = await axios.get(`${usersEndpoint}/registrants/${registrantId}/events`);
        setEventDetails((prevDetails) => ({
          ...prevDetails,
          [registrantId]: response.data.events, // Cache the event data
        }));
      } catch (err) {
        setError(err.message || 'Error fetching event details');
      }
    }
  };

  return { registrants, totalCount, loading, error, fetchEventDetails, eventDetails };
};

export default useFetchRegistrants;
