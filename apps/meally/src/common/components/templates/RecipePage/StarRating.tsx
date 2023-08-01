'use client';
import React, { useState } from 'react';
// import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon } from 'lucide-react';
import useUser from '@/src/common/hooks/useUser';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type RatingScale = 0 | 1 | 2 | 3 | 4 | 5;

interface StarRatingProps {
  rating: RatingScale | undefined;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const { user } = useUser();
  const [hoverRating, setHoverRating] = useState<RatingScale>(0);
  const [internalRating, setInternalRating] = useState<RatingScale>(0);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  //TODO: create the function to set a new rating on a recipe
  function setRating(rating: RatingScale): void {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    console.log('Rating: ', rating);
    setInternalRating(rating)
  }

  return (
    <div className="flex flex-row h-fit w-fit">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hoverRating || internalRating || rating || -1)
                ? 'fill-[#ffe14cf6] text-[#ffe14cf6]'
                : ''
            }
            onClick={() => setRating(index as RatingScale)}
            onMouseEnter={() => setHoverRating(index as RatingScale)}
            onMouseLeave={() => setHoverRating(rating as RatingScale)}
          >
            <StarIcon className="w-8 h-w-8" />
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
              href={'/api/auth/signin'}
              className="flex justify-center h-10 px-4 py-2 bg-yellow rounded-md text-step--2 items-center text-black font-semibold"
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
