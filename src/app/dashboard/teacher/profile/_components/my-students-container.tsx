import { Button } from "@/components/ui/button";
import { Lesson, User } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import MyStudentCard from "./my-student-card";

// Sample student data - replace with your actual data source

export interface LessonWithUser extends User {
  studentLessons: Lesson[];
}

// Props interface for your component

interface Props {
  data: LessonWithUser[];
}

export default async function MyStudentContainer({ data }: Props) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Students</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/dashboard/teacher/profile/student-request">
            <PlusCircle className="mr-2 h-4 w-4" />
            Request a student
          </Link>
        </Button>
      </div>

      {data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((student) => (
            <MyStudentCard key={student.id} data={student} />
          ))}
        </div>
      )}
    </div>
  );
}
