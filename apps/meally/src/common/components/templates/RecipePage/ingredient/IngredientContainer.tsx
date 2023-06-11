import React, { useState } from 'react';
import AddBatch from './AddBatch';
import Ingredient from './Ingredient';

interface IngredientContainerProps {
  ingredients: string[];
}

const IngredientContainer = ({ ingredients }: IngredientContainerProps) => {

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default IngredientContainer;
