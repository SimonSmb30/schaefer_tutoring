import { Button } from "@/components/ui/button";
import { Lesson, User } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import MyTeacherCard from "./my-teacher-card";

export interface LessonWithTeacher extends User {
  teacherLessons: Lesson[];
}

interface Props {
  data: LessonWithTeacher[];
}

export default function MyTeacherContainer({ data }: Props) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Teachers</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/dashboard/student/profile/request-teacher">
            <PlusCircle className="mr-2 h-4 w-4" />
            Request a teacher
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((teacher) => (
          <MyTeacherCard key={teacher.id} data={teacher} />
        ))}
      </div>
    </div>
  );
}
