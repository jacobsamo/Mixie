import React from 'react';
import Step from './Step';
import { Step as StepType } from '@/src/common/types/recipe';

interface StepContainerProps {
  steps: StepType[];
}

const StepContainer = ({ steps }: StepContainerProps) => {
  return (
    <div>
      {steps.map((step, index) => (
        <Step key={index} step={step} />
      ))}
    </div>
  );
};

export default StepContainer;
