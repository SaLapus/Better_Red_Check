import ContentTableHeader, { HeaderProps } from "./ContentHeader/ContentHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { Order } from "./ContentHeader/ContentHeader";

export interface IRowData {
  key: string;
}

export interface Column<RowData extends IRowData> {
  title: string;
  field: Keys<RowData>;
  cellDataConverter?: (cellData: RowData[Keys<RowData>]) => string;

  sorting?: boolean;
  defaultSort?: Order<RowData>["dest"];
}

export type Keys<O extends IRowData> = Extract<keyof O, string>;
export type ObjectValue<O extends IRowData> = O[Keys<O>];

interface TableProps<RowData extends IRowData> {
  columns: Column<RowData>[];
  data: RowData[];
}

export default function ContentTable<RowData extends IRowData>(
  props: TableProps<RowData>
) {
  const { columns, data } = props;

  const [order, setOrder] = React.useState<Order<RowData> | undefined>(
    (() => {
      const colToSortBy = columns.find((col) => !!col.defaultSort);

      if (!colToSortBy?.defaultSort) return;

      if (colToSortBy)
        return {
          by: colToSortBy.field,
          dest: colToSortBy.defaultSort,
        };
    })()
  );

  const headerColumns: HeaderProps<RowData> = {
    columns: columns.map(({ title, field }) => ({ title, field })),
    order,
    setOrder,
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        stickyHeader
        size="small"
        aria-label="redactors table"
      >
        <ContentTableHeader {...headerColumns} />
        <TableBody>
          {data.map((rowData) => {
            const row: {
              field: (typeof columns)[number]["field"];
              data: string;
            }[] = [];

            columns.forEach((col) => {
              const data = col.cellDataConverter
                ? col.cellDataConverter(rowData[col.field])
                : rowData[col.field];
              row.push({ field: col.field, data: String(data) });
            });

            return (
              <TableRow
                key={rowData.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map(({ field, data }) => (
                  <TableCell key={field}>{data}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
