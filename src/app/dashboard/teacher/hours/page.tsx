import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import PastTeacherHours from "../_components/past-hours";
import PlannedHours from "../_components/planned-hours";

const Page = async () => {
  const currentUser = await auth();

  if (!currentUser) redirect("/login");

  return (
    <div className="">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
          <CardTitle className="text-xl font-bold">My Dashboard</CardTitle>
          <Button effect="gooeyLeft">
            <Link href="/dashboard/teacher/hours/new">Book a new lesson</Link>
          </Button>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <PlannedHours />
            <PastTeacherHours />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
