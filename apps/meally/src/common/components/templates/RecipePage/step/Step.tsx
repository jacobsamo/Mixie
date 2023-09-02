import { Step, Ingredient } from "@/src/db/types";
import React from "react";
import IngredientChips from "./IngredientChips";

interface StepProps {
  index: number;
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  return (
    <section className="bg-whtie relative flex w-full flex-grow flex-col items-start gap-1 rounded-2xl p-4 shadow dark:bg-grey ">
      <h2 className="font-Roboto text-step0 font-medium">Step {index + 1}</h2>
      <p>{step.step_body}</p>
      <IngredientChips step={step} ingredients={ingredients} />
    </section>
  );
};

export default Step;
