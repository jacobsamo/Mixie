import React from 'react';
import Step from './Step';

interface StepContainerProps {
  steps: string[];
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
