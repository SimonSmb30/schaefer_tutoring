"use server";

import { prisma } from "@/lib/prisma";

export async function getUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}
export async function getUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user;
}

export async function getSubscriptionById(id: string) {
  const subscription = await prisma.pricing.findUnique({
    where: {
      id,
    },
  });

  return subscription;
}

export async function getAllRecomendationByStudentId(creator: string) {
  const reco = await prisma.recommendation.findFirst({
    where: {
      creator,
    },
    include: {
      participants: true,
    },
  });

  if (!reco) {
    return 0;
  }

  return reco.participants.length;
}
