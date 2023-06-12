import React from 'react';
import Details from './Details';
import Info from './Info';
import StarRating from './StarRating';
import { Recipe } from '@/src/common/types/recipe';

interface RecipePageComponentProps {
  recipe: Recipe;
}

const RecipePageComponent = ({ recipe }: RecipePageComponentProps) => {
  const rating = 4;
  return (
    <main>
      <h1>RecipePage</h1>
      <StarRating rating={recipe.info.rating} />
      <Info info={recipe.info} />
      <Details ingredients={recipe.ingredients} steps={recipe.steps} />
    </main>
  );
};

export default RecipePageComponent;
