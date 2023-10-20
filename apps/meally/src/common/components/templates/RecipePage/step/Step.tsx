"use client";
import { Step, Ingredient } from "@/src/db/types";
import React from "react";
import IngredientChips from "./IngredientChips";
import { CheckCircleIcon, Circle } from "lucide-react";

interface StepProps {
  index: number;
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <li className="">
      <button
        className={`w-full flex-grow  flex flex-col gap-1 rounded-2xl bg-white p-4 text-left shadow dark:bg-grey ${
          checked ? "opacity-60" : ""
        } `}
        id={`step-${index + 1}`}
        aria-label={`Check off Step, ${index + 1}`}
        onClick={() => setChecked(!checked)}
        role="checkbox"
        data-checked={checked}
        aria-checked={checked}
        type="button"
      >
        <span className="flex items-center space-x-1">
          {checked ? (
            <CheckCircleIcon className="shrink-0 text-yellow" />
          ) : (
            <Circle className="shrink-0" />
          )}
          <h2
            id={`step-${index + 1}`}
            className="font-Roboto text-step0 font-medium"
          >
            Step {index + 1}
          </h2>
        </span>
        <p>{step.step_body}</p>
        <IngredientChips step={step} ingredients={ingredients} />
      </button>
    </li>
  );
};

export default Step;
