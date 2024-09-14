import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRegistrants = (page, rowsPerPage) => {
  const [registrants, setRegistrants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDetails, setCheckInDetails] = useState({}); // To store check-ins per registrant
  const [registeredEventDetails, setRegisteredEventDetails] = useState({}); // To store registered events per registrant

  const usersEndpoint = process.env.REACT_APP_USER_ENDPOINT;

  useEffect(() => {
    const fetchRegistrants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${usersEndpoint}/registrants`, {
          params: {
            page,
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
    try {
      // Fetch check-ins
      const checkInResponse = await axios.get(`${usersEndpoint}/${registrantId}/check-ins`);
      setCheckInDetails((prevDetails) => ({
        ...prevDetails,
        [registrantId]: checkInResponse.data.checkIns,
      }));

      // Fetch registered events
      const eventResponse = await axios.get(`${usersEndpoint}/registrants/${registrantId}/events`);
      setRegisteredEventDetails((prevDetails) => ({
        ...prevDetails,
        [registrantId]: eventResponse.data.events,
      }));
    } catch (err) {
      setError(err.message || 'Error fetching event details');
    }
  };

  return {
    registrants,
    totalCount,
    loading,
    error,
    fetchEventDetails,
    checkInDetails,
    registeredEventDetails,
  };
};

export default useFetchRegistrants;
