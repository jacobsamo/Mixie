import React from 'react';
import { Ingredient } from 'libs/types';
import Utils from '@lib/service/Utils';

interface IngredientProps {
  index: number;
  ingredient: Ingredient;
  batchAmount: number;
}

const Ingredient = ({ index, ingredient, batchAmount }: IngredientProps) => {
  const calculateIngredient = Utils.calculateIngredient(
    ingredient,
    batchAmount
  );
  return (
    <div key={index} className="flex flex-row items-center py-1 gap-3">
      <input type="checkbox" />
      <h1>
        {calculateIngredient.ingredient} {calculateIngredient.quantity}{' '}
        {calculateIngredient.measurement} {calculateIngredient.unit}
      </h1>
    </div>
  );
};

export default Ingredient;
