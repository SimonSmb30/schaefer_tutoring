import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import moment from "moment";
import { redirect } from "next/navigation";
import { TableActions } from "./table-action";

export default async function OpenConfirmationRequests() {
  const session = await requireUser();
  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "planned",
    },
    include: {
      subject: {
        select: {
          name: true,
        },
      },
      teacher: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Open confirmation requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex justify-start">Date</TableHead>
            <TableHead className="text-center">Start time</TableHead>
            <TableHead className="text-center">Academic subject</TableHead>
            <TableHead className="text-center">Teacher</TableHead>
            <TableHead className="flex justify-end">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium flex justify-start">
                <p>{moment(request.date).format("MMMM D, YYYY")}</p>
              </TableCell>
              <TableCell className="text-center">{request.time}</TableCell>
              <TableCell className="text-center">
                {request.subject.name}
              </TableCell>
              <TableCell className="text-center">
                {request.teacher.name}
              </TableCell>
              <TableCell className="flex justify-end">
                <TableActions id={request.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
