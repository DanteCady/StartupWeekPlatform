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
            console.log(`Making API call to check in for eventId: ${eventId} with registrantId: ${registrantId}`);
            const response = await axios.post(`${eventsEndpoint}/check-in`, {
                eventId,
                registrantId
            });

            console.log("Check-in response data:", response.data);
            return response.data; // Make sure we return data
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Network Error or Invalid Response';
            console.error("Check-in failed with error:", errorMessage);
            setError(errorMessage);
            return null; // Return null if check-in fails
        } finally {
            console.log("Check-in process complete, setting loading to false");
            setLoading(false); // Ensure loading is stopped
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
