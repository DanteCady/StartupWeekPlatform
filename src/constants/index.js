import { AccountBoxIcon, InsertInvitationIcon } from "../assets/icons"

// Sidebar menu items
export const sidebarMenuItems = [
    {
        title: 'Events',
        icon: InsertInvitationIcon,
        link: '/events',
    },
    {
        title: 'Profile',
        icon: AccountBoxIcon,
        link: '/profile',
    }
]

// Sample event data
export const events = [
    {
      id: 1,
      title: 'Startup Pitch Night',
      description: 'Join us for a night of exciting startup pitches from new entrepreneurs looking to change the world!',
      image_url: 'https://example.com/images/pitch-night.jpg', // Placeholder image URL
      date: '2024-09-25', // Event date in YYYY-MM-DD format
      time: '18:00', // Event time in HH:MM format (24-hour format)
    },
    {
      id: 2,
      title: 'Tech Innovation Conference',
      description: 'A full day conference featuring keynotes, panels, and workshops on the latest trends in tech innovation.',
      image_url: 'https://example.com/images/tech-conference.jpg', // Placeholder image URL
      date: '2024-10-10',
      time: '09:00',
    },
    {
      id: 3,
      title: 'AI in Healthcare Workshop',
      description: 'Learn how AI is revolutionizing healthcare in this interactive workshop led by industry experts.',
      image_url: 'https://example.com/images/ai-healthcare.jpg', // Placeholder image URL
      date: '2024-11-15',
      time: '13:00',
    },
  ];
  