'use client';
import React, { useState } from 'react';
import StepContainer from './step/StepContainer';
import AddBatch from './ingredient/AddBatch';
import type {
  Ingredient as IngredientType,
  Step,
} from '@/src/common/types/recipe';
import Ingredient from './ingredient/Ingredient';

interface DetailsProps {
  ingredients: IngredientType[];
  steps: Step[];
}

const Details = ({ ingredients, steps }: DetailsProps) => {
  const [add, setAdd] = useState(0);

  return (
    <>
      <div>
        <h2>
          {ingredients.length}{' '}
          {ingredients.length < 1 ? 'Ingredients' : 'Ingredient'}
        </h2>
        <h2>
          {steps.length} {ingredients.length < 1 ? 'Steps' : 'Step'}
        </h2>
      </div>
      <section className="flex flex-row">
        <div className="">
          <AddBatch add={add} setAdd={setAdd} />
          {ingredients.map((ingredient, index) => (
            <Ingredient key={index} ingredient={ingredient} />
          ))}
        </div>
        <StepContainer steps={steps} ingredients={ingredients} className="" />
      </section>
    </>
  );
};

export default Details;
