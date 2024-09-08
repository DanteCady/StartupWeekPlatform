import { useState, useEffect } from 'react';

// Custom hook to fetch events from the API
export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT; // Define the events endpoint

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${eventsEndpoint}/all`); // Fetch events from the API
        // Throw an error if the response is not ok
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json(); // Parse the JSON data
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message); // Set the error state if there's an error
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
