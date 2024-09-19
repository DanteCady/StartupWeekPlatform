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
            console.log(`Checking in for eventId: ${eventId} with registrantId: ${registrantId}`);
            const response = await axios.post(`${eventsEndpoint}/check-in`, {
                eventId,
                registrantId
            });
            console.log("Check-in response:", response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error;
            console.error("Check-in failed:", errorMessage || err.message);
            setError(errorMessage || 'An unknown error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
