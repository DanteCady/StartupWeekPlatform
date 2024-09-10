import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const AdministrationPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '64px',
				paddingBottom: 8,
				overflowX: 'hidden',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<Typography variant="h4">Administration</Typography>
				<Typography variant="body1" color="textSecondary">
					Manage your events, registrants, and other settings here.
				</Typography>
			</Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                
                <StaticDatePicker
                    label="Select a date"
                    value={new Date()}
                    onChange={(newValue) => console.log(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
		</Box>
	);
};

export default AdministrationPage;
