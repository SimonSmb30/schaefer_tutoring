import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OpenConfirmationRequests from "./open-confirmation-request";
import PastHours from "./past-hours";
import PlannedHours from "./planned-hours";

export default function StudentDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-bold">My tutoring dashboard</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <OpenConfirmationRequests />
          <PlannedHours />
          <PastHours />
        </div>
      </CardContent>
    </Card>
  );
}
