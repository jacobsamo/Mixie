import React from "react";
import { Ingredient, Step } from "@db/types";

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ step, ingredients }: IngredientChipsProps) => {
  //TODO: Fix miss matches in the as in something getting matched when it shouldn't e.g "brown sugar" matching "sugar"
  //TODO: make sure that the matched ingredients are unique so there are no duplicates as this could happen
  const stepWords = step.step_body.toLowerCase().split(/\s+/);

  const matchedIngredients = ingredients
    .filter((ingredient, index, arr) => {
      if (ingredient.isHeading || !ingredient.title) {
        return false;
      }

      const ingredientWords = ingredient.title.toLowerCase().split(/\s+/);

      // Check if any ingredient word is a substring of any step word
      return ingredientWords.some((ingredientWord) =>
        stepWords.some((stepWord) => stepWord.toLowerCase() === ingredientWord)
      );
    })
    .filter((ingredient, index, arr) => {
      // Filter out duplicate ingredients
      return arr.findIndex((i) => i.title === ingredient.title) === index;
    });

  const uniqueMatchedIngredients = matchedIngredients.filter(
    (ingredient, index) => {
      const ingredientWords = ingredient.title.toLowerCase().split(/\s+/); // Split ingredient title into words

      // Check if any ingredient word is a substring of any step word
      return !ingredientWords.some((ingredientWord) =>
        matchedIngredients
          .slice(index + 1)
          .some((matchedIngredient) =>
            matchedIngredient.title
              .toLowerCase()
              .includes(ingredientWord.toLowerCase())
          )
      );
    }
  );

  return (
    <div className="flex flex-wrap gap-1">
      {uniqueMatchedIngredients.map((ingredient, index) => (
        <p
          key={index}
          className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
        >
          {ingredient.quantity}{" "}
          {ingredient.amount == "not_set" ? null : ingredient.amount}{" "}
          {ingredient.unit == "not_set" ? null : ingredient.unit}{" "}
          {ingredient.title}{" "}
        </p>
      ))}
    </div>
  );
};

export default IngredientChips;
