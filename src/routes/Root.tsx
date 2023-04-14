import React, { useState, useEffect } from "react";
import { api } from "util/api";
import { Typography, Grid } from "@mui/material";
import { useAuthentication } from "util/useAuthentication";
import { useNavigate } from "react-router-dom";
import { useApiGet, TApiResponse } from "util/useApi";

export const Root: React.FC = () => {
  const { logout } = useAuthentication();
  const navigate = useNavigate();

  const resp: TApiResponse = useApiGet("/v1/counts");
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
