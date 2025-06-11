// app/api/payment/setup-intent/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Get or create Stripe Customer
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  let customerId = user?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user?.email || undefined,
      metadata: { userId: session.user.id },
    });

    customerId = customer.id;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
  });

  return Response.json({
    success: true,
    clientSecret: setupIntent.client_secret,
  });
}
