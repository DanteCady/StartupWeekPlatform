import { useState, useEffect } from 'react';

// Custom hook to fetch events by userId
const useUserEvents = (userId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

  useEffect(() => {
    // If userId is not provided, return early
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        // Fetch events from the endpoint
        const response = await fetch(`${eventsEndpoint}/${userId}`);
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();
        setEvents(data); // Set the events data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [userId]);

  return { events, loading, error };
};

export default useUserEvents;