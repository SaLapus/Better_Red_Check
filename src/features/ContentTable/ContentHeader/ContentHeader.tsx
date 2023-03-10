import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import * as React from "react";

import { IRowData, Keys, Order } from "../ContentTable";

interface HeaderColumn<RowData extends IRowData> {
  title: string;
  field: Keys<RowData>;
}

export interface HeaderProps<RowData extends IRowData> {
  columns: HeaderColumn<RowData>[];

  sort: {
    order: Order<RowData> | undefined;
    setOrder: React.Dispatch<React.SetStateAction<Order<RowData> | undefined>>;
  };
}

export default function ContentTableHeader<RowData extends IRowData>(
  props: HeaderProps<RowData>
) {
  function toggleSort(field: Keys<RowData>): void {
    if (!sort.order || field !== sort.order.field)
      return sort.setOrder({ field, type: "desc" });

    if (field === sort.order.field) {
      sort.setOrder({
        field,
        type: sort.order.type === "desc" ? "asc" : "desc",
      });
    }
  }

  const { columns, sort } = props;

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ field, title }) => {
          const isOrdered = field === sort.order?.field;
          return (
            <TableCell
              key={field}
              align={"left"}
            >
              <TableSortLabel
                active={isOrdered}
                direction={sort.order?.type}
                onClick={() => toggleSort(field)}
              >
                {title}
                {isOrdered ? (
                  <Box
                    component="span"
                    sx={visuallyHidden}
                  >
                    {sort.order?.type === "desc"
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
