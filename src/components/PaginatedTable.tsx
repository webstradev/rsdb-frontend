import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import { TablePaginationActions } from "components/TablePaginationActions";

type TColumnDef = {
  key: string;
  header: string;
};

interface IPaginatedTableProps {
  columns: TColumnDef[];
  rows: any[];
  total: number;
  page: number;
  url: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}
export const PaginatedTable: React.FC<IPaginatedTableProps> = ({
  columns,
  rows,
  total,
  url,
  page,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const theme = useTheme();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell sx={{ fontWeight: "bold" }} id={column.key}>
              {column.header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows &&
          rows.map((row: any) => (
            <TableRow
              key={row.id}
              component={RouterLink}
              to={`/${url}/${row.id}`}
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
              {columns.map((column) => (
                <TableCell id={column.key}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={8}
            count={total}
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
  );
};
