import React, { useState } from "react";
import {
  CircularProgress,
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
} from "@mui/material";
import { useApi } from "util/useApi";
import { TablePaginationActions } from "components/TablePaginationActions";

export const Platforms: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, loading, error } = useApi("get", `/v1/platforms?page=${page}`);
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
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Contacts</TableCell>
              <TableCell>Articles</TableCell>
              <TableCell>Projects</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.platforms &&
              data.platforms.map((platform: any) => (
                <TableRow key={platform.id}>
                  <TableCell>{platform.name}</TableCell>
                  <TableCell>{platform.categoryString}</TableCell>
                  <TableCell>{platform.country}</TableCell>
                  <TableCell>{platform.website}</TableCell>
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
                rowsPerPageOptions={[10, 25, 50, 100]}
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
      </Paper>
    </>
  );
};
