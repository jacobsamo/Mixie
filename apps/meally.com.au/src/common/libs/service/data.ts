// file full of all data for the app like the initial state of the recipe, dietary requirements, etc.
import { Timestamp } from "firebase/firestore";
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
  createdAt: Timestamp.now(),
  lastUpdated: Timestamp.now(),
  lastUpdatedBy: '',
  info: {
    total: '',
    prep: '',
    cook: '',
    serves: 0,
    rating: 0,
  },
  steps: [],
  madeRecipe: 0,
  savedRecipe: 0,
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
