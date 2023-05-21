import { RatingScale } from 'libs/types';
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rating: RatingScale | undefined;
  setRating: (rating: RatingScale) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<RatingScale>(0);
  return (
    <div className="flex flex-row">
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
