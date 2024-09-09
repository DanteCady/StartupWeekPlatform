import { useState, useEffect } from 'react';
import moment from 'moment-timezone'; // Import moment-timezone

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
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json(); // Parse the JSON data

        // Combine the date and time fields using Moment.js
        const adjustedEvents = data.map(event => {
          const eventDateTime = moment.tz(`${event.date} ${event.time}`, 'America/New_York'); // Combine date and time with EST time zone
          return {
            ...event,
            eventDateTime, // Add the combined Moment.js date object
          };
        });

        setEvents(adjustedEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

export default useFetchEvents;
