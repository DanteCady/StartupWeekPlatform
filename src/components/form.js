import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Grid } from '@mui/material/Grid2';

// FormComponent that take props from the form config util
const FormComponent = ({ formConfig }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {/* Loop through the fields array and render the form fields */}
                {formConfig.fields.map((field) => (
                    <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                            fullWidth
                            name={field.name}
                            label={field.label}
                            required={field.required}
                            multiline={field.multiline}
                            rows={field.rows}
                            helperText={field.helperText}
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
