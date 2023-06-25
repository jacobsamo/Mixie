import React from 'react';
import Step from './Step';
import { Step as StepType, Ingredient } from '@/src/common/types/recipe';
import type { ClassValue } from 'clsx';

interface StepContainerProps {
  steps: StepType[];
  ingredients: Ingredient[];
  className?: string;
}

const StepContainer = ({ steps, ingredients, className }: StepContainerProps) => {
  return (
    <div className={className}>
      {steps.map((step, index) => (
        <Step key={index} step={step} ingredients={ingredients} />
      ))}
    </div>
  );
};

export default StepContainer;
