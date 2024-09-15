import { useState } from 'react';
import axios from 'axios'; 

const useCheckIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

    const checkIn = async (eventId, registrantId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${eventsEndpoint}/check-in`, {
                eventId,
                registrantId
            });

            // If check-in was successful, return the message
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error;
            // If the error message is "User has already checked in for this event", return that as a response
            if (errorMessage === 'User has already checked in for this event') {
                return { message: errorMessage }; // Treat this as a valid response
            }

            // Handle other errors as actual errors
            setError(errorMessage || 'An unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
