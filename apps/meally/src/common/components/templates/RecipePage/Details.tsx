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
          {ingredients.length > 0 ? (
            <>
              {ingredients.length}{' '}
              {ingredients.length === 1 ? 'Ingredient' : 'Ingredients'}
            </>
          ) : (
            'No Ingredients'
          )}
        </h2>
        <h2>
          {steps.length > 0 ? (
            <>
              {steps.length} {steps.length === 1 ? 'Step' : 'Steps'}
            </>
          ) : (
            'No Steps'
          )}
        </h2>
      </div>

      <section className="flex flex-row">
        <div className="flex flex-col items-start">
          <AddBatch add={add} setAdd={setAdd} />
          {ingredients.map((ingredient, index) => {
            if (ingredient.isHeading)
              return (
                <h3 key={index} className="text-2xl font-bold">
                  {ingredient.title}
                </h3>
              );
            return <Ingredient key={index} ingredient={ingredient} />;
          })}
        </div>
        <StepContainer steps={steps} ingredients={ingredients} className="" />
      </section>
    </>
  );
};

export default Details;
