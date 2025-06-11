"use client";
import getStripe from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { ReactNode } from "react";

const StripeElementsWrapper = ({ children }: { children: ReactNode }) => {
  return <Elements stripe={getStripe()}>{children}</Elements>;
};

export default StripeElementsWrapper;
