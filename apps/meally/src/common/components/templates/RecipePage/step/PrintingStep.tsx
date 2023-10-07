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
    <section className="bg-whtie relative flex w-full flex-grow flex-col items-start gap-1 rounded-2xl p-4 shadow dark:bg-grey ">
      <h2
        id={`step-${index + 1}`}
        className="font-Roboto text-step0 font-medium"
      >
        Step {index + 1}
      </h2>
      <p>{step.step_body}</p>
      <span>
        Ingredients: {matchedIngredients.map((ingredient) => ingredient.title)}
      </span>
    </section>
  );
};

export default Step;
