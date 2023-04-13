import React, { useState, useEffect } from "react";
import { api } from "util/api";
import { Typography, Grid } from "@mui/material";
import { useAuthentication } from "util/useAuthentication";
import { useNavigate } from "react-router-dom";

interface CountsResponse {
  articles: number;
  platforms: number;
  projects: number;
  contacts: number;
}

export const Root: React.FC = () => {
  const [counts, setCounts] = useState<CountsResponse | null>(null);
  const { logout } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    const getCounts = async () => {
      try {
        const res = await api.get("/v1/counts");
        setCounts(res.data);
      } catch (e: any) {
        if (e.response?.status === 401) {
          logout();
          navigate("/login");
        }
      }
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
