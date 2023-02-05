import localStorage from "libs/utils/localStorage";
// file full of all data for the app like the initial state of the recipe, dietary requirements, etc.

export const dietaryRequirements = [
    '',
    'Vegetarian',
    'Gluten Free',
    'Vegan',
    'Dairy Free',
]

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
    meallyTime: [],
    version: '',
    createdBy: '',
    createdAt: '',
    info: {
      total: 0,
      prep: 0,
      cook: 0,
      serves: 0,
      rating: 0,
    },
    steps: [],
    madeRecipe: 0,
    savedRecipe: 0 
  };

