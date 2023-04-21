import React, { useState } from "react";
import { Typography, Paper, useTheme, LinearProgress } from "@mui/material";
import { PaginatedTable, TColumnDef } from "components/PaginatedTable";
import { useApi } from "util/useApi";
import { TSQLDateDef } from "types";

const ARTICLES_COLUMNS = [
  {
    key: "date",
    header: "Date",
    modifier: (val: TSQLDateDef) => {
      if (val.Valid) {
        return new Date(val.Time).toLocaleDateString();
      } else {
        return "Unknown";
      }
    },
  },
  { key: "title", header: "Title" },
  { key: "tagString", header: "Tags" },
  { key: "description", header: "Description" },
] as TColumnDef[];

export const Articles: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { data, loading } = useApi(
    "get",
    `/v1/articles?page=${page}&pageSize=${pageSize}`
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
          Articles
        </Typography>
        <PaginatedTable
          columns={ARTICLES_COLUMNS}
          rows={data?.articles || []}
          total={data?.total || 0}
          url="articles"
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
