import React, { useState } from 'react';
import {
	Box,
	Typography,
	Card,
	CardContent,
	IconButton,
	ToggleButtonGroup,
	ToggleButton,
	CircularProgress,
} from '@mui/material';
import {
	BookmarkBorderOutlinedIcon,
	ShareIcon,
	ViewListIcon,
	ViewModuleIcon,
	ViewModuleOutlinedIcon,
	ViewListOutlinedIcon,
} from '../../assets/icons';
import { useMediaQuery, useTheme } from '@mui/material';
import { useFetchEvents } from '../../hooks/fetchEvents';
import QRCode from '../../components/dashboard/qr';

const Events = () => {
	const [view, setView] = useState('list'); // State to toggle between list and grid view
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is small
	const { events, loading, error } = useFetchEvents(); // Use custom hook to fetch events

	// Handle view change (list or grid)
	const handleViewChange = (event, newView) => {
		if (newView !== null) {
			setView(newView);
		}
	};

	// Show loading spinner while fetching events
	if (loading) {
		return <CircularProgress />;
	}

	// Show a message when no events are available
	if (!loading && events.length === 0) {
		return (
			<Typography
				variant="h6"
				color="textSecondary"
				sx={{ textAlign: 'center', marginTop: 2 }}
			>
				No events scheduled at this time.
			</Typography>
		);
	}

	// Show error message if something went wrong
	if (error) {
		return <Typography color="error">{error}</Typography>;
	}

	return (
		<Box
			sx={{
				padding: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Buttons to switch between List View and Grid View */}
			<ToggleButtonGroup
				value={view}
				exclusive
				onChange={handleViewChange}
				sx={{
					marginBottom: 2,
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<ToggleButton
					value="list"
					sx={{
						color: view === 'list' ? '#f98053' : '#252b4e',
						borderColor: 'transparent',
						'&.Mui-selected': {
							backgroundColor: 'transparent',
						},
					}}
				>
					{view === 'list' ? (
						<ViewListOutlinedIcon sx={{ color: '#f98053', marginRight: 1 }} />
					) : (
						<ViewListIcon sx={{ color: '#252b4e', marginRight: 1 }} />
					)}
					<Typography
						sx={{
							color: view === 'list' ? '#f98053' : '#252b4e',
							fontWeight: 'bold',
						}}
					>
						List
					</Typography>
				</ToggleButton>

				<ToggleButton
					value="grid"
					sx={{
						color: view === 'grid' ? '#f98053' : '#252b4e',
						borderColor: 'transparent',
						'&.Mui-selected': {
							backgroundColor: 'transparent',
						},
					}}
				>
					{view === 'grid' ? (
						<ViewModuleOutlinedIcon sx={{ color: '#f98053', marginRight: 1 }} />
					) : (
						<ViewModuleIcon sx={{ color: '#252b4e', marginRight: 1 }} />
					)}
					<Typography
						sx={{
							color: view === 'grid' ? '#f98053' : '#252b4e',
							fontWeight: 'bold',
						}}
					>
						Grid
					</Typography>
				</ToggleButton>
			</ToggleButtonGroup>

			{/* Conditional rendering based on the view */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: view === 'list' ? 'column' : 'row',
					gap: 2,
					flexWrap: 'wrap',
				}}
			>
				{events.map((event) => {
					// Construct the registration URL for the event
					const registrationUrl = `http://localhost:3000/register?eventId=${event.id}`;

					return (
                        <Card
                        key={event.id}
                        sx={{
                            display: view === 'list' ? 'flex' : 'block',
                            flexDirection: view === 'list' ? 'row' : 'column',
                            gap: 2,
                            width: view === 'list' ? '100%' : isMobile ? '100%' : '30%',
                            height: '100%', // Ensure card takes full height in grid view
                            justifyContent: 'space-between', // Space out content in grid view
                        }}
                    >
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            {/* Title and description section */}
                            <Box>
                                <Typography variant="h6">{event.title}</Typography>
                                <hr />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{ marginTop: 1, lineHeight: 2 }}
                                >
                                    {event.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(event.date).toLocaleDateString()} at {event.time}
                                </Typography>
                            </Box>
                    
                            {/* QR code and icons section */}
                            <Box
                                sx={{
                                    marginTop: 3,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 50,
                                        width: 50,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <QRCode value={registrationUrl} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton>
                                        <BookmarkBorderOutlinedIcon sx={{ color: '#252b4e' }} />
                                    </IconButton>
                                    <IconButton>
                                        <ShareIcon sx={{ color: '#252b4e' }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    
					);
				})}
			</Box>
		</Box>
	);
};

export default Events;
