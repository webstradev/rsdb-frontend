/**
 * The main layout component that provides a consistent look and feel for the
 * entire app. It includes an app bar, a side drawer with navigation links,
 * and a container for the content of the current page.
 *
 * @returns {ReactElement} The rendered layout component
 */
import React from "react";
import { Outlet } from "react-router-dom";
import {
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Container,
  Divider,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { AppBar, Drawer } from "./AppBar";
import { Copyright } from "./Copyright";
import { navBarRoutes } from "routes/routes";
import { useAuthentication } from "util/useAuthentication";
import { UserMenu } from "components/UserMenu";

export const Layout: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { userData } = useAuthentication();

  const loggedIn = userData.id > 0;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Rights Stuff Database
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {loggedIn && <UserMenu />}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{navBarRoutes}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
