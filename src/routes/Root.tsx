import React from "react";
import { Typography, Grid } from "@mui/material";
import { useApi, TApiResponse } from "util/useApi";

export const Root: React.FC = () => {
  const resp: TApiResponse = useApi("get", "/v1/counts");
  const counts = resp.data;

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
