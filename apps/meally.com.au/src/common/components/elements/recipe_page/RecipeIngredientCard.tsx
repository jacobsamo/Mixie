import React from 'react';
import styles from '@styles/modules/RecipePage.module.scss';

interface IngredientProps {
  ingredient: string;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  return (
    <div
      key={ingredient.length}
      className="flex flex-row items-center py-1 gap-3"
    >
      <input type="checkbox" />
      <h1>{ingredient}</h1>
    </div>
  );
};

export default Ingredient;
