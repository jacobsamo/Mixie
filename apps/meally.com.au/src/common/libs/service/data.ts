// file full of all data for the app like the initial state of the recipe, dietary requirements, etc.

export const dietaryRequirements = [
  '',
  'Vegetarian',
  'Gluten Free',
  'Vegan',
  'Dairy Free',
];

export const initialRecipeState = {
  id: '',
  image: {
    imgUrl: '',
    imgAlt: '',
  },
  recipeName: '',
  recipeDescription: '',
  keywords: [],
  ingredients: [],
  dietary: [],
  Allergens: [],
  sweet_savoury: '',
  mealTime: [],
  version: '',
  createdBy: '',
  createdAt: '',
  info: {
    total: undefined,
    prep: undefined,
    cook: undefined,
    serves: undefined,
    rating: undefined,
  },
  steps: [],
  madeRecipe: undefined,
  savedRecipe: undefined,
};

export const units = [
  'gram',
  'kg',
  'cup',
  'ml',
  'litre',
  'tsp',
  'tbsp',
  'pinch',
  'item',
];

// unit types e.g kg, gram, cup, item
export const unitTypes = ['mass', 'volume', 'each'];
