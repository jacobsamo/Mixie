import React from 'react';
import { Ingredient, Step } from '@/src/common/types/recipe';

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ step, ingredients }: IngredientChipsProps) => {
  // a jsx element that checks the step body for the ingredient name and returns a chip with the ingredient name
  // if the ingredient name is not found, return null

  return (
    <div>
      {ingredients.map((ingredient, index) => {
        if (ingredient.isHeading || !ingredient.title) return;
        if (step.step_body.includes(ingredient.title)) {
          return (
            <p
              key={index}
              className="text-center w-fit h-fit p-1 rounded-lg text-step--4 bg-yellow opacity-80 text-black"
            >
              {ingredient.title} {ingredient.quantity} {ingredient.unit} {ingredient.amount}
            </p>
          );
        }
      })}
    </div>
  );
};

export default IngredientChips;
