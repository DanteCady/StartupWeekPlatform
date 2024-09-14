import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Custom hook to handle sign-in logic
const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT;
  const navigate = useNavigate();

  const signIn = async (registrantId) => {
    setLoading(true);
    setError(null);

    try {
      // API call to authenticate the registrantId using axios
      const response = await axios.post(`${authEndpoint}/sign-in`, {
        registrantId,
      });

      // Handle successful sign-in
      localStorage.setItem('event_authentication_status', 'authenticated');
      localStorage.setItem('event_registrant_id', registrantId);
      navigate('/events');
      console.log('Signed in successfully:', response.data);
    } catch (err) {
      // Handle any errors from axios
      const errorMsg = err.response?.data?.message || 'Sign-in failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};

export default useSignIn;
