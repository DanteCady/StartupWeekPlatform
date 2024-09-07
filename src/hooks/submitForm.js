import React from "react";
import axios from "axios";

// Custom hook to submit the form data
export const SubmitForm = (formState, setFormState) => {
    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        const formEndpoint = process.env.REACT_APP_FORM_ENDPOINT; // Define the API endpoint
        try {
            // Send a POST request to the server with the form data
            const response = await axios.post(`${formEndpoint}/submit`, 
                formState, // Send the form state as the data
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Check the response status
            if (response.status === 200) {
                // If the response is OK, reset the form state
                setFormState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    affiliation: '',
                });
                alert('Form submitted successfully!'); // Show success message
            } else {
                alert('Form submission failed. Please try again.'); // Show error message
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Log the error
            alert('An error occurred. Please try again.'); // Show error message
        }
    };

    return { handleSubmit }; // Return the handleSubmit function

};


