import { Step, Ingredient } from "@/src/db/types";
import React from "react";
import IngredientChips from "./IngredientChips";
import { matchIngredients } from "@/src/common/lib/utils/utils";

interface StepProps {
  index: number;
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  const matchedIngredients = matchIngredients(step, ingredients);

  return (
    <section className="relative flex w-96 flex-grow flex-col items-start gap-1 rounded-2xl p-4">
      <h2
        id={`step-${index + 1}`}
        className="font-Roboto text-step0 font-medium"
      >
        Step {index + 1}
      </h2>
      <p>{step.step_body}</p>
      <span>
        <p className="font-bold">Ingredients:</p>{" "}
        {matchedIngredients
          .map(
            (ingredient) => `${ingredient.quantity} 
        ${ingredient.amount == "not_set" ? "" : ingredient.amount} 
        ${ingredient.unit == "not_set" ? "" : ingredient.unit} 
        ${ingredient.title}`
          )
          .join(" | ")}
      </span>
    </section>
  );
};

export default Step;
