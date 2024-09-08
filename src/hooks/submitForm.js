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
                const registrationID = response.data.registrationID; // Capture the registrationID from the response
                // Reset the form state if successful
                setFormState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    affiliation: '',
                });
                return { success: true, registrationID }; // Return success and the registrationID
            } else {
                return { success: false, error: 'Form submission failed. Please try again.' }; // Return failure message
            }
        } catch (error) {
            console.error('Error submitting form:', error); // Log the error
            return { success: false, error: 'An error occurred. Please try again.' }; // Return error message
        }
    };

    return { handleSubmit }; // Return the handleSubmit function
};
