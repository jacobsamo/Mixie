// file full of all data for the app like the initial state of the recipe, dietary requirements, etc.
import { Timestamp } from 'firebase/firestore';
export const dietaryRequirements = [
  { value: 'None', label: 'None' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Gluten Free', label: 'Gluten Free' },
  { value: 'Dairy Free', label: 'Dairy Free' },
  { value: 'Nut Free', label: 'Nut Free' },
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

export const sweet_savoury = [
  { value: 'sweet', label: 'Sweet' },
  { value: 'savoury', label: 'Savoury' },
  { value: 'both', label: 'Sweet & Savoury' },
];

export const meal_times = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
];

// unit types e.g kg, gram, cup, item
export const unitTypes = ['mass', 'volume', 'each'];
