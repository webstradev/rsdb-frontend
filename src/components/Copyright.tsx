import React from "react";

import { Typography, Link } from "@mui/material";

export const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://rights-stuff.com">
        Rights Stuff
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
