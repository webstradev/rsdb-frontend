import { Root } from "./Root";
import { Platforms } from "./Platforms/Platforms";
import { Articles } from "./Articles/Articles";
import { Projects } from "./Projects/Projects";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Link as RouterLink } from "react-router-dom";

export const ROUTES = [
  {
    path: "/",
    navBarTitle: "Dashboard",
    navBarIcon: DashboardIcon,
    component: <Root />,
  },
  {
    path: "/platforms",
    navBarTitle: "Platforms",
    navBarIcon: WorkIcon,
    component: <Platforms />,
  },
  {
    path: "/articles",
    navBarTitle: "Articles",
    navBarIcon: NewspaperIcon,
    component: <Articles />,
  },
  {
    path: "/projects",
    navBarTitle: "Projects",
    navBarIcon: VideocamIcon,
    component: <Projects />,
  },
];

export const navBarRoutes = (
  <React.Fragment>
    {ROUTES.map((route) => (
      <ListItemButton key={route.path} component={RouterLink} to={route.path}>
        <ListItemIcon>
          <route.navBarIcon />
        </ListItemIcon>
        <ListItemText primary={route.navBarTitle} />
      </ListItemButton>
    ))}
  </React.Fragment>
);
