"use server";

import { auth } from "@/auth";
import { getSubscriptionById } from "@/data/user";
import PaymentReceiptEmail from "@/emails/payment-reciept";
import { backendClient } from "@/lib/edgestore.config";
import { generatePaymentPdf } from "@/lib/generate-invoice";
import { calculateDiscount } from "@/lib/payment";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { stripe } from "@/lib/stripe";
import { Account } from "@/types/account";
import { revalidatePath } from "next/cache";

export async function savePaymentMethod(pmid: string) {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to save a payment method.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: cu.user.id,
      },
      data: {
        stripePaymentMethodId: pmid,
      },
    });

    revalidatePath("/dashboard/student/payment");

    return {
      success: true,
      message: "Your card has been saved successfully.",
    };
  } catch (error) {
    console.error("Failed to save payment method:", error);
    return {
      success: false,
      message:
        "Something went wrong while saving your payment method. Please try again.",
    };
  }
}

export async function removePaymentMethod() {
  const cu = await auth();

  if (!cu?.user.id) {
    return {
      success: false,
      message: "You must be logged in to remove a payment method.",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    select: {
      stripeCustomerId: true,
      stripePaymentMethodId: true,
    },
  });

  if (!user?.stripePaymentMethodId) {
    return {
      success: false,
      message: "No payment method found to remove.",
    };
  }

  if (!user.stripeCustomerId) {
    return {
      success: false,
      message: "No Stripe customer associated with this account.",
    };
  }

  try {
    await stripe.paymentMethods.detach(user.stripePaymentMethodId);

    await stripe.customers.del(user.stripeCustomerId);

    await prisma.user.update({
      where: { id: cu.user.id },
      data: {
        stripeCustomerId: null,
        stripePaymentMethodId: null,
      },
    });

    revalidatePath("/dashboard/student/payment");

    return {
      success: true,
      message: "Stripe customer and related data removed successfully.",
    };
  } catch (error) {
    console.error("Error removing Stripe customer:", error);
    return {
      success: false,
      message: "Something went wrong while removing the customer from Stripe.",
    };
  }
}

export async function saveSepaPayment(pricingId: string) {
  try {
    // Step 1: Authenticate the user
    const cu = await auth();

    if (!cu?.user?.id) {
      return {
        success: false,
        message: "User authentication failed",
      };
    }

    // Step 2: Fetch the user from the database
    const user = await prisma.user.findFirst({
      where: { id: cu.user.id },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Step 3: Ensure the user has a Stripe customer ID
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      // Create a new Stripe customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: { userId: cu.user.id },
      });

      customerId = customer.id;

      // Update the user record with the Stripe customer ID
      await prisma.user.update({
        where: { id: cu.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      mode: "setup",
      customer: customerId,
      success_url: `${process.env.AUTH_URL}/success/payment/${cu.user.id}/${pricingId}`,
      cancel_url: `${process.env.AUTH_URL}/payment-cancel/${pricingId}`,
    });

    // Step 5: Return the session URL to the client
    return {
      success: true,
      message: "Checkout session created successfully",
      sessionUrl: session.url,
    };
  } catch (error) {
    console.error("Error saving SEPA payment:", error);

    // Return a generic error message to the client
    return {
      success: false,
      message: "An error occurred while processing your request",
    };
  }
}

export async function makeCharge(userId: string, data: Account) {
  const lessons = data.lessons;
  const totalLessons = lessons.length;
  const subscriptionId = data.student.pricingId;

  const subscription = await getSubscriptionById(subscriptionId as string);
  if (!subscription) {
    return {
      success: false,
      message: "Subscription not found",
    };
  }

  const isIndividual = subscription.name === "Individual lessons";
  let amount = isIndividual
    ? totalLessons * subscription.price
    : totalLessons >= 4
      ? totalLessons * subscription.price
      : 4 * subscription.price;

  const discount = await calculateDiscount({
    studentId: data.studentId as string,
    totalLesson: data.lessons.length,
  });

  amount = amount - discount;

  try {
    const now = new Date();
    const lastDayOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    );

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const { stripeCustomerId, stripePaymentMethodId } = user;
    if (!stripeCustomerId || !stripePaymentMethodId) {
      return {
        success: false,
        message: "Stripe customer or payment method not set up",
      };
    }

    await stripe.paymentMethods.attach(stripePaymentMethodId, {
      customer: stripeCustomerId,
    });

    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: stripePaymentMethodId,
      },
    });

    await Promise.all(
      lessons.map((lesson) =>
        stripe.invoiceItems.create({
          customer: stripeCustomerId,
          amount: Math.round(subscription.price * 100),
          currency: "usd",
          description: `Lesson on ${lesson.date.toISOString().split("T")[0]} (${lesson.time})`,
        })
      )
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      customer: stripeCustomerId,
      payment_method: stripePaymentMethodId,
      off_session: true,
      confirm: true,
      description: `Payment for ${totalLessons} lesson(s) with $${discount} discount`,
      metadata: {
        userId,
        totalLessons: totalLessons.toString(),
        subscriptionType: subscription.name,
      },
    });

    if (paymentIntent.status === "succeeded") {
      const invoice = await stripe.invoices.create({
        customer: stripeCustomerId,
        auto_advance: true,
        collection_method: "charge_automatically",
        metadata: {
          userId,
          totalLessons: totalLessons.toString(),
        },
      });

      if (!invoice.id) throw new Error("Invoice ID is undefined");

      await stripe.invoices.finalizeInvoice(invoice.id);

      const invoiceDetails = await stripe.invoices.retrieve(invoice.id);

      // Generate custom PDF receipt
      const pdfBuffer = await generatePaymentPdf(
        user,
        subscription,
        lessons,
        amount + discount,
        paymentIntent.id,
        invoice.id,
        discount
      );

      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

      // Upload to Edge Store
      const res = await backendClient.publicFiles.upload({
        content: { blob: pdfBlob, extension: "pdf" },
        options: {
          temporary: false, // or true if you want temporary files
        },
      });

      const paymentHistoryRes = await prisma.paymentHistory.create({
        data: {
          studentId: userId,
          paymentIntentId: paymentIntent.id,
          invoiceId: invoice.id,
          invoicePdfUrl: invoiceDetails.invoice_pdf || null,
          paymentForDate: lastDayOfPreviousMonth,
          totalLessonsPaidFor: totalLessons,
          edgePdfUrl: res.url,
          amount: amount + discount,
          discount: discount,
        },
      });

      // send email
      const to = data.student.email as string;
      const studentName = data.student.name as string;
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        lastDayOfPreviousMonth
      );
      const year = lastDayOfPreviousMonth.getFullYear().toString();
      const lessonCount = data.lessons.length;
      const unitPrice = subscription.price;

      await resend.emails.send({
        from: `Schaefer Tutor <support@schaefer-tutoring.com>`,
        to: [to],
        subject: `Your Schaefer Tutor Payment Receipt for ${month} ${year}`,
        react: PaymentReceiptEmail({
          studentName,
          month,
          year,
          lessonCount,
          unitPrice,
          discount,
          total: amount + discount,
          receiptUrl: `${process.env.AUTH_URL}/api/reciept/${paymentHistoryRes.id}`,
        }),
      });

      revalidatePath("/dashboard/admin/account-management");

      return {
        success: true,
        message: "Payment successful and invoice sent",
        paymentIntentId: paymentIntent.id,
        invoiceId: invoice.id,
        invoicePdfUrl: invoiceDetails.invoice_pdf,
        customReceiptUrl: res.url, // Include the Cloudinary URL in the response
        totalLessonsPaidFor: totalLessons,
      };
    } else {
      return {
        success: false,
        message: `Payment failed with status: ${paymentIntent.status}`,
      };
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return {
      success: false,
      message: "An error occurred while processing the payment",
      errorDetails: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
