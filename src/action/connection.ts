"use server";
// https://chatgpt.com/share/681b168e-0070-8012-8386-731eec90e1fe
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  studentId: string;
}

export async function connectStudent({ studentId }: Props) {
  const cu = await auth();

  if (!cu?.user) redirect("/login");
  if (cu.user.role !== "teacher") {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const teacherId = cu.user.id as string;
  const existing = await prisma.connection.findFirst({
    where: {
      teacherId,
      studentId,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Assign request already exists",
    };
  }

  await prisma.connection.create({
    data: {
      teacherId,
      studentId,
      status: "pending",
    },
  });

  revalidatePath("/dashboard/teacher/profile/student-request");

  return {
    success: true,
    message: "Assign request sent successfully",
  };
}

export async function connectTeacher(teacherId: string) {
  const cu = await auth();

  if (!cu?.user) redirect("/login");
  if (cu.user.role !== "student") {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const studentId = cu.user.id as string;
  const existing = await prisma.connection.findFirst({
    where: {
      teacherId,
      studentId,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Assign request already exists",
    };
  }

  await prisma.connection.create({
    data: {
      teacherId,
      studentId,
      status: "pending",
    },
  });

  revalidatePath("/dashboard/student/profile/request-teacher");

  return {
    success: true,
    message: "Assign request sent successfully",
  };
}

export async function ApproveConnection(id: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const updatedConnection = await prisma.connection.update({
      where: {
        id,
      },
      data: {
        status: "approved", // Make sure this matches the enum value in your Prisma schema
      },
    });

    revalidatePath("/dashboard/admin/assignment");

    return {
      success: true,
      message: "Connection approved successfully",
      data: updatedConnection,
    };
  } catch (error) {
    console.error("Failed to approve connection:", error);
    return {
      success: false,
      message: "An error occurred while approving the connection",
    };
  }
}

export async function RejectConnection(id: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const updatedConnection = await prisma.connection.update({
      where: { id },
      data: {
        status: "rejected", // Make sure this matches your Prisma enum value
      },
    });

    revalidatePath("/dashboard/admin/assignment");

    return {
      success: true,
      message: "Connection rejected successfully",
      data: updatedConnection,
    };
  } catch (error) {
    console.error("Failed to reject connection:", error);
    return {
      success: false,
      message: "An error occurred while rejecting the connection",
    };
  }
}

export async function RemoveTeacherConnection(teacherId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== ("student" as Role)) {
    return {
      success: false,
      message:
        "Unauthorized action. Only students can remove teacher connections.",
    };
  }

  const connection = await prisma.connection.findFirst({
    where: {
      teacherId,
      studentId: cu.user.id,
    },
  });

  if (!connection) {
    return {
      success: false,
      message: "No connection found between you and the specified teacher.",
    };
  }

  try {
    await prisma.connection.delete({
      where: {
        id: connection.id,
      },
    });

    // Revalidate both profiles
    revalidatePath("/dashboard/student/profile");
    revalidatePath("/dashboard/teacher/profile");

    return {
      success: true,
      message: "Connection with the teacher has been successfully removed.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to disconnect. Please try again later.",
    };
  }
}

export async function RemoveStudentConnection(studentId: string) {
  const cu = await auth();

  if (!cu || cu.user.role !== ("teacher" as Role)) {
    return {
      success: false,
      message:
        "Unauthorized action. Only students can remove teacher connections.",
    };
  }

  const connection = await prisma.connection.findFirst({
    where: {
      teacherId: cu.user.id,
      studentId,
    },
  });

  if (!connection) {
    return {
      success: false,
      message: "No connection found between you and the specified teacher.",
    };
  }

  try {
    await prisma.connection.delete({
      where: {
        id: connection.id,
      },
    });

    // Revalidate both profiles
    revalidatePath("/dashboard/student/profile");
    revalidatePath("/dashboard/teacher/profile");

    return {
      success: true,
      message: "Connection with the teacher has been successfully removed.",
    };
  } catch {
    return {
      success: false,
      message: "Failed to disconnect. Please try again later.",
    };
  }
}

export const getStudentsByTeacherIdNotConeected = async (teacherId: string) => {
  const connections = await prisma.connection.findMany({
    where: {
      teacherId,
    },
    select: {
      studentId: true,
    },
  });

  const studentIds = connections.map((item) => item.studentId);

  const allNotConnectedStudents = await prisma.user.findMany({
    where: {
      id: {
        notIn: studentIds,
      },
    },
  });

  return allNotConnectedStudents;
};

export const AssignFromAdmin = async (tId: string, sId: string) => {
  const cu = await auth();

  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access. Only admins can assign connections.",
    };
  }

  try {
    await prisma.connection.create({
      data: {
        teacherId: tId,
        studentId: sId,
        status: "approved",
      },
    });

    return {
      success: true,
      message: "Student successfully assigned to teacher.",
    };
  } catch (error) {
    console.error("AssignFromAdmin error:", error);
    return {
      success: false,
      message: "Something went wrong while assigning student to teacher.",
    };
  }
};
