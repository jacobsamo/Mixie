'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { auth } from '@lib/config/firebase';
import { Timestamp } from 'firebase/firestore';
import { Recipe } from 'libs/types';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import {
  dietaryRequirements,
  sweet_savoury,
  meal_times,
} from '@lib/service/data';
import styles from '@components/elements/recipe_form/Form.module.scss';
import { InputField, TagInput, TextArea } from 'shared';
import {
  IngredientContainer,
  StepContainer,
  SelectComponent,
} from '@components/elements/recipe_form/';
import ImageUpload from '@components/elements/recipe_form/ImageUpload';
import Button from 'shared/src/components/buttons/Button';
import UserService from '@lib/service/UserService';
import Utils from '@lib/service/Utils';

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
    dietary: [],
    allergens: [],
    sweet_savoury: '',
    mealTime: [],
    version: '',
    createdBy: {
      uid: '',
      displayName: '',
    },
    createdAt: Timestamp.now(),
    lastUpdated: Timestamp.now(),
    lastUpdatedBy: {
      uid: '',
      displayName: '',
    },
    info: {
      total: '',
      prep: '',
      cook: '',
      serves: undefined,
      rating: 0,
    },
    steps: [{ step_body: '' }],
    ingredients: [{ ingredient: '', unit: 'gram', quantity: undefined }],
    madeRecipe: 0,
    savedRecipe: 0,
  } as Recipe);
  const router = useRouter();

  const getRecipe = async () => {
    const query = router.query.recipe;
    const recipe = await localStorageService.readLocal('recipe');
    if (recipe) {
      setRecipe(recipe);
    }
  };

  const methods = useForm<Recipe>({
    defaultValues: {
      ...recipe,
    } as Recipe,
  });

  const { control, handleSubmit } = methods;

  useEffect(() => {
    getRecipe();
  }, []);

  const onsubmit = async (data: Recipe) => {
    const total = Utils.calculateTotalTime(data.info.prep, data.info.cook);
    const user = {
      uid: auth.currentUser?.uid || '',
      displayName: auth.currentUser?.displayName || '',
      email: auth.currentUser?.email || '',
      phoneNumber: auth.currentUser?.phoneNumber || '',
    };
    const recipe = {
      ...data,
      id: data.recipeName.replace(/\s+/g, '-').toLowerCase(),
      createdAt: Timestamp.now(),
      createdBy: user,
      lastUpdated: Timestamp.now(),
      info: {
        total: total,
      },
      lastUpdatedBy: user,
      version: '1.0',
    } as Recipe
    if (auth.currentUser) {
      await UserService.createRecipe({
        id: recipe.id,
        recipeName: recipe.recipeName,
        image: {
          imgUrl: recipe.image.imgUrl,
          imgAlt: recipe.image.imgAlt,
        },
        keywords: recipe.keywords,
        totalCookTime: recipe.info.total,
        lastViewed: recipe.createdAt,
        privacy: 'public',
      });
      await RecipeService.createRecipe(recipe);
    }
    console.log('Recipe has been created: ', recipe);
  };

  return (
    <main className="pb-20">
      <FormProvider {...methods}>
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
          <TextArea
            id="recipeDescription"
            name="recipeDescription"
            label="Recipe description"
            control={control}
            options={{ required: true }}
            defaultValue={recipe.recipeDescription}
          />
          {/*TODO: Turn this into a field that is something more like: 1h 30m 20s just like Jira */}
          {/* <p>
            Use the format: 1d 30h 20m 20s
            <ol className='list-disc ml-1'>
              <li>w = weeks</li>  <li>d = days</li> <li>h = hours</li>
              <li>m = minutes</li>
            </ol>
          </p> */}
          <p>
            Enter the time in the format 4d 6h 45m, where d = days, h = hours,
            and m = minutes.
          </p>
          <InputField
            id="prep"
            name="info.prep"
            label="Prep Time in minutes"
            type="string"
            required
            // options={{ pattern: /(\d+w)?(\d+d)?(\d+h)?(\d+m)?/ }}
            control={control}
            defaultValue={recipe.info.prep}
          />
          <InputField
            id="cook"
            name="info.cook"
            label="Cook Time"
            type="string"
            required
            // options={{ pattern: /(\d+w)?(\d+d)?(\d+h)?(\d+m)?/ }}

            control={control}
            defaultValue={recipe.info.cook}
          />
          <InputField
            id="serves"
            name="info.serves"
            label="Number of serves"
            type="number"
            required
            options={{ min: 0 }}
            control={control}
            defaultValue={recipe.info.cook}
          />
          <SelectComponent
            name="dietary"
            label="Dietary requirements"
            options={dietaryRequirements}
            isMultiple={true}
            fieldOptions={{ required: true }}
          />
          <TagInput
            id="allergens"
            name="allergens"
            label="E.g gluten, dairy, nuts"
            hint="Allergens (separated by a comma)"
            control={control}
          />
          <SelectComponent
            name="sweet_savoury"
            label="Sweet or Savoury"
            options={sweet_savoury}
            fieldOptions={{ required: true }}
          />
          <ImageUpload />
          <SelectComponent
            name="mealTime"
            label="Meal Time"
            options={meal_times}
          />
          <TagInput
            id="keywords"
            name="keywords"
            label="Keywords (separated by a comma)"
            hint="Keywords will be used to help users find your recipe."
            control={control}
          />
          <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

          <div className={styles.IngredientMethodContainer}>
            <IngredientContainer />
            <StepContainer />
          </div>
          <TextArea
            id="notes"
            name="notes"
            label="Notes, Tips, Suggestions"
            control={control}
            defaultValue={recipe.notes || ''}
          />
          <Button
            type="submit"
            className="text-step--1 mt-14 mb-3 border rounded-lg"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </main>
  );
};

export default RecipeFromLayout;
