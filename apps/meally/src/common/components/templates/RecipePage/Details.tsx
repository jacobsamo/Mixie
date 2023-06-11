'use client';
import React, { useState } from 'react';
import IngredientContainer from './ingredient/IngredientContainer';
import StepContainer from './step/StepContainer';
import AddBatch from './ingredient/AddBatch';

const Details = () => {
  const [add, setAdd] = useState(0);

  const recipe = {
    ingredients: [],
    steps: [],
  };
  return (
    <section>
      <AddBatch add={add} setAdd={setAdd} />
      <IngredientContainer ingredients={recipe.ingredients} />
      <StepContainer steps={recipe.steps} />
    </section>
  );
};

export default Details;
