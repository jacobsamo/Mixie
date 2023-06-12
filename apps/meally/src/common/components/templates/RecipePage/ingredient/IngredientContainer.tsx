import React, { useState } from 'react';
import AddBatch from './AddBatch';
import Ingredient from './Ingredient';
import { Ingredient as IngredientType } from '@/src/common/types/recipe';

interface IngredientContainerProps {
  ingredients: IngredientType[];
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
