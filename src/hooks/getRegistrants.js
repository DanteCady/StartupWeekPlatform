import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRegistrants = (page, rowsPerPage) => {
  const [registrants, setRegistrants] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const usersEdnpoint = process.env.REACT_APP_USER_ENDPOINT;

  useEffect(() => {
    const fetchRegistrants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${usersEdnpoint}/registrants`, {
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
  }, [page, rowsPerPage]);

  return { registrants, totalCount, loading, error };
};

export default useFetchRegistrants;
