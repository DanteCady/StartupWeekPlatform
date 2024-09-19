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
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error;
            if (errorMessage === 'User has already checked in for this event') {
                return { message: errorMessage };
            }
            setError(errorMessage || 'An unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
