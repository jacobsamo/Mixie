import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';
import { Ingredient } from 'libs/types';
import math from 'mathjs';
import { units } from '@lib/service/data';

interface IngredientProps {
  index: number;
  ingredient: Ingredient;
  batchAmount: number;
}



const Ingredient = ({ index, ingredient, batchAmount }: IngredientProps) => {
  return (
    <div key={index} className="flex flex-row items-center py-1 gap-3">
      <input type="checkbox" />
      <h1>
        {ingredient.ingredient} {ingredient.quantity} {ingredient.measurement}{' '}
        {ingredient.unit}
      </h1>
    </div>
  );
};

export default Ingredient;
