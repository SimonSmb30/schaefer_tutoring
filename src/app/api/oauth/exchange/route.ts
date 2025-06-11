import { auth } from "@/auth";
import { nylas, nylasConfig } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) redirect("/login");

  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we did not get a code from nylas", {
      status: 400,
    });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });

    const { grantId, email } = response;

    //
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        grantId: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("ERROR SOMETHING WENT WRONG", error);
  }

  revalidatePath("/dashboard/teacher/free-trial-requests");

  redirect("/dashboard/teacher/free-trial-requests");
}
