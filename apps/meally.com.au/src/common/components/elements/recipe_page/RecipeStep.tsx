import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import type { Ingredient, Step } from 'libs/types';
import { Chip } from 'shared';
import IngredientChips from './IngredientChips';

interface StepProps {
  index: number;
  step: Step;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  return (
    <>
      <section
        key={index}
        className="relative flex flex-col items-start p-4 gap-1 rounded-2xl w-full h-fit flex-grow bg-white text-black dark:bg-dark_grey dark:text-white"
      >
        <h1 className="font-medium font-Roboto text-step--2">
          Step {index + 1}
        </h1>
        <p className="whitespace-normal text-step--2">{step.step_body}</p>
        <IngredientChips step={step} ingredients={ingredients} />
      </section>
    </>
  );
};

export default Step;
