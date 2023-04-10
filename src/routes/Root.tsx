import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Typography } from "@mui/material";

export const Root: React.FC = () => {
  const [healthy, setHealthy] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const res = await api.get("/health");

      setTimeout(() => setHealthy(res.status === 200), 100);
    };

    checkStatus();
  }, []);

  return (
    <Typography component="h2">
      This is the Root Page! The server is {!healthy && "un"}healthy
    </Typography>
  );
};
