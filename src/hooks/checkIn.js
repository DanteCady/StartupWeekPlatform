import { useState } from 'react';
import axios from 'axios'; // Import Axios

const useCheckIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

    const checkIn = async (eventId, registrantId) => {
        setLoading(true);
        setError(null);

        try {
            // Axios POST request
            const response = await axios.post(`${eventsEndpoint}/check-in`, {
                eventId,
                registrantId
            });

            // Return the success message
            return response.data;
        } catch (err) {
            // Handle errors
            setError(err.response?.data?.error || 'An unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
