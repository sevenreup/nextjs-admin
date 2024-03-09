import AdminTable from "@/components/admin/ui/table";
import { drivers } from "@/lib/models/schema";
import { relations, type InferSelectModel } from "drizzle-orm";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { TableColumnDef } from "@/components/admin/ui/table/def";

type Props = {};

type Driver = InferSelectModel<typeof drivers>;

const columns: TableColumnDef<Driver>[] = [
  {
    accessorKey: "isVerified",
    header: "Verified",
    type: "boolean"
  },
  {
    accessorKey: "userId",
    header: "User Id",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

const Page = (props: Props) => {
  return (
    <AdminTable
      dataMeta={{
        resource: "drivers",
      }}
      columns={columns}
    />
  );
};

export default Page;
