import /**
 * Component that renders a user menu with options to view user information and sign out.
 * Uses the `useAuthentication` hook to retrieve user data and logout functionality.
 * Uses the `useNavigate` hook to navigate to the login page after logging out.
 */
React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuthentication } from "util/useAuthentication";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuthentication();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        size="large"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        keepMounted
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem disabled>{userData.email}</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
            navigate("/login");
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};
