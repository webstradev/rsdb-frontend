import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import VideocamIcon from "@mui/icons-material/Videocam";

const ROUTES = [
  {
    path: "/",
    navBarTitle: "Dashboard",
    navBarIcon: DashboardIcon,
  },
  {
    path: "/platforms",
    navBarTitle: "Platforms",
    navBarIcon: WorkIcon,
  },
  {
    path: "/articles",
    navBarTitle: "Articles",
    navBarIcon: NewspaperIcon,
  },
  {
    path: "/projects",
    navBarTitle: "Projects",
    navBarIcon: VideocamIcon,
  },
];

export const mainListItems = (
  <React.Fragment>
    {ROUTES.map((map) => (
      <ListItemButton>
        <ListItemIcon>
          <map.navBarIcon />
        </ListItemIcon>
        <ListItemText primary={map.navBarTitle} />
      </ListItemButton>
    ))}
  </React.Fragment>
);
