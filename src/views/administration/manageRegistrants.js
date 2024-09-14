import React from 'react'
import { Box } from '@mui/material'
import ManageRegistrantsComponent from '../../components/administration/manageRegistrants'  
import Sidebar from '../../components/global/leftSideBar'
import { adminSidebarMenuItems } from '../../constants/index'

const ManageRegistrantsPage = () => {
  return (
    <Box>
			<Sidebar menuItems={adminSidebarMenuItems} />
            <ManageRegistrantsComponent />
    </Box>
    )
}

export default ManageRegistrantsPage
