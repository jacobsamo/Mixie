"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useUser from "@/hooks/useUser";
import { Rating } from "@/types";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface StarRatingProps {
  recipeId: string;
  rating: number | undefined;
}

const StarRating = ({ recipeId, rating }: StarRatingProps) => {
  const user = useUser();
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [internalRating, setInternalRating] = useState<number>(0);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  //TODO: create the function to set a new rating on a recipe
  function setRating(rating: number): void {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    setInternalRating(rating);
    const setRating = fetch(`/api/recipes/${recipeId}/setRating`, {
      method: "POST",
      body: JSON.stringify({
        recipeId: recipeId,
        rating: rating,
        userId: user.id,
      } as Rating),
    });

    toast.promise(setRating, {
      loading: "Setting rating...",
      success: (data) => {
        return "Rating set!";
      },
      error: (err) => {
        console.log(err);
        return "There was an error while rating the recipe/";
      },
    });
  }

  return (
    <div className="flex h-fit w-fit flex-row">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hoverRating || internalRating || rating || -1)
                ? "fill-[#ffe14cf6] text-[#ffe14cf6]"
                : ""
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHoverRating(index)}
            onMouseLeave={() => setHoverRating(rating! || 0)}
            aria-label={`Rating ${index} of 5`}
          >
            <StarIcon className="h-w-8 w-8" />
          </button>
        );
      })}
      {showSignInPrompt && (
        <Dialog open={showSignInPrompt} onOpenChange={setShowSignInPrompt}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign In</DialogTitle>
              <DialogDescription>
                You must be signed in to rate a recipe
              </DialogDescription>
            </DialogHeader>
            <Link
              href={"/api/auth/signin"}
              className="flex h-10 items-center justify-center rounded-md bg-yellow px-4 py-2 text-step--2 font-semibold text-black"
            >
              Login
            </Link>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StarRating;
