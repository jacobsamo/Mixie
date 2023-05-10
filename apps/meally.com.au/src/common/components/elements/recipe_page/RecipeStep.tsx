import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import type { Ingredient, Step as StepType } from 'libs/types';
interface StepProps {
  index: number;
  step: StepType;
  steps: StepType[];
  ingredients: Ingredient[]
}

const Step = ({ index, steps, step, ingredients }: StepProps) => {
  return (
    <>
      <section key={index} className={styles.steps}>
        <h1 className="font-medium font-Roboto text-step--2">
          Step {index + 1}
        </h1>
        <p className={styles.step_method}>{step.step_body}</p>
      </section>
    </>
  );
};

export default Step;
