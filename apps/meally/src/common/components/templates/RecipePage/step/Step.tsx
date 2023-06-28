import { Step, Ingredient } from '@/src/common/types/recipe';
import React from 'react';
import IngredientChips from './IngredientChips';

interface StepProps {
  index: number;
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  return (
    <section className="relative flex flex-col items-start p-4 gap-1 rounded-2xl w-full flex-grow bg-whtie shadow dark:bg-grey ">
      <h3>Step {index + 1}</h3>
      <p>{step.step_body}</p>
      <IngredientChips step={step} ingredients={ingredients} />
    </section>
  );
};

export default Step;
