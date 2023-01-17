'use client';
import { Recipe, Info } from 'libs/types';
import React, { useEffect, useReducer } from 'react';

const initialRecipeState: Recipe = {
  id: '',
  imageUrl: '',
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
  savedRecipe: 0,
};

function recipeReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.payload };
    case 'SET_IMAGE_URL':
      return { ...state, imageUrl: action.payload };
    case 'SET_RECIPE_NAME':
      return { ...state, recipeName: action.payload };
    case 'SET_RECIPE_DESCRIPTION':
      return { ...state, recipeDescription: action.payload };
    case 'SET_KEYWORDS':
      return { ...state, keywords: action.payload };
    case 'SET_INGREDIENTS':
      return { ...state, ingredients: action.payload };
    case 'SET_DIETARY':
      return { ...state, dietary: action.payload };
    case 'SET_ALLERGENS':
      return { ...state, Allergens: action.payload };
    case 'SET_SWEET_SAVOURY':
      return { ...state, sweet_savoury: action.payload };
    case 'SET_MEAL_TIME':
      return { ...state, meallyTime: action.payload };
    case 'SET_VERSION':
      return { ...state, version: action.payload };
    case 'SET_CREATED_BY':
      return { ...state, createdBy: action.payload };
    case 'SET_CREATED_AT':
      return { ...state, createdAt: action.payload };
    case 'SET_TOTAL':
      return { ...state, info: { ...state.info, total: action.payload } };
    case 'SET_PREP':
      return { ...state, info: { ...state.info, prep: action.payload } };
    case 'SET_COOK':
      return { ...state, info: { ...state.info, cook: action.payload } };
    case 'SET_SERVES':
      return { ...state, info: { ...state.info, serves: action.payload } };
    case 'SET_RATING':
      return { ...state, info: { ...state.info, rating: action.payload } };
    case 'SET_STEPS':
      return { ...state, steps: action.payload };
    case 'SET_MADE_RECIPE':
      return { ...state, madeRecipe: action.payload };
    case 'SET_SAVED_RECIPE':
      return { ...state, savedRecipe: action.payload };
    default:
      throw new Error();
  }
}

const Form = () => {
  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipeState);

  useEffect(() => {
    window.localStorage &&
      window.localStorage.setItem('recipe', JSON.stringify(recipe));
  }, [recipe]);

  function handleChange(event: any) {
    dispatch({
      type: 'SET_' + event.target.name.toUpperCase(),
      payload: event.target.value,
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    await dispatch({
      type: 'SET_TOTAL',
      payload: parseInt(recipe.info.prep) + parseInt(recipe.info.cook),
    });
    await dispatch({ type: 'SET_ID', payload: recipe.recipeName });
    console.log(recipe);
  }

  return (
    <>
      <h1>Recipe Creation Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-1/2">
        <input
          value={recipe.recipeName}
          type="text"
          required
          placeholder="Recipe name"
          name="recipe_name"
          onChange={handleChange}
        />
        <input
          value={recipe.info.prep}
          type="number"
          required
          placeholder="Prep Time"
          name="prep"
          onChange={handleChange}
        />
        <input
          value={recipe.info.cook}
          type="number"
          required
          placeholder="Cook TIme"
          name="cook"
          onChange={handleChange}
        />
        <input
          value={recipe.info.serves}
          type="number"
          required
          placeholder="Number of Serves"
          name="serves"
          min="0"
          onChange={handleChange}
        />
        <input
          value={recipe.imageUrl}
          type="file"
          name="img_url"
          onChange={handleChange}
        />
        <input
          value={recipe.recipeDescription}
          type="text"
          required
          placeholder="Recipe Description"
          name="recipe_description"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
