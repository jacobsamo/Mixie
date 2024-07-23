"use client";
import { CreateRecipeTrigger } from "@/components/open-dialogs";
import { Ingredient, Step as StepType } from "@/types";
import React from "react";
import Step from "./step";
import useUser from "@/hooks/useUser";
import { useRecipeContext } from "../recipe-provider";

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
  const { viewMode } = useRecipeContext();
  const [checked, setChecked] = React.useState(false);
  const user = useUser();

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex w-full flex-col gap-2">
        {steps.map((step, index) => (
          <Step
            key={index}
            index={index}
            step={step}
            ingredients={ingredients}
          />
        ))}
      </ul>
      {user && viewMode === "page" && (
        <CreateRecipeTrigger
          className="mx-auto w-10/12 sm:w-1/2"
          text="Create your own recipe"
        />
      )}
    </div>
  );
};

export default StepContainer;
