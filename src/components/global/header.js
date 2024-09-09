import React from 'react'
import { Box } from '@mui/material';

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
    }}
    >
    </Box>
  )
}


export default Header
