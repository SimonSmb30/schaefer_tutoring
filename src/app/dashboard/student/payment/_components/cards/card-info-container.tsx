"use client";

import { savePaymentMethod } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

const CardInfoContainer = ({ onSuccess }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Get SetupIntent client_secret on mount
  useEffect(() => {
    const getIntent = async () => {
      const res = await fetch("/api/payment/setup-intent", {
        method: "POST",
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    getIntent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    startTransition(async () => {
      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      console.log({ setupIntent, elements });

      if (error) {
        toast.error(error.message || "Failed to save card");
      } else {
        savePaymentMethod(setupIntent.payment_method as string).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          toast.success(res.message);
          onSuccess();
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Payment Method</CardTitle>
        <CardDescription>Securely save a card with Stripe</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-3 border rounded-md">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
          <Button
            type="submit"
            variant={isPending ? "outline" : "default"}
            className="w-full"
            disabled={!stripe || isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {isPending ? "Saving..." : "Save Card"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardInfoContainer;
