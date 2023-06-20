import { Recipe } from '../../types/recipe';

export const mockRecipe: Recipe = {
  id: 'test-recipe',
  title: 'Test Recipe',
  description: 'This is a test recipe',
  ingredients: [
    {
      title: 'Test Ingredient',
      quantity: 200,
      unit: 'grams',
    },
  ],
  steps: [
    {
      step_body: 'This is a test step',
    },
  ],
  allergens: [{ label: 'Gluten', value: 'gluten' }],
  dietary: [{ label: 'Vegan', value: 'vegan' }],
  sweet_savoury: { label: 'Sweet', value: 'sweet' },
  mealTime: { label: 'Breakfast', value: 'breakfast' },
  keywords: [{ value: 'test' }],
  image: {
    imgAlt: 'Test Image',
    imgUrl: 'https://via.placeholder.com/150',
  },

  info: {
    total: '1 hour',
    prep: '30 mins',
    cook: '30 mins',
    serves: 4,
  },
  uid: 'test-user',
  version: '1.0.0',
  createdAt: new Date(),
  createdBy: 'test-user',
  lastUpdated: new Date(),
  lastUpdatedBy: 'test-user',
  user: {
    accounts: [],
    id: 'test-user',
    recipes: [],
    sessions: [],
    email: 'test@example.com',
  },
  madeRecipe: 0,
  savedRecipe: 0,
};
