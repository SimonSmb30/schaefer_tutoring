import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pricing } from "@prisma/client";
import { CalendarClock, CheckCircle, ClipboardList } from "lucide-react";

interface Props {
  todaysLessons: number;
  completedLessons: number;
  plannedSessions: number;
  pricing?: Pricing;
}

export default function StudentDashboardStats({
  todaysLessons,
  completedLessons,
  plannedSessions,
  pricing,
}: Props) {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          View your lesson statistics and subscription details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Lessons
            </CardTitle>
            <CalendarClock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todaysLessons}</div>
            <p className="text-xs text-muted-foreground">Scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Completed Lessons
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedLessons}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Planned Sessions
            </CardTitle>
            <ClipboardList className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{plannedSessions}</div>
            <p className="text-xs text-muted-foreground">To be completed</p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Free Trial Requests
            </CardTitle>
            <Clock className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card> */}
      </div>

      {pricing && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Current Subscription</h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{pricing.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {pricing.description}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Price</h3>
                  <p className="text-2xl font-bold text-primary">
                    ${pricing.price}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {pricing.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
