import { prisma } from "@/lib/prisma";
import { Account } from "@/types/account";
import { Lesson, Pricing, User } from "@prisma/client";
import PaymentManagementTable from "./_components/Payment-management-table";

// Transform raw MongoDB response into TypeScript-compatible format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowDataType = Lesson & {
  student: User & {
    pricing: Pricing | null;
  };
};

function transformToAccounts(rawData: RowDataType[]): Account[] {
  // Validate input data
  if (!Array.isArray(rawData)) {
    throw new Error("Expected rawData to be an array");
  }

  // Create a dictionary to group lessons by studentId
  const groupedByStudentId: { [key: string]: Account } = {};

  rawData.forEach((item) => {
    // Validate required fields
    if (!item.student || typeof item.student !== "object") {
      throw new Error(`Expected student to be an object`);
    }

    const studentId = item.studentId;

    // Transform the lesson
    const lesson: Lesson = {
      id: item.id,
      teacherId: item.teacherId,
      studentId: item.studentId,
      subjectId: item.subjectId,
      date: new Date(item.date), // Directly use the date field
      time: item.time,
      status: item.status,
      createdAt: new Date(item.createdAt), // Directly use the createdAt field
      updatedAt: new Date(item.updatedAt), // Directly use the updatedAt field
    };

    // If this is the first lesson for the student, initialize the account
    if (!groupedByStudentId[studentId]) {
      // Transform the student object
      const student: User & { pricing: Pricing | null } = {
        id: item.student.id, // Directly use the id field
        name: item.student.name ?? null,
        email: item.student.email ?? null,
        password: item.student.password ?? "", // Optional
        emailVerified: item.student.emailVerified
          ? new Date(item.student.emailVerified)
          : null, // Optional
        image: item.student.image ?? null, // Optional
        phone: item.student.phone ?? null, // Optional
        grantId: item.student.grantId ?? null, // Optional
        grantEmail: item.student.grantEmail ?? null, // Optional
        isGreeting: item.student.isGreeting,
        role: item.student.role,
        createdAt: new Date(item.student.createdAt), // Directly use the createdAt field
        updatedAt: new Date(item.student.updatedAt), // Directly use the updatedAt field
        pricingId: item.student.pricingId ?? null, // Optional
        stripeCustomerId: item.student.stripeCustomerId ?? null, // Optional
        stripePaymentMethodId: item.student.stripePaymentMethodId ?? null, // Optional
        calendarLink: item.student.calendarLink ?? null, // Default or transformed value
        subjects: item.student.subjects ?? [], // Default to an empty array
        pricing: item.student.pricing
          ? {
              id: item.student.pricing.id,
              name: item.student.pricing.name,
              price: item.student.pricing.price,
              unit: item.student.pricing.unit,
              description: item.student.pricing.description,
              isRecommended: item.student.pricing.isRecommended,
              features: item.student.pricing.features,
              createdAt: new Date(item.student.pricing.createdAt),
              updatedAt: new Date(item.student.pricing.updatedAt),
            }
          : null, // Provide a default value when pricing is null
      };

      // Initialize the account for this student
      groupedByStudentId[studentId] = {
        studentId,
        lessons: [],
        student,
      };
    }

    // Add the lesson to the student's lessons array
    groupedByStudentId[studentId].lessons.push(lesson);
  });

  // Convert the grouped dictionary into an array of accounts
  return Object.values(groupedByStudentId);
}

const Page = async () => {
  // Get the current date
  const now = new Date();

  // Calculate the start and end of the last month
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1); // Start of the last month
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the last month
  lastMonthEnd.setUTCHours(23, 59, 59, 999); // Set time to the end of the day (23:59:59.999)

  const payments = await prisma.paymentHistory.findMany({
    where: {
      paymentForDate: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  const arrayOfStudentId = payments.map((item) => item.studentId);

  const lessons = await prisma.lesson.findMany({
    where: {
      date: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
      status: "carried_out",
      studentId: {
        notIn: arrayOfStudentId,
      },
    },
    include: {
      student: {
        include: {
          pricing: true,
        },
      },
    },
  });

  const accounts: Account[] = transformToAccounts(lessons);

  return (
    <div>
      <PaymentManagementTable data={accounts} />
    </div>
  );
};

export default Page;
