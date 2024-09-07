import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import FormComponent from '../../components/form';
import { eventRegistrationForm } from '../../utils/formConfiguration';

const page = () => {
	return (
		<>
        {/* Main page container*/}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					backgroundColor: '#252b4e',
					height: '80px',
				}}
			>
                {/* Form container */}
				<Box
					sx={{
						display: 'flex',
						float: 'left',
					}}
				>
                    {/* Form component with props passed from event registration form*/}
					<FormComponent formConfig={eventRegistrationForm()} />
				</Box>
			</Box>
		</>
	);
};

export default page;
