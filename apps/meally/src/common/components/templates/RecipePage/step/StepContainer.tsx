import React from "react";
import Step from "./Step";
import { Step as StepType, Ingredient } from "@/src/db/types";
import type { ClassValue } from "clsx";

interface StepContainerProps {
  steps: StepType[];
  ingredients: Ingredient[];
  className?: string;
}

const StepContainer = ({
  steps,
  ingredients,
  className,
}: StepContainerProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {steps.map((step, index) => (
        <Step key={index} index={index} step={step} ingredients={ingredients} />
      ))}
    </div>
  );
};

export default StepContainer;
