'use client';
import React, { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Recipe } from 'libs/types';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import {
  dietaryRequirements,
  initialRecipeState,
  units,
} from '@lib/service/data';
import styles from '@components/elements/recipe_form/Form.module.scss';
import { InputField } from 'shared';
import RecipeFrom from '@components/elements/recipe_form/logic';
import {
  IngredientContainer,
  StepContainer,
  TextArea,
} from '@components/elements/recipe_form/';
import ImageUpload from '@components/elements/recipe_form/ImageUpload';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';

const RecipeFromLayout = () => {
  const [recipe, setRecipe] = useState<Recipe>({
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
  });
  const router = useRouter();

  const getRecipe = async () => {
    const query = router.query.recipe;
    const recipe = await localStorageService.readLocal('recipe');
    if (recipe) {
      setRecipe(recipe);
    }
  };

  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      ...recipe,
    },
  });

  useEffect(() => {
    getRecipe();
  }, []);

  const onsubmit = async (data: any) => {
    console.log('Recipe has been created: ', data);
    // const recipeId = await RecipeService.createRecipe(recipe);
  };

  return (
    <main>
      <div className="flex w-full p-3">
        <div className="flex flex-col justify-center items-center">
          <h1>Recipe Creation Form</h1>
          <p>
            This is the recipe creation from before you start please read the
            conditions of use and tips for a better experience:
          </p>
          <ul>
            <li>
              If you refresh the page you will lose all your work (this will be
              change in the future)
            </li>
            <li>
              If you have any problems while creating a recipe please tell me
              before trying to submit
            </li>
            <li>
              If you have any improvement ideas please add them{' '}
              <Link
                href={'https://forms.gle/brc7atQ6dWDEsB7H6'}
                target="_blank"
                className="text-blue underline"
              >
                here
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit(onsubmit)} className={styles.recipeForm}>
        <InputField
          id="recipeName"
          name="recipeName"
          label="Recipe Name"
          type="text"
          required={true}
          control={control}
          defaultValue={recipe.recipeName}
        />
        {/*TODO: Turn this into a field that is something more like: 1h 30m 20s just like Jira */}
        <InputField
          id="prep"
          name="prep"
          label="Prep Time in minutes"
          type="number"
          required
          control={control}
          defaultValue={recipe.info.prep}
        />
        <InputField
          id="cook"
          name="cook"
          label="Cook Time in minutes"
          type="number"
          required
          options={{ min: 0 }}
          control={control}
          defaultValue={recipe.info.cook}
        />
        <InputField
          id="serves"
          name="serves"
          label="Number of serves"
          type="number"
          required
          options={{ min: 0 }}
          control={control}
          defaultValue={recipe.info.cook}
        />
        <label className="flex flex-col">
          Dietary requirements
          <select
            id="dietary"
            value={recipe.dietary}
            {...register('dietary', { required: true })}
          >
            {dietaryRequirements.map((dietaryRequirement, index) => (
              <option value={dietaryRequirement} key={index}>
                {dietaryRequirement}
              </option>
            ))}
          </select>
        </label>
        <TextArea
          name="allergens"
          label="Please list any allergens, separated by a comma or new line."
          onTagsChange={handleArrayChange}
          placeholder="E.g gluten, dairy, nuts"
        />
        <select
          id="sweet_savoury"
          value={recipe.sweet_savoury}
          {...register('sweet_savoury', { required: true })}
        >
          <option value="sweet">sweet</option>
          <option value="savoury">savoury</option>
          <option value="both">both sweet and savoury</option>
        </select>

        <ImageUpload handleChange={handleImageChange} />
        <textarea
          value={recipe.recipeDescription}
          required
          placeholder="Recipe Description"
          {...register('recipeDescription', { required: true })}
          rows={
            /\n/.test(recipe.recipeDescription)
              ? Number(recipe.recipeDescription.match(/\n/g)?.length) + 1
              : 3
          }
          className="resize-none w-80 mt-2 p-2 rounded-md border border-gray-300 dark:border-dark_grey focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <select
          id="meal_time"
          value={recipe.mealTime}
          {...register('mealTime', { required: true })}
        >
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <TextArea
          name="keywords"
          label="Please list some keywords, separated by a comma or new line."
          notes="Keywords will be used to help users find your recipe."
          onTagsChange={handleArrayChange}
        />
        <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

        <div className={styles.IngredientMethodContainer}>
          <IngredientContainer
            control={control}
            name="ingredients"
          />
          <StepContainer control={control}/>
        </div>

        <button
          type="submit"
          className="text-step--1 mt-14 mb-3 border rounded-lg"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default RecipeFromLayout;
