// app/actions/submitRecommendation.ts
"use server"; // Indicates this is a server action

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function generateSlug(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function CollectSlugResponse() {
  const cs = await auth();

  // Check if the user is authenticated
  if (!cs?.user) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const loggedinUserId = cs.user.id as string;

  // Generate a unique slug
  const slug = generateSlug();

  try {
    // Check if a recommendation already exists with the same creator and slug
    const existingRecommendation = await prisma.recommendation.findFirst({
      where: {
        creator: loggedinUserId,
      },
    });

    if (existingRecommendation) {
      // If an existing recommendation is found, return its slug
      return {
        success: true,
        message: "Recommendation already exists",
        slug: existingRecommendation.slug,
      };
    }

    // If no existing recommendation is found, create a new one
    const newRecommendation = await prisma.recommendation.create({
      data: {
        creator: loggedinUserId,
        slug: slug,
      },
    });

    // Return the slug of the newly created recommendation
    return {
      success: true,
      message: "Recommendation created successfully",
      slug: newRecommendation.slug,
    };
  } catch (error) {
    console.error("Error creating or fetching recommendation:", error);

    // Handle database errors gracefully
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}
