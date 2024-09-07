// Form Configuration
export const eventRegistrationForm = () => ({
    fields: [
        {
            name: 'firstName',
            label: 'First Name',
            required: true,
            helperText: 'Please enter your first name',
        },
        {
            name: 'lastName',
            label: 'Last Name',
            required: true,
            helperText: 'Please enter your last name',
        },
        {
            name: 'email',
            label: 'Email',
            required: true,
            helperText: 'Please enter your email',
        },
        {
            name: 'phone',
            label: 'Phone Number',
            required: true,
            helperText: 'Please enter your phone number',
        },
        {
            name: 'affiliation',
            label: 'Affiliation',
            required: false,
            helperText: 'Please enter your affiliation',
        }
    ],
})