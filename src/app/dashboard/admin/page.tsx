import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import AdminDashboardOverviewCards from "./_components/dashboard/dash-cards";

// Sample data - would be fetched from your API in a real implementation
// const monthlyData = [
//   { name: "Jan", lessons: 65, users: 24 },
//   { name: "Feb", lessons: 59, users: 13 },
//   { name: "Mar", lessons: 80, users: 29 },
//   { name: "Apr", lessons: 81, users: 38 },
//   { name: "May", lessons: 56, users: 12 },
//   { name: "Jun", lessons: 55, users: 31 },
//   { name: "Jul", lessons: 40, users: 37 },
//   { name: "Aug", lessons: 45, users: 25 },
//   { name: "Sep", lessons: 65, users: 32 },
//   { name: "Oct", lessons: 59, users: 29 },
//   { name: "Nov", lessons: 80, users: 41 },
//   { name: "Dec", lessons: 91, users: 48 },
// ];

export default async function AdminDashboard() {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // First day of the next month

  const stripeBalance = (await stripe.balance.retrieve()).pending;

  const lessonCompleted = await prisma.lesson.count({
    where: {
      date: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: startOfNextMonth, // Less than the start of the next month
      },
      status: "carried_out",
    },
  });
  const lessonsPending = await prisma.lesson.count({
    where: {
      date: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: startOfNextMonth, // Less than the start of the next month
      },
      status: {
        in: ["accepted", "planned", "now"],
      },
    },
  });

  const totalFreeTrial = await prisma.freeTrialReq.count({
    where: {
      date: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: startOfNextMonth, // Less than the start of the next month
      },
    },
  });
  const completedFreeTrial = await prisma.freeTrialReq.count({
    where: {
      date: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: startOfNextMonth, // Less than the start of the next month
      },
      status: "completed",
    },
  });

  const userRegistered = await prisma.user.count({
    where: {
      createdAt: {
        gte: startOfMonth, // Greater than or equal to the start of the month
        lt: startOfNextMonth, // Less than the start of the next month
      },
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-0 pr-0">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>
        <AdminDashboardOverviewCards
          stripeBalane={stripeBalance[0].amount / 100}
          lessonCompleted={lessonCompleted ?? 0}
          lessonsPending={lessonsPending ?? 0}
          totalFreeTrial={totalFreeTrial ?? 0}
          completedFreeTrial={completedFreeTrial ?? 0}
          userRegistered={userRegistered ?? 0}
        />
      </div>
    </div>
  );
}
