import AdminTable from "@/components/admin/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Props = {};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
        resource: "profiles",
      }}
      columns={columns}
    />
  );
};

export default Page;
