"use server";
import { PasswordFormValues } from "@/app/(auth)/reset-password/checked/_components/final-reset-pass-form";
import { auth, signIn } from "@/auth";
import EmailVerification from "@/emails/email-verification";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { loginSchema, LoginValues, registrationSchema } from "@/schemas/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

type Val = z.infer<typeof registrationSchema>;

export async function RegistrationAction(data: Val, ref: string | null) {
  const validationResult = registrationSchema.safeParse(data);

  if (!validationResult.success) {
    // Return errors if validation fails
    return { errors: validationResult.error.format() };
  }

  // If validation passes, proceed with registration logic
  const validatedData = validationResult.data;

  // Check if the user already exists
  const exist = await prisma.user.findFirst({
    where: {
      email: validatedData.email,
    },
  });

  if (exist) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      email: validatedData.email,
      password: hashedPassword,
      name: validatedData.name, // Assuming name is part of registrationSchema
      role: validatedData.role, // Assuming role is part of registrationSchema`
      phone: validatedData.phone,
    },
  });

  // update recomendations

  if (ref) {
    const recommendation = await prisma.recommendation.findFirst({
      where: {
        slug: ref,
      },
    });

    if (recommendation) {
      await prisma.participantJoin.create({
        data: {
          recommendationId: recommendation.id,
          participantId: newUser.id,
          slugId: ref,
        },
      });
    }
  }

  // send email to the student
  await resend.emails.send({
    from: "Schaefer Tutor <support@schaefer-tutoring.com>",
    to: [newUser.email],
    subject: "Please verify your email address",
    react: EmailVerification({
      username: newUser?.name ?? "",
      verificationUrl: `${process.env.AUTH_URL}/email-verification/${newUser.id}`,
    }),
  });

  return { success: true, message: "Registration successfully!" }; // 👈 Explicit response
}

export async function LoginAction(data: LoginValues) {
  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: validationResult.error.message };
  }

  const validatedData = validationResult.data;

  // Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: validatedData.email as string,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User Not Found!",
    };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      message: "Email not verified. Please verify your email to proceed.",
    };
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    validatedData.password as string,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Password mismatch!",
    };
  }

  try {
    await signIn("credentials", {
      redirectTo: `/dashboard/${user.role}`,
      email: validatedData.email,
      password: validatedData.password,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid credentials!",
          };

        default:
          return {
            success: false,
            message: "Something went wrong!",
          };
      }
    }

    throw error;
  }

  // You can implement session handling or JWT generation here

  return redirect(`/dashboard/${user.role}`);
}

// export async function TeacherRegistrationAction(
//   data: z.infer<typeof teacherCreateSchema>
// ) {
//   const validationResult = teacherCreateSchema.safeParse(data);

//   if (!validationResult.success) {
//     return { errors: validationResult.error.format() };
//   }

//   const validatedData = validationResult.data;

//   // Normalize email
//   const email = validatedData.email.toLowerCase();

//   // Check if teacher already exists
//   const exist = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (exist) {
//     return { success: false, message: "User already exists." };
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//   try {
//     // Create the teacher in the database
//     await prisma.user.create({
//       data: {
//         name: validatedData.name,
//         email,
//         password: hashedPassword,
//         role: "teacher",
//         subjects: validatedData.subjectids,
//       },
//     });

//     revalidatePath("/dashboard/admin");

//     return { success: true, message: "Teacher Added successful!" };
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     return { success: false, message: err.message };
//   }
// }

// export async function TeacherEditAction(
//   data: z.infer<typeof teacherCreateSchema>
// ) {
//   const validationResult = teacherCreateSchema.safeParse(data);

//   if (!validationResult.success) {
//     return { errors: validationResult.error.format() };
//   }

//   const validatedData = validationResult.data;

//   // Normalize email
//   const email = validatedData.email.toLowerCase();

//   try {
//     // Check if the teacher exists
//     const existingTeacher = await prisma.user.findUnique({
//       where: { email: validatedData.email },
//     });

//     if (!existingTeacher) {
//       return { success: false, message: "Teacher not found." };
//     }

//     // Check if the email is being changed and if it already exists for another user
//     if (email !== existingTeacher.email) {
//       const emailExists = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (emailExists) {
//         return { success: false, message: "Email is already in use." };
//       }
//     }

//     const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//     // Perform the update in the database
//     await prisma.user.update({
//       where: { email: validatedData.email },
//       data: {
//         name: validatedData.name,
//         password: hashedPassword,
//         subjects: validatedData.subjectids,
//       },
//     });

//     revalidatePath("/dashboard/admin");

//     return { success: true, message: "Teacher updated successfully!" };
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     return { success: false, message: err.message };
//   }
// }

export async function RemoveTeacher(id: string) {
  try {
    // Check if the teacher exists
    const existingTeacher = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      return { success: false, message: "Teacher not found." };
    }

    // Delete the teacher from the database
    await prisma.user.delete({
      where: { id },
    });

    // Revalidate the dashboard path to reflect changes
    revalidatePath("/dashboard/admin");

    return { success: true, message: "Teacher removed successfully!" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function isGreetinsDone() {
  const cs = await auth();

  if (!cs) {
    return true;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: cs.user.id,
    },
    select: {
      isGreeting: true,
    },
  });

  return user?.isGreeting ?? true;
}

export async function verifyEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    message: "User exists",
    data: user,
  };
}

export async function resetPassword(data: PasswordFormValues) {
  try {
    // Step 1: Find the user by email
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    // If the user does not exist, return an error
    if (!user) {
      return {
        success: false,
        message: "User with this email does not exist.",
      };
    }

    // Step 2: Verify that the previous password matches the stored hashed password
    const isPasswordMatch = await bcrypt.compare(
      data.currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "The current password is incorrect.",
      };
    }

    // Step 3: Hash the new password using bcrypt
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(data.newPassword, saltRounds);

    // Step 4: Update the user's password in the database
    await prisma.user.update({
      where: {
        id: user.id, // Assuming the user has a unique `id` field
      },
      data: {
        password: hashedPassword, // Update the password field with the hashed value
      },
    });

    // Step 5: Return a success response
    return {
      success: true,
      message: "Password reset successfully.",
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error resetting password:", error);
    return {
      success: false,
      message: "An error occurred while resetting the password.",
    };
  }
}
