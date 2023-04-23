/**
 * A paginated table component that renders a table with rows and columns.
 * Each row contains a link to a specific page and can be modified with a modifier function.
 *
 * @param {TColumnDef[]} columns - An array of objects that defines the table columns with the following properties:
 *   @property {string} key - A unique key for the column.
 *   @property {string} header - The header text for the column.
 *   @property {function} [modifier] - An optional function to modify the value of the cell.
 * @param {any[]} rows - An array of objects that defines the table rows.
 * @param {number} total - The total number of rows in the table.
 * @param {number} page - The current page of the table.
 * @param {string} url - The base url to link each row to.
 * @param {React.Dispatch<React.SetStateAction<number>>} setPage - A function to update the current page state.
 * @param {number} pageSize - The number of rows per page.
 * @param {React.Dispatch<React.SetStateAction<number>>} setPageSize - A function to update the rows per page state.
 *
 */
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

export type TColumnDef = {
  key: string;
  header: string;
  modifier?: (val: any) => any;
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
                <TableCell id={column.key}>
                  {!!column.modifier
                    ? column.modifier(row[column.key])
                    : row[column.key]}
                </TableCell>
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
