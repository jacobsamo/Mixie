'use client';
import React, { useState } from 'react';
import IngredientContainer from './ingredient/IngredientContainer';
import StepContainer from './step/StepContainer';
import AddBatch from './ingredient/AddBatch';
import { Ingredient, Step } from '@/src/common/types/recipe';

interface DetailsProps {
  ingredients: Ingredient[];
  steps: Step[];
}

const Details = ({ ingredients, steps }: DetailsProps) => {
  const [add, setAdd] = useState(0);

  return (
    <section>
      <AddBatch add={add} setAdd={setAdd} />
      <IngredientContainer ingredients={ingredients} />
      <StepContainer steps={steps} />
    </section>
  );
};

export default Details;
