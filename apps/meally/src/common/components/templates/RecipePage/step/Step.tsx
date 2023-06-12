import { Step } from '@/src/common/types/recipe';
import React from 'react';

interface StepProps {
  step: Step;
}

const Step = ({ step }: StepProps) => {
  return <div>Step</div>;
};

export default Step;
