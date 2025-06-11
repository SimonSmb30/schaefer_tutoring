import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  const protocol = window.location.protocol; // e.g., "http:" or "https:"
  const host = window.location.host; // e.g., "localhost:3000" or "example.com"
  return `${protocol}//${host}`;
}

import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<import("@stripe/stripe-js").Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ||
        "pk_test_51QcKSvEJ5Etrau31j163wuJI52wfJclRISajUwzNexvrUf2F0CCJkDq9L9QbQx34J9Nuhcrxmbrfx6Job4FEt4g400a4NEUc2F"
    );
  }
  return stripePromise;
};

export default getStripe;
