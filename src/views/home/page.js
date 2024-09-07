import React from 'react'
import { TextField, Button, Box, Typography } from '@mui/material';
import FormComponent from '../../components/form';
import formConfiguration from '../../utils/formConfiguration';


const page = () => {
  return (
    <Box>
        <FormComponent formConfig={{formConfiguration}} />
    </Box>
  )
}

export default page
