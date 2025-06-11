"use server";

import { auth } from "@/auth";
import EmailVerification from "@/emails/email-verification";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import {
  StudentProfileSchemaType,
  TeacherCreateSchemaType,
  TeacherProfileSchemaType,
} from "@/schemas/schema";

export const updateProfile = async (data: StudentProfileSchemaType) => {
  const currentUser = await auth();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized user",
    };
  }

  const userId = currentUser.user.id;

  const isMailChanged = currentUser.user.email !== data.email;

  try {
    // Filter out undefined values to avoid overwriting with null
    const updateData: Partial<StudentProfileSchemaType> = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    if (isMailChanged) {
      // send verification email
      // send email to the student
      await resend.emails.send({
        from: "Schaefer Tutor <support@schaefer-tutoring.com>",
        to: [data.email!],
        subject: "Please verify your email address",
        react: EmailVerification({
          username: data?.name ?? "",
          verificationUrl: `${process.env.AUTH_URL}/email-verification/${userId}`,
        }),
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          emailVerified: null,
        },
      });

      return {
        success: true,
        emailChanged: true,
        message: "Please verify your email",
      };
    }

    return {
      success: true,
      message: "profile updated successfully",
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
export const updateTeacherProfile = async (data: TeacherProfileSchemaType) => {
  const currentUser = await auth();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized user",
    };
  }

  const userId = currentUser.user.id;
  const isMailChanged = currentUser.user.email !== data.email;

  try {
    // Filter out undefined values to avoid overwriting with null
    const updateData: Partial<TeacherCreateSchemaType> = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    if (isMailChanged) {
      // send verification email
      // send email to the student
      await resend.emails.send({
        from: "Schaefer Tutor <support@schaefer-tutoring.com>",
        to: [data.email!],
        subject: "Please verify your email address",
        react: EmailVerification({
          username: data?.name ?? "",
          verificationUrl: `${process.env.AUTH_URL}/email-verification/${userId}`,
        }),
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          emailVerified: null,
        },
      });

      return {
        success: true,
        emailChanged: true,
        message: "Please verify your email",
      };
    }

    return {
      success: true,
      message: "profile updated successfully",
    };
  } catch (error) {
    console.error("Update failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
