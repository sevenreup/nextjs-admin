import { DBTables, dbTableMap } from "@/lib/models/table-map";
import { db } from "@/lib/supabase/db";
import React from "react";
import AdminTableContent from "./table";
import { TableColumnDef } from "./def";

type DataProps = {
  resource?: DBTables;
  // TODO: Pass pagination to the dataBuilder
  dataBuilder?: () => Promise<any[]>;
};

type Props<T> = {
  dataMeta: DataProps;
  columns?: TableColumnDef<T>[];
};

function generateColumns<T>(data: any[]): TableColumnDef<T>[] {
  if (data.length === 0) {
    return [];
  }
  const sample = data[0];
  return Object.entries(sample).map(([key, value]) => {
    return {
      accessorKey: key,
      header: key,
    } as any;
  });
}

async function AdminTable<T>({ dataMeta, columns }: Props<T>) {
  const data = await getData(dataMeta);
  return (
    <div className="h-full flex flex-col">
      <AdminTableContent
        data={data}
        columns={columns ? columns : generateColumns(data)}
      />
    </div>
  );
}

const getData = async ({
  resource,
  dataBuilder,
}: DataProps): Promise<any[]> => {
  try {
    if (dataBuilder != undefined) {
      return await dataBuilder();
    }
    if (resource != undefined) {
      return await fetchTableDataFromResource(resource);
    }

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

const fetchTableDataFromResource = async (resource: DBTables) => {
  const table = dbTableMap[resource];
  const data = await db.select().from(table);

  return data;
};

export default AdminTable;
