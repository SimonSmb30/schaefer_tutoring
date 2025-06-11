"use client";

import { createReview } from "@/action/review";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

const ReviewCreateForm = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating before submitting", {
        position: "top-right",
        richColors: true,
      });
      return;
    }

    startTransition(() => {
      createReview(rating, message).then((res) => {
        if (!res.success) {
          toast.error(res.message, {
            position: "top-right",
            richColors: true,
          });
          return;
        }

        // handle success
        toast.success(res.message, {
          position: "top-right",
          richColors: true,
        });
        setRating(0);
        setMessage("");
      });
    });
  };
  return (
    <Card className="mx-auto w-full max-w-[600px] p-6">
      <CardHeader className="p-0">
        <CardTitle className="pl-0 text-2xl">Submit Your Review</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6 px-0">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    size={24}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 self-center text-sm">
                {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : ""}
              </span>
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <label htmlFor="description" className="text-sm font-medium">
              Review Description
            </label>
            <Textarea
              id="description"
              placeholder="Share your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className=""
            />
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-5">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !message}
            variant={isPending ? "outline" : "default"}
          >
            {isPending && <Loader2 className="animate-spin mr-2" />}
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ReviewCreateForm;
