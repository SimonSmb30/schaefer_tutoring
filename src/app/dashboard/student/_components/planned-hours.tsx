import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import moment from "moment";
import { redirect } from "next/navigation";

export default async function PlannedHours() {
  const session = await requireUser();
  if (!session) redirect("/login");

  const data = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "accepted",
      date: {
        gte: new Date(),
      },
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
      <h2 className="text-xl font-semibold">Planned hours</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex justify-start">Date</TableHead>
            <TableHead className="text-center">Start time</TableHead>
            <TableHead className="text-center">Academic subject</TableHead>
            <TableHead className="text-center">Teacher</TableHead>
            <TableHead className="flex justify-end">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium flex justify-start">
                {moment(session.date).format("MMMM D, YYYY")}
              </TableCell>
              <TableCell className="text-center">{session.time}</TableCell>
              <TableCell className="text-center">
                {session.subject.name}
              </TableCell>
              <TableCell className="text-center">
                {session.teacher.name}
              </TableCell>
              <TableCell className="flex justify-end">
                <Badge
                  className={cn(
                    "rounded-[50px]",
                    session.status === "accepted"
                      ? "bg-green-500 hover:bg-green-500/80"
                      : "bg-yellow-500 hover:bg-yellow-500/80"
                  )}
                >
                  {session.status === "accepted" ? "Zur Stunde" : "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
