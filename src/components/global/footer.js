import React from 'react';
import { Box, Typography, Link, IconButton, Divider } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useMediaQuery, useTheme } from '@mui/material';

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
			{/* First Section: Navigation Links */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
					alignItems: 'center',
					justifyContent: 'center',
					gap: isMobile ? 2 : 4,
					mb: 4,
				}}
			>
				<Link
					href="/admin"
					sx={{
						color: 'inherit',
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<IconButton sx={{ color: 'white' }}>
						<AdminPanelSettingsIcon />
					</IconButton>
					<Typography variant="body2">Administration</Typography>
				</Link>
				<Link
					href="mailto:someone@example.com"
					sx={{
						color: 'inherit',
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<IconButton sx={{ color: 'white' }}>
						<MailOutlineIcon />
					</IconButton>
					<Typography variant="body2">Contact</Typography>
				</Link>
				<Link
					href="/events"
					sx={{
						color: 'inherit',
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<IconButton sx={{ color: 'white' }}>
						<EventIcon />
					</IconButton>
					<Typography variant="body2">Events</Typography>
				</Link>
				<Link
					href="/home"
					sx={{
						color: 'inherit',
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<IconButton sx={{ color: 'white' }}>
						<HomeIcon />
					</IconButton>
					<Typography variant="body2">Home</Typography>
				</Link>
			</Box>

			{/* Divider */}
			<Divider
				sx={{
					backgroundColor: 'rgba(255, 255, 255, 0.3)',
					width: '80%',
					margin: '0 auto 20px',
				}}
			/>

			{/* Second Section: Credits */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
					px: isMobile ? 2 : 0, 
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
					Created by{' '}
					<Link
						href="https://linkedin.com/in/dantecady"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						Dante Cady
					</Link>
					, Full Stack Developer at{' '}
					<Link
						href="https://devaccelerator.org"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						DevAccelerator
					</Link>{' '}
					| Founder/CEO of{' '}
					<Link
						href="https://kuduu.io"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						Kuduu Health
					</Link>{' '}
					(part of{' '}
					<Link
						href="https://siliconxl.com"
						sx={{ color: 'inherit', textDecoration: 'underline' }}
					>
						SiliconXL Startup Accelerator
					</Link>
					)
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
