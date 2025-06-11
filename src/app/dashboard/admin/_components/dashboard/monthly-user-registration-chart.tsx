import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyData = [
  { name: "Jan", lessons: 65, users: 24 },
  { name: "Feb", lessons: 59, users: 13 },
  { name: "Mar", lessons: 80, users: 29 },
  { name: "Apr", lessons: 81, users: 38 },
  { name: "May", lessons: 56, users: 12 },
  { name: "Jun", lessons: 55, users: 31 },
  { name: "Jul", lessons: 40, users: 37 },
  { name: "Aug", lessons: 45, users: 25 },
  { name: "Sep", lessons: 65, users: 32 },
  { name: "Oct", lessons: 59, users: 29 },
  { name: "Nov", lessons: 80, users: 41 },
  { name: "Dec", lessons: 91, users: 48 },
];

const MonthlyUserregistrationChart = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Monthly User Registrations</CardTitle>
        <CardDescription>
          New user registration trends over the past year
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="hsl(var(--primary))" name="New Users" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyUserregistrationChart;
