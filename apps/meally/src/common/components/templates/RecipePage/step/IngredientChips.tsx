import React from "react";
import { Ingredient, Step } from "@db/types";
import { displayIngredient, matchIngredients } from "@lib/utils";

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ step, ingredients }: IngredientChipsProps) => {
  //TODO: Fix miss matches in the as in something getting matched when it shouldn't e.g "brown sugar" matching "sugar"
  //TODO: make sure that the matched ingredients are unique so there are no duplicates as this could happen
  const uniqueMatchedIngredients = matchIngredients(step, ingredients);

  return (
    <div className="flex flex-wrap gap-1">
      {uniqueMatchedIngredients.map((ingredient, index) => (
        <p
          key={index}
          className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
        >
          {displayIngredient(ingredient)}
        </p>
      ))}
    </div>
  );
};

export default IngredientChips;
