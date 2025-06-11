"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";
import { SubjectSchemaType } from "@/schemas/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const subjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
});

export async function CreateSubjectAction(values: SubjectSchemaType) {
  const submissionValue = subjectSchema.safeParse(values);
  const session = await requireUser();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized: User session is required",
    };
  }

  if (!submissionValue.success) {
    return {
      success: false,
      message: submissionValue.error.message,
    };
  }

  try {
    await prisma.subject.create({
      data: {
        name: submissionValue.data.name,
      },
    });

    revalidatePath("/dashboard/admin");

    return {
      success: true,
      message: "Subject Added Successfully",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function EditSubjectAction(id: string, values: SubjectSchemaType) {
  const submissionValue = subjectSchema.safeParse(values);

  const session = await requireUser();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized: User session is required",
    };
  }

  if (!submissionValue.success) {
    return {
      success: false,
      message: submissionValue.error.message,
    };
  }

  try {
    // Find the subject by id first
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return {
        success: false,
        message: "Subject not found",
      };
    }

    // Update the subject
    await prisma.subject.update({
      where: { id },
      data: {
        name: submissionValue.data.name,
      },
    });

    revalidatePath("/dashboard/admin");

    return {
      success: true,
      message: "Subject updated successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function DeleteSubjectAction(id: string) {
  const session = await requireUser();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized: User session is required",
    };
  }

  try {
    // Find the subject by id first
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return {
        success: false,
        message: "Subject not found",
      };
    }

    // Delete the subject
    await prisma.subject.delete({
      where: { id },
    });

    revalidatePath("/dashboard/admin");

    return {
      success: true,
      message: "Subject deleted successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
