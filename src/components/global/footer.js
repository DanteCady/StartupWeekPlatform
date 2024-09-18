import React from 'react';
import { Box, Typography, Link, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box
			sx={{
				width: '100%',
				background: 'linear-gradient(90deg, #252b4e, #4a5681)',
				color: '#fff',
				padding: isMobile ? '20px 0' : '40px 0', 
				mt: 'auto',
			}}
		>
			{/* Second Section: Credits */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					px: isMobile ? 2 : 0, 
					mb: 5,
				}}
			>
				<Typography sx={{ color: 'white', mb: 1, fontSize: isMobile ? '12px' : '14px' }}>
					&copy; {new Date().getFullYear()} Rhode Island Startup Week
				</Typography>
				<Typography
					sx={{
						color: 'white',
						fontSize: isMobile ? '10px' : '12px', 
						maxWidth: '600px',
					}}
				>
					Developed and Architected by{' '}
					<Link
						href="https://linkedin.com/in/dantecady"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						Dante Cady
					</Link>
					, Full Stack Developer @{' '}
					<Link
						href="https://devaccelerator.org"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						DevAccelerator
					</Link>{' '}
					| Founder/CEO{' '}
					<Link
						href="https://kuduu.io"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						Kuduu Health
					</Link>{' '}
					(a{' '}
					<Link
						href="https://siliconxl.com"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						SiliconXL Accelerator
					</Link>{' '}
					Startup)
				</Typography>
				<Typography
					sx={{
						color: 'white',
						fontSize: isMobile ? '10px' : '12px', 
						maxWidth: '600px',
						mt: 2,
					}}
				>
					UX, Customer Experience, and Contributed Architecture Design by{' '}
					<Link
						href="https://www.linkedin.com/in/arnellmilhouse"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						Arnell Milhouse
					</Link>
					, CEO @{' '}
					<Link
						href="https://siliconxl.com"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						SiliconXL
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
