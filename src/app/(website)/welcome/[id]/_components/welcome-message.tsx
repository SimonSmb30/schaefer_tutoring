"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  BookMarked,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  UserCircle,
} from "lucide-react";

interface WelcomeMessageProps {
  role: "teacher" | "student";
  userName?: string;
  isGratings: boolean;
}

export default function WelcomeMessage({
  role = "teacher",
  userName = "there",
}: WelcomeMessageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="border-t-8 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl md:text-3xl">
            Welcome, {userName}! 👋
          </CardTitle>
          <CardDescription className="text-lg">
            We&apos;re excited to have you join our learning platform
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue={role}>
          <TabsContent value="teacher" className="pt-2">
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">
                  Get started as a Teacher
                </h3>
                <p className="text-muted-foreground">
                  As a teacher, you can book lessons with students, manage your
                  calendar, update your profile, and track your teaching hours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <BookMarked className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Lesson Booking</h4>
                      <p className="text-sm text-muted-foreground">
                        Schedule lessons with your students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <Calendar className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Calendar Feature</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your teaching schedule
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <UserCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Profile Update</h4>
                      <p className="text-sm text-muted-foreground">
                        Customize your teaching profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Teaching Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Track your teaching time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.location.href = "/dashboard/teacher/profile";
                }}
              >
                Complete Your Profile
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="student" className="pt-2">
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">
                  Get started as a Student
                </h3>
                <p className="text-muted-foreground">
                  As a student, you can discover recommended lessons, confirm
                  bookings, update your profile, and make lesson payments.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <BookMarked className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        You can earn point by recomend others
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Lesson Confirmation</h4>
                      <p className="text-sm text-muted-foreground">
                        Confirm your scheduled lessons
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <UserCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Profile Update</h4>
                      <p className="text-sm text-muted-foreground">
                        Customize your learning profile
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">Lesson Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Pay for your booked lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.location.href = "/dashboard/student/profile";
                }}
              >
                Complete Your Profile
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
