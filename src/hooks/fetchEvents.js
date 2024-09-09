import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import moment from 'moment-timezone'; 

// Custom hook to fetch events from the API
export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT; 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Use Axios to fetch events from the API
        const response = await axios.get(`${eventsEndpoint}/all`);

        // Combine the date and time fields using Moment.js
        const adjustedEvents = response.data.map(event => {
          const eventDateTime = moment.tz(`${event.date} ${event.startTime}`, 'America/New_York'); // Combine date and time with EST time zone
          return {
            ...event,
            eventDateTime, // Add the combined Moment.js date object
          };
        });

        setEvents(adjustedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventsEndpoint]); // Ensure the effect runs when eventsEndpoint changes

  return { events, loading, error };
};

export default useFetchEvents;
