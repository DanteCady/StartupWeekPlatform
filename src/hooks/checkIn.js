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
            // Log the API call details
            console.log(`Making API call to check in for eventId: ${eventId} with registrantId: ${registrantId}`);

            // Make the API call
            const response = await axios.post(`${eventsEndpoint}/check-in`, {
                eventId,
                registrantId
            });

            // Log the response from the server
            console.log("Check-in response data:", response.data);

            // Return the response data
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Network Error or Invalid Response';
            console.error("Check-in failed with error:", errorMessage);

            // Set the error state
            setError(errorMessage);
            return null; // Return null if check-in fails
        } finally {
            // Stop the loading state
            console.log("Check-in process complete, setting loading to false");
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
