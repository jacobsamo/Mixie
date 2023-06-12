import { Ingredient } from '@/src/common/types/recipe';
import React from 'react';

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  return <div>Ingredient</div>;
};

export default Ingredient;
