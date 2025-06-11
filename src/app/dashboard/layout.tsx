import { auth } from "@/auth";
import DashboardNav from "@/components/local/dashboard-nav";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
