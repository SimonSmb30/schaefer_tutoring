import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AssignmentTableColumn } from "./_components/assignement-table-column";
import AssignmentTableContainer from "./_components/assignment-table-container";

const Page = async () => {
  const allRequests = await prisma.connection.findMany({
    where: {
      status: {
        in: ["pending"],
      },
    },
    include: {
      teacher: true,
      student: true,
    },
  });

  return (
    <div>
      <div className="w-full flex justify-between">
        <h1 className="text-3xl font-bold">Assignment</h1>
        <Button asChild>
          <Link href="/dashboard/admin/assignment/new">New Assign + </Link>
        </Button>
      </div>

      <div>
        <AssignmentTableContainer
          data={allRequests ?? []}
          columns={AssignmentTableColumn}
        />
      </div>
    </div>
  );
};

export default Page;
