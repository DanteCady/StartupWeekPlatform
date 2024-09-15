import React from 'react';
import { Box, Typography, Link, IconButton, Divider } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Footer = () => {
	return (
		<Box
			sx={{
				width: '100%',
				background: 'linear-gradient(90deg, #252b4e, #4a5681)',
				color: '#fff',
				padding: '40px 0',
				mt: 'auto',
			}}
		>
			{/* First Section: Navigation Links */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 4,
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
				}}
			>
				<Typography sx={{ color: 'white', mb: 1, fontSize: '14px' }}>
					&copy; {new Date().getFullYear()} Event Manager
				</Typography>
				<Typography
					sx={{ color: 'white', fontSize: '12px', maxWidth: '600px' }}
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
