import { useState } from 'react';

export const useEventRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

  const registerForEvent = async (eventId, formState) => {
    setLoading(true);
    setError(null); // Reset error state before attempting registration
    
    try {
      const response = await fetch(`${eventsEndpoint}/register`, {
        method: 'POST',
        body: JSON.stringify({ eventId, ...formState }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return { success: true, message: 'You have successfully registered for the event!' };
      } else {
        const errorMessage = 'Failed to register for the event';
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = 'Error during registration';
      console.error(errorMessage, error);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { registerForEvent, loading, error };
};

export default useEventRegistration;
