// Packages
import dynamic from "next/dynamic";

// Components
import DashboardSideBar from "@/app/dashboard/_components/dashboard-sidebar";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { teacherDashboardTabLists } from "../_components/data";
const DashboardContent = dynamic(
  () => import("@/app/dashboard/_components/dashboard-content"),
  {
    ssr: false,
  }
);

export default async function TeacherDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await auth();

  if (!user) redirect("/login");

  return (
    <div className="container mx-auto grid  grid-cols-6 mt-10 ">
      <div className="hidden md:block md:col-span-1">
        <DashboardSideBar
          role={user.user.role as Role}
          tabLists={teacherDashboardTabLists}
        />
      </div>
      <div className="col-span-6 md:col-span-5 md:px-4 lg:px-6">
        <DashboardContent
          role={user.user.role as Role}
          tabLists={teacherDashboardTabLists}
        >
          {children}
        </DashboardContent>
      </div>
    </div>
  );
}
