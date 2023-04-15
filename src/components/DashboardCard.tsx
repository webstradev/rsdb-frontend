import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography, useTheme } from "@mui/material";

interface DashboardCardProps {
  title: string;
  count: number;
  to: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  count,
  to,
}) => {
  const theme = useTheme();
  return (
    <RouterLink to={to}>
      <Card
        sx={{
          cursor: "pointer",
          color: theme.palette.primary.main,
          "&:hover": {
            background: theme.palette.grey[300],
            cursor: "pointer",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h4" align="center">
            {count}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </RouterLink>
  );
};
