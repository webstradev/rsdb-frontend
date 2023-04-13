import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import WorkIcon from "@mui/icons-material/Work";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Link as RouterLink } from "react-router-dom";

// Route components
import { Root } from "./Root";
import { Platforms } from "routes/Platforms/Platforms";
import { Articles } from "routes/Articles/Articles";
import { Projects } from "routes/Projects/Projects";
import { Login } from "routes/Login";

export const ROUTES = [
	{
		path: "/",
		authenticated: true,
		navBarTitle: "Dashboard",
		navBarIcon: DashboardIcon,
		component: <Root />,
	},
	{
		path: "/platforms",
		authenticated: true,
		navBarTitle: "Platforms",
		navBarIcon: WorkIcon,
		component: <Platforms />,
	},
	{
		path: "/articles",
		authenticated: true,
		navBarTitle: "Articles",
		navBarIcon: NewspaperIcon,
		component: <Articles />,
	},
	{
		path: "/projects",
		authenticated: true,
		navBarTitle: "Projects",
		navBarIcon: VideocamIcon,
		component: <Projects />,
	},
	{
		path: "/login",
		component: <Login />,
	},
];

export const navBarRoutes = (
	<React.Fragment>
		{ROUTES.map(
			(route) =>
				route.navBarTitle && (
					<ListItemButton
						key={route.path}
						component={RouterLink}
						to={route.path}
					>
						<ListItemIcon>
							<route.navBarIcon />
						</ListItemIcon>
						<ListItemText primary={route.navBarTitle} />
					</ListItemButton>
				)
		)}
	</React.Fragment>
);
