import RecipePageComponent from '@components/templates/RecipePage/RecipePageComponent';
import React from 'react';
import { mockRecipe } from '@/src/common/lib/services/data';

export default function RecipePage() {
  return <RecipePageComponent recipe={mockRecipe} />;
}
