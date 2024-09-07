import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

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
					fullWidth // fullWidth attribute for the form field
					variant="standard" // variant attribute for the form field
					slotProps={{
						input: {
							style: { color: '#fff' }, // Change input text color to white
						},
						inputLabel: {
							style: { color: '#fff' }, // Change label text color to white
						},
						formHelperText: {
							style: { color: '#fff' }, // Change helper text color to white
						},
	 				}}
					sx={{
						marginTop: '1rem',
						'& .MuiInput-underline:before': {
							borderBottomColor: '#fff', // White underline before focus
						},
						'& .MuiInput-underline:after': {
							borderBottomColor: '#fff', // White underline after focus
						},
					}}
				/>
			))}
			<Button
				type="submit"
				variant="outlined"
				sx={{
					marginTop: '1.5rem',
					width: '100%',
					borderRadius: '8px',
					borderColor: '#fff',
					borderWidth: '2px', // Adjust border width
					color: '#fff', // Set text color to white
					backgroundColor: '#252b4e', // Button background color
					boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)', // Glowing effect
					'&:hover': {
						backgroundColor: '#252b4e', // Keep the background color on hover
						boxShadow: '0 0 15px 3px rgba(255, 255, 255, 1)', // Stronger glow on hover
					},
				}}
			>
				<Typography variant="button">Register Now</Typography>
			</Button>
		</Box>
	);
};

export default FormComponent;
