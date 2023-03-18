import { render, screen } from '@testing-library/react';
import RecipeCard from '../../src/common/components/modules/RecipeCard';
import {Recipe}  from '../../src/common/shared/libs/types/recipe';
import recipes from '../../src/common/shared/jsons/recipes.json';

describe('RecipeCard', () => {
  it('renders a card', async () => {
    const mockRecipe = {
        id: '1',
        imageUrl: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        recipeDescription: 'A delicious meal that is easy to make and tastes great.',
        recipeName: 'Spaghetti Bolognese'
    }
    render(
      <RecipeCard
        id={mockRecipe.id}
        imageUrl={mockRecipe.imageUrl}
        recipeDescription={mockRecipe.recipeDescription}
        recipeName={mockRecipe.recipeName}
      />
    );
    expect(screen.getByText(mockRecipe.recipeName)).toBeInTheDocument();
  });
});
