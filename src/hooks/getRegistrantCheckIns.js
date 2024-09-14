import { useState, useEffect } from 'react';
import axios from 'axios';

const useRegistrantCheckIns = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usersEndpoint = process.env.REACT_APP_USER_ENDPOINT;

  useEffect(() => {
    // Get the registrantId from localStorage
    const registrantId = localStorage.getItem('event_registrant_id');

    if (!registrantId) {
      setError('Registrant ID is required');
      setLoading(false);
      return;
    }

    const fetchCheckIns = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${usersEndpoint}/${registrantId}/check-ins`);
        setCheckIns(response.data.checkIns || []); 
      } catch (err) {
        setError(`Failed to fetch check-ins: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckIns();
  }, [usersEndpoint]);

  return { checkIns, loading, error };
};

export default useRegistrantCheckIns;
