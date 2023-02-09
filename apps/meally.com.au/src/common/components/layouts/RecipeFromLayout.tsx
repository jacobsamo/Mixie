'use client';
import { Recipe, Info } from 'libs/types';
import Image from 'next/image';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import { dietaryRequirements, initialRecipeState, units } from '@lib/service/data';
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

const RecipeFromLayout = () => {
  const [recipe, dispatch] = useReducer(
    RecipeFrom.recipeReducer,
    initialRecipeState
  );
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
  }, [recipe.recipeName, recipe.info.prep, recipe.info.cook]);

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
            {dietaryRequirements.map((dietaryRequirement, index) => (
              <option
                value={dietaryRequirement}
                key={index}
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

        <div className={styles.IngredientMethodContainer}>
          <IngredientContainer
            handleArrayChange={handleArrayChange}
            name="ingredients"
          />
          <StepContainer handleArrayChange={handleArrayChange} name="steps" />
        </div>

        <button type="submit">Submit</button>
      </form>
      <button onClick={() => console.log(recipe)}>get data</button>
    </>
  );
};

export default RecipeFromLayout;
