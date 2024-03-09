import { ColumnDef } from "@tanstack/react-table";

export type TableColumnDef<T> = {
  accessorKey: keyof T;
  header: string;
  type?: "boolean" | "date";
};

export const toColumnDef = (
  column: TableColumnDef<any>[]
): ColumnDef<any>[] => {
  console.log(column);

  return column.map((col) => {
    const value: ColumnDef<any> = {
      accessorKey: col.accessorKey as string,
      header: col.header,
    };
    if (col.type === "boolean") {
      value.cell = (row) => {
        return <div>{row.getValue() == "true" ? "✅" : "❌"}</div>;
      };
    }
    return value;
  });
};
