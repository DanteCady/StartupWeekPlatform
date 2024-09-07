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
            width: '100%',
            height: '100%',
            padding: '2rem',
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
                        />
                ))}
                    <Button 
                    type="submit" 
                    variant="outlined" 
                    color="success"
                    sx={{
                        marginTop: '1rem',
                        width: '15%',
                    }}>
                        <Typography variant="button">Subscribe</Typography>
                    </Button>
        </Box>
    );
};

export default FormComponent;
