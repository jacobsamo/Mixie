'use client';
import { Recipe, Info } from 'libs/types';
import Image from 'next/image';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import { dietaryRequirements } from '@lib/service/data';
import styles from '@components/elements/recipe_elemnts/form_items/Form.module.scss';
import { InputField, AddButton, Dialog } from 'ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import RecipeFrom from '@components/elements/recipe_elemnts/form_items/logic';
import {
  Ingredient,
  IngredientContainer,
  StepContainer,
  TextArea,
} from '@components/elements/recipe_elemnts/form_items';
import ImageUpload from '@components/elements/ImageUpload';

const initialRecipeState = {
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

const RecipeFromLayout = () => {
  var [recipe, dispatch] = useReducer(recipeReducer, initialRecipeState);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  function handleChange(event: any) {
    dispatch({
      type: 'SET_' + event.target.name.toUpperCase(),
      payload: event.target.value,
    });
  }

  const handleArrayChange = (name: string, payload: string[]) => {
    dispatch({ type: 'SET_' + name.toUpperCase(), payload: payload });
  };

  async function setAdditionalInformation() {
    dispatch({ type: 'SET_ID', payload: recipe.recipeName });
    dispatch({ type: 'SET_CREATED_BY', payload: 'Meally' });
    dispatch({ type: 'SET_CREATED_AT', payload: new Date() });
    dispatch({
      type: 'SET_TOTAL',
      payload: parseInt(recipe.info.prep) + parseInt(recipe.info.cook),
    });
  }

  async function handleSubmit(event: any) {
    await event.preventDefault();
    await RecipeService.createRecipe(recipe);
    console.log(recipe);
  }

  useEffect(() => {
    localStorageService.setLocal('recipe', recipe);
  }, [recipe]);

  useEffect(() => {
    if (recipe.recipeName !== '') {
      setAdditionalInformation();
    }
  }, [recipe.recipeName]);

  return (
    <>
      <h1>Recipe Creation Form</h1>
      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <InputField
          value={recipe.recipeName}
          type="text"
          required
          placeholder="Recipe name"
          name="recipe_name"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.prep}
          type="number"
          required
          placeholder="Prep Time"
          name="prep"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.cook}
          type="number"
          required
          placeholder="Cook TIme"
          name="cook"
          min="0"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.serves}
          type="number"
          required
          placeholder="Number of Serves"
          name="serves"
          min="0"
          onChange={handleChange}
        />
        <label className="flex flex-col">
          Dietary requirements
          <select
            name="dietary"
            id="dietary"
            value={recipe.dietary}
            onChange={handleChange}
          >
            {dietaryRequirements.map((dietaryRequirement) => (
              <option
                value={dietaryRequirement}
                key={dietaryRequirement.length * Math.random()}
              >
                {dietaryRequirement}
              </option>
            ))}
          </select>
        </label>
        <TextArea
          name="allergens"
          label="contains:"
          onTagsChange={handleArrayChange}
          placeholder="E.g gluten, dairy, nuts"
        />
        <select
          name="sweet_savoury"
          id="sweet_savoury"
          value={recipe.sweet_savoury}
          onChange={handleChange}
        >
          <option value="sweet">sweet</option>
          <option value="savoury">savoury</option>
          <option value="both">both sweet and savoury</option>
        </select>

        <ImageUpload />
        <InputField
          value={recipe.recipeDescription}
          type="text"
          required
          placeholder="Recipe Description"
          name="recipe_description"
          onChange={handleChange}
        />
        <select
          name="meal_time"
          id="meal_time"
          value={recipe.meal_time}
          onChange={handleChange}
        >
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <TextArea
          name="keywords"
          label="keywords:"
          onTagsChange={handleArrayChange}
        />

        <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

        <div className="flex flex-row gap-4">
          <IngredientContainer
            handleArrayChange={handleArrayChange}
            name="ingredients"
          />
          <StepContainer handleArrayChange={handleArrayChange} name="steps" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default RecipeFromLayout;
