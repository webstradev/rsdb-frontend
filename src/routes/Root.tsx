import React from "react";
import capitalize from "lodash/capitalize";
import { Grid, CircularProgress } from "@mui/material";
import { useApi, TApiResponse } from "util/useApi";
import { DashboardCard } from "components/DashboardCard";

type CountType = {
  articles: number;
  contacts: number;
  platforms: number;
  projects: number;
};

export const Root: React.FC = () => {
  const resp: TApiResponse = useApi("get", "/v1/counts");
  const counts = resp.data as CountType;

  if (resp.loading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {counts &&
        Object.entries(counts).map(([key, value]) => (
          <Grid key={key} item xs={12} sm={6} md={3}>
            <DashboardCard
              title={capitalize(key)}
              count={value}
              to={`/${key}`}
            />
          </Grid>
        ))}
    </Grid>
  );
};
