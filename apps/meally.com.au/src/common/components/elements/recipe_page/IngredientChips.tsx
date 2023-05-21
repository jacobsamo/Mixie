import { Ingredient, Step } from 'libs/types';
import React from 'react';

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ ingredients, step }: IngredientChipsProps) => {
  // function findIngredients() {
  //   ingredients.forEach((ingredient) => {
  //     const split = ingredient.ingredient.split(' ');
  //     split.forEach((item) => {
  //       if (step.step_body.includes(item)) return ingredient;
  //     });
  //   });
  // }

  return (
    <div className="flex flex-row flex-wrap gap-1 w-full">
      {ingredients.map((ingredient, index) => {
        if (ingredient.heading) return null;
        if (
          ingredient.ingredient &&
          step.step_body
            .toLowerCase()
            .includes(ingredient.ingredient.toLowerCase())
        )
          return (
            <p
              key={index}
              className="text-center w-fit h-fit p-1 rounded-lg text-step--4 bg-yellow opacity-80 text-black"
            >
              {ingredient.ingredient} {ingredient.quantity}{' '}
              {ingredient.measurement} {ingredient.unit}
            </p>
          );
      })}
    </div>
  );
};

export default IngredientChips;
