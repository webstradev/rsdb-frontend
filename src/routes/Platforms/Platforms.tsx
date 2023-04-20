import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { useApi } from "util/useApi";
import { TablePaginationActions } from "components/TablePaginationActions";

export const Platforms: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { data, loading, error } = useApi(
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
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& > *": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Articles</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.platforms &&
              data.platforms.map((platform: any) => (
                <TableRow
                  key={platform.id}
                  component={RouterLink}
                  to={`/platforms/${platform.id}`}
                  sx={{
                    "& > *": {
                      borderBottom: "unset",
                    },
                    transition:
                      "backgroundColor 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                >
                  <TableCell>{platform.name}</TableCell>
                  <TableCell>{platform.categoryString}</TableCell>
                  <TableCell>{platform.country}</TableCell>
                  <TableCell>{platform.contactsCount}</TableCell>
                  <TableCell>{platform.articlesCount}</TableCell>
                  <TableCell>{platform.projectsCount}</TableCell>
                  <TableCell>{platform.source}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={8}
                count={data?.total}
                rowsPerPage={pageSize}
                labelRowsPerPage="Rows"
                page={page}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setPage(0);
                  setPageSize(+e.target.value);
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
        {loading && <LinearProgress />}
      </Paper>
    </>
  );
};
