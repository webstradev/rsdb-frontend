import React, { useState } from "react";
import { Typography, Paper, useTheme, LinearProgress } from "@mui/material";
import { PaginatedTable } from "components/PaginatedTable";
import { useApi } from "util/useApi";

const PLATFORM_COLUMNS = [
  { key: "name", header: "Name" },
  { key: "categoryString", header: "Categories" },
  { key: "country", header: "Country" },
  { key: "contactsCount", header: "Contacts" },
  { key: "articlesCount", header: "Articles" },
  { key: "projectsCount", header: "Projects" },
  { key: "source", header: "Source" },
];

export const Platforms: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { data, loading } = useApi(
    "get",
    `/v1/platforms?page=${page}&pageSize=${pageSize}`
  );
  const theme = useTheme();

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: theme.spacing(3),
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography component="h2" variant="h5" color="primary" gutterBottom>
          Platforms
        </Typography>
        <PaginatedTable
          columns={PLATFORM_COLUMNS}
          rows={data?.platforms || []}
          total={data?.total || 0}
          url="platforms"
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        {loading && <LinearProgress />}
      </Paper>
    </>
  );
};
