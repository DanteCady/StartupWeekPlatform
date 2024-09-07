import React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import FormComponent from '../../components/form';
import {eventRegistrationForm} from '../../utils/formConfiguration';


const page = () => {
  return (
    <Box>
        <FormComponent formConfig={eventRegistrationForm()} />
    </Box>
  )
}

export default page
