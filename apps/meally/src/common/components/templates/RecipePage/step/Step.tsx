import { Step, Ingredient } from '@/src/common/types/recipe';
import React from 'react';
import IngredientChips from './IngredientChips';

interface StepProps {
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ step, ingredients }: StepProps) => {
  return (
    <section>
      <h3>Step {step.id}</h3>
      <p>{step.step_body}</p>
      <IngredientChips step={step} ingredients={ingredients}/>
    </section>
  );
};

export default Step;
