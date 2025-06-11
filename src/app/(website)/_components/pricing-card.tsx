"use client";
import { saveSepaPayment } from "@/action/payment-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface PricingCardProps {
  title: string;
  price: string;
  perHour?: boolean;
  description: string;
  features: string[];
  recommended: boolean;
  className?: string;
  planId: string;
  isLoggedIn: boolean;
  alreadyPurchased: string;
}

export function PricingCard({
  title,
  price,
  perHour = true,
  description,
  features,
  recommended = false,
  className,
  isLoggedIn,
  planId,
  alreadyPurchased,
}: PricingCardProps) {
  const [open, setOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    return () => {
      setRedirecting(false);
    };
  }, []);

  const onBuy = () => {
    if (!isLoggedIn) {
      setRedirecting(true);
      router.push("/login");
      return;
    }

    // handle success
    startTransition(() => {
      saveSepaPayment(planId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        window.location.href = res.sessionUrl as string;
      });
    });
  };

  const isLoading = redirecting || isPending;

  const isAlreadyPurchased = planId == alreadyPurchased;

  return (
    <Card
      className={cn(
        "rounded-lg border shadow-sm overflow-hidden relative p-0",
        className
      )}
    >
      <CardHeader className="p-0">
        {recommended && (
          <div className="bg-primary text-primary-foreground py-2 text-center font-medium absolute w-full">
            Recommended
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className=" space-y-6 pt-14">
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-primary">{price}</span>
              {perHour && (
                <span className="ml-1 text-muted-foreground"> / hour</span>
              )}
            </div>
            {description && (
              <p className="mt-4 text-muted-foreground">{description}</p>
            )}
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                <span>
                  <span className="font-medium">{feature}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          {isLoggedIn ? (
            <>
              <Button
                className="w-full"
                disabled={isLoading || isAlreadyPurchased || !!alreadyPurchased}
                variant={isAlreadyPurchased ? "outline" : "default"}
                onClick={onBuy}
              >
                {isAlreadyPurchased ? "Already Booked" : "Book now"}
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              onClick={() => router.push("/login")}
              disabled={isLoading}
            >
              Login to Book
            </Button>
          )}
        </Dialog>
      </CardFooter>
    </Card>
  );
}
