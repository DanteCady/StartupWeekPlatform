import { useState } from 'react';
import axios from 'axios'; // Import Axios

export const useEventRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT; 

  const registerForEvent = async (eventId, formState) => {
    setLoading(true);
    setError(null); // Reset error state before attempting registration

    try {
      // Make the POST request with Axios
      const response = await axios.post(`${eventsEndpoint}/register`, {
        eventId,
        ...formState,
      });

      return {
        success: true,
        message: 'You have successfully registered for the event!',
      };
    } catch (err) {
      // Handle the error with Axios response data if available
      const errorMessage = err.response?.data?.message || 'Error during registration';
      console.error(errorMessage, err);
      setError(errorMessage);

      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return { registerForEvent, loading, error };
};

export default useEventRegistration;
