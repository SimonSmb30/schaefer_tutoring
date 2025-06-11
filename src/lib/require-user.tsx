"use server";
import { auth } from "@/auth";

export async function requireUser() {
  const session = await auth();

  if (!session) return null;

  return session;
}
