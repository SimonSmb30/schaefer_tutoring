import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  const pricingPlans = [
    {
      id: "1",
      name: "Basic Plan",
      price: 25,
      description: "Perfect for occasional tutoring needs",
      isRecommended: false,
      features: ["1 hour per week", "Access to learning materials", "Email support"]
    },
    {
      id: "2",
      name: "Standard Plan",
      price: 40,
      description: "Our most popular tutoring package",
      isRecommended: true,
      features: ["2 hours per week", "Personalized learning plan", "Priority scheduling", "24/7 support"]
    }
  ];

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Unsere Preise</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className="rounded-lg border shadow-sm overflow-hidden relative p-0"
            >
              <CardHeader className="p-0">
                {plan.isRecommended && (
                  <div className="bg-primary text-primary-foreground py-2 text-center font-medium absolute w-full">
                    Empfohlen
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6 pt-14">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-primary">{plan.price}€</span>
                      <span className="ml-1 text-muted-foreground"> / Stunde</span>
                    </div>
                    {plan.description && (
                      <p className="mt-4 text-muted-foreground">{plan.description}</p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
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
                <Button className="w-full">
                  Jetzt buchen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}