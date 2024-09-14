import React from "react";
import CreateEvent from "../../components/administration/createEvent";
import { Box } from "@mui/material";
import LeftSideBar from "../../components/global/leftSideBar";
import { adminSidebarMenuItems } from "../../constants/index";

const CreateEventPage = () => {
  return (
    <Box>
        <LeftSideBar menuItems={adminSidebarMenuItems} />
        <CreateEvent />
    </Box>
  )
}

export default CreateEventPage
