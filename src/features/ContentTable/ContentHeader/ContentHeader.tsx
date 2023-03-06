import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { IRowData, Keys } from "../ContentTable";

interface HeaderColumn<RowData extends IRowData> {
  title: string;
  field: Keys<RowData>;
}

export type Sorted = boolean;

export interface Order<RowData extends IRowData> {
  dest: "asc" | "desc";
  by: Keys<RowData>;
}

export interface HeaderProps<RowData extends IRowData> {
  columns: HeaderColumn<RowData>[];

  order?: Order<RowData>;
  setOrder?: (order: Order<RowData>) => void;
}

export default function ContentTableHeader<RowData extends IRowData>(
  props: HeaderProps<RowData>
) {
  const { columns, order } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => {
          return (
            <TableCell key={col.field}>
              <TableSortLabel>
                {col.title}
                {order?.by === col.field ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order.dest === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
