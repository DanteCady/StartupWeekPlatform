import { useState } from 'react';
import axios from 'axios';

const useCheckIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const eventsEndpoint = process.env.REACT_APP_EVENTS_ENDPOINT;

    const checkIn = async (eventIds, registrantId) => {
        setLoading(true);
        setError(null);

        try {
            // Check if eventIds is an array or single eventId
            const eventIdArray = Array.isArray(eventIds) ? eventIds : [eventIds];

            // Iterate over all eventIds and perform the check-in
            const checkInResults = await Promise.all(
                eventIdArray.map(async (eventId) => {
                    try {
                        const response = await axios.post(`${eventsEndpoint}/check-in`, {
                            eventId,
                            registrantId
                        });
                        return response.data;
                    } catch (err) {
                        const errorMessage = err.response?.data?.error;
                        if (errorMessage === 'User has already checked in for this event') {
                            return { message: errorMessage }; // Treat this as a valid response
                        }
                        throw new Error(errorMessage || 'An unknown error occurred');
                    }
                })
            );

            // Return the results of all check-ins
            return checkInResults;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { checkIn, loading, error };
};

export default useCheckIn;
