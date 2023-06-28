"use client"
import React, { useState } from 'react';
// import { StarIcon } from '@heroicons/react/24/outline';
import {StarIcon} from 'lucide-react'

type RatingScale = 0 | 1 | 2 | 3 | 4 | 5;

interface StarRatingProps {
  rating: RatingScale | undefined;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<RatingScale>(0);

  //TODO: create the function to set a new rating on a recipe
  function setRating(arg0: RatingScale): void {
    throw new Error('Function not implemented.');
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
              index <= (hoverRating || rating || -1)
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
    </div>
  );
};

export default StarRating;
