import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "setup_intent.succeeded") {
    const setupIntent = event.data.object as Stripe.SetupIntent;

    // Extract the payment method ID
    const paymentMethodId = setupIntent.payment_method;

    // Extract the customer ID
    const customerId = setupIntent.customer;

    const customerResponse = await stripe.customers.retrieve(
      customerId as string
    );

    if (customerResponse.deleted) {
      console.warn("Customer has been deleted");
      return new NextResponse("Customer deleted", { status: 400 });
    }

    const stripeCustomerDeta = customerResponse as Stripe.Customer;

    if (!paymentMethodId) {
      console.warn("Missing paymentMethodId in setup_intent.succeeded");
      return new NextResponse("Missing paymentMethodId", { status: 400 });
    }

    // Save the payment method ID to the user's record
    try {
      await prisma.user.update({
        where: { email: stripeCustomerDeta.email as string },
        data: { stripePaymentMethodId: paymentMethodId as string },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (dbError: any) {
      console.error(`Database error: ${dbError.message}`);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  // Return a response to acknowledge receipt of the event
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
