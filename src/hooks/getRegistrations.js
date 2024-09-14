import { useState, useEffect } from 'react';
import axios from 'axios'; 

const useUserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

  useEffect(() => {
    // Get the userId from localStorage
    const userId = localStorage.getItem('event_registrant_id');

    // If userId is not found in localStorage, return early
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        // Fetch events from the endpoint using Axios
        const response = await axios.get(`${eventsEndpoint}/${userId}`);
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        // Handle errors, either from the request or the response
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [eventsEndpoint]);

  return { events, loading, error };
};

export default useUserEvents;
