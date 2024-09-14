import { useState } from 'react';
import axios from 'axios'; 

const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

  const createEvent = async (eventData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.post(`${eventsEndpoint}/create`, eventData);

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response ? err.response.data : 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error, success };
};

export default useCreateEvent;
