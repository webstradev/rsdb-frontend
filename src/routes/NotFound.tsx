import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, the page you are looking for cannot be found.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" sx={{ mt: 2 }}>
        Go back to homepage
      </Button>
    </div>
  );
};
