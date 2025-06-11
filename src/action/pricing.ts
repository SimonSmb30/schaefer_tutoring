"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PricingFormValues, pricingSchema } from "@/schemas/schema";
import { revalidatePath } from "next/cache";

export async function createPricing(data: PricingFormValues) {
  const cs = await auth();

  if (!cs?.user) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const parsedValues = pricingSchema.safeParse(data);

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.message,
    };
  }

  try {
    await prisma.pricing.create({
      data: {
        name: parsedValues.data.name,
        description: parsedValues.data.description,
        price: Number(parsedValues.data.price),
        features: parsedValues.data.features,
        isRecommended: parsedValues.data.isRecommended,
      },
    });

    revalidatePath("dashboard/admin/price-management");

    return {
      success: true,
      message: "Pricing plan created successfully.",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
export async function editPricing(data: PricingFormValues, id: string) {
  const cs = await auth();

  if (!cs?.user) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  const parsedValues = pricingSchema.safeParse(data);

  if (!parsedValues.success) {
    return {
      success: false,
      message: parsedValues.error.message,
    };
  }

  try {
    await prisma.pricing.update({
      where: {
        id,
      },
      data: {
        name: parsedValues.data.name,
        description: parsedValues.data.description,
        price: Number(parsedValues.data.price),
        features: parsedValues.data.features,
        isRecommended: parsedValues.data.isRecommended,
      },
    });

    revalidatePath("dashboard/admin/price-management");

    return {
      success: true,
      message: "Pricing plan updated successfully.",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function PlanDeleteAction(id: string) {
  const cs = await auth();

  if (!cs?.user) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  if (cs.user.role !== "admin") {
    return {
      success: false,
      message: "You don't have access to delete the plan",
    };
  }

  try {
    await prisma.pricing.delete({
      where: {
        id,
      },
    });

    revalidatePath("dashboard/admin/price-management");

    return {
      success: true,
      message: "Plan deleted successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function buyPricing(planId: string) {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "Unauthorized access",
    };
  }

  if (cu.user.role !== "student") {
    return {
      success: false,
      message: "Teacher don't have access to buy plan",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: cu.user.id,
      },
      data: {
        pricingId: planId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Saved Your purchased plan",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
