import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import VideocamIcon from "@mui/icons-material/Videocam";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Platforms" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NewspaperIcon />
      </ListItemIcon>
      <ListItemText primary="Articles" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <VideocamIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItemButton>
  </React.Fragment>
);
