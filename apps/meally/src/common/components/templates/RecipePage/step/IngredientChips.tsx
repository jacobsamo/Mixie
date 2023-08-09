import React from 'react';
import { Ingredient, Step } from '@db/types';

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ step, ingredients }: IngredientChipsProps) => {
  //TODO: Fix miss matches in the as in something getting matched when it shouldn't e.g "brown sugar" matching "sugar"
  //TODO: make sure that the matched ingredients are unique so there are no duplicates as this could happen
  const stepWords = step.step_body.toLowerCase().split(/\s+/); // Split step body into words or tokens

  const matchedIngredients = ingredients.filter((ingredient) => {
    if (ingredient.isHeading || !ingredient.title) return false;

    const ingredientWords = ingredient.title.toLowerCase().split(/\s+/); // Split ingredient title into words

    // Check if any ingredient word is a substring of any step word
    return ingredientWords.some((ingredientWord) =>
      stepWords.some((stepWord) =>
        stepWord.toLowerCase().includes(ingredientWord)
      )
    );
  });

  return (
    <div className="flex flex-wrap gap-1">
      {matchedIngredients.map((ingredient, index) => (
        <p
          key={index}
          className="text-center w-fit h-fit p-1 rounded-lg text-step--4 bg-yellow opacity-80 text-black"
        >
          {ingredient.quantity} {ingredient.amount} {ingredient.unit}{' '}
          {ingredient.title}{' '}
        </p>
      ))}
    </div>
  );
};

export default IngredientChips;
