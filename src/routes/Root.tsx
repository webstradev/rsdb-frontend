import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Typography, Grid } from "@mui/material";

interface CountsResponse {
  articles: number;
  platforms: number;
  projects: number;
  contacts: number;
}

export const Root: React.FC = () => {
  const [counts, setCounts] = useState<CountsResponse | null>(null);
  useEffect(() => {
    const getCounts = async () => {
      const res = await api.get("/v1/counts");

      setCounts(res.data);
    };

    getCounts();
  }, []);

  return (
    <Grid>
      <Typography component="h2">This is the Root Page!</Typography>
      {counts && (
        <>
          <Typography component="h2">
            There are {counts?.platforms} platforms
          </Typography>
          <Typography component="h2">
            There are {counts?.articles} articles
          </Typography>
          <Typography component="h2">
            There are {counts?.projects} projects
          </Typography>
          <Typography component="h2">
            There are {counts?.contacts} contacts
          </Typography>
        </>
      )}
    </Grid>
  );
};
