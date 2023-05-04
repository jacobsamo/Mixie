import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import type { Step as StepType } from 'libs/types';
interface StepProps {
  index: number;
  step: StepType;
  steps: StepType[];
}

const Step = ({ index, steps, step }: StepProps) => {
  return (
    <>
      <section key={index} className={styles.steps}>
        <h1 className="font-medium font-Roboto text-step--2">
          Step {index + 1}
        </h1>
        <h1 className={styles.step_method}>{step.step_body}</h1>
      </section>
    </>
  );
};

export default Step;
