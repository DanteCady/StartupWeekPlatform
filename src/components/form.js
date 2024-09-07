import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid  from '@mui/material/Grid2';

// FormComponent that take props from the form config util
const FormComponent = ({ formConfig }) => {
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            mt: '2rem',
        }}
        >
                {/* Loop through the fields array and render the form fields */}
                {formConfig.fields.map((field) => (
                        <TextField
                            name={field.name} // name attribute for the form field
                            label={field.label} // label for the form field
                            required={field.required} // required attribute for the form field
                            multiline={field.multiline} // multiline attribute for the form field
                            rows={field.rows} // rows attribute for the form field 
                            helperText={field.helperText} // helperText attribute for the form field
                            sx={{
                                width: '100%',
                                marginTop: '1rem',
                            }}
                        />
                ))}
                    <Button 
                    type="submit" 
                    variant="outlined" 
                    color="#252b4e"
                    sx={{
                        marginTop: '1rem',
                        width: '100%',
                        borderRadius: '8px',
                    }}>
                        <Typography variant="button">Register</Typography>
                    </Button>
        </Box>
    );
};

export default FormComponent;
