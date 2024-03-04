import AdminTable from "@/components/admin/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Props = {};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
];

const Page = (props: Props) => {
  return (
    <ScrollArea className="h-screen">
      <AdminTable
        dataMeta={{
          resource: "profiles",
        }}
        columns={columns}
      />
    </ScrollArea>
  );
};

export default Page;
