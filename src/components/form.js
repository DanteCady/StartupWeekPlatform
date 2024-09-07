import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid  from '@mui/material/Grid2';

// FormComponent that take props from the form config util
const FormComponent = ({ formConfig }) => {
    return (
        <Box>
            <Grid container spacing={3}>
                {/* Loop through the fields array and render the form fields */}
                {formConfig.fields.map((field) => (
                    <Grid item xs={12} sm={6} md={4} key={field.name}>
                        <TextField
                            fullWidth
                            name={field.name} // name attribute for the form field
                            label={field.label} // label for the form field
                            required={field.required} // required attribute for the form field
                            multiline={field.multiline} // multiline attribute for the form field
                            rows={field.rows} // rows attribute for the form field 
                            helperText={field.helperText} // helperText attribute for the form field
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button type="submit" variant="outlined" color="success">
                        <Typography variant="button">Submit</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormComponent;
