import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Header = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				backgroundColor: '#252b4e',
				height: '80px',
				position: 'fixed',
				zIndex: 1000,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-end',
					width: '100%',
					maxWidth: '1200px',
					padding: '0 20px',
				}}
			>
				<Button>
					<Typography variant="h6" sx={{ color: 'white' }}>
						Sign In
					</Typography>
				</Button>
			</Box>
		</Box>
	);
};

export default Header;
