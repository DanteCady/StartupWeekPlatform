import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				backgroundColor: '#252b4e',
				height: '110px',
				position: 'relative', 
				bottom: 0,
				marginTop: 'auto',
  
			}}
		>
			<Box
      sx={{
        ml: 5,
      }}
      >
				<Link href="/administration" sx={{ color: 'white' }}>
					<Typography sx={{ color: 'white' }}>Administration</Typography>
				</Link>
        <Link href='mailto:someone@example.com'>
				<Typography sx={{ color: 'white' }}>Contact</Typography>
        </Link>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
					justifyContent: 'center',
					width: '100%',
					padding: '16px',
          mr: 5
				}}
			>
				<Typography sx={{ color: 'white' }}>
					&copy; {new Date().getFullYear()} Event Manager
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
