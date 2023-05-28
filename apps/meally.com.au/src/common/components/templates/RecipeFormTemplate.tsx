import React, { useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { auth } from '@lib/config/firebase';
import { Timestamp } from 'firebase/firestore';
import { Recipe } from 'libs/types';
import RecipeService from '@lib/service/RecipeService';
import {
  dietaryRequirements,
  sweet_savoury,
  meal_times,
  initialRecipeState,
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
import useUser from 'src/common/hooks/useUser';
import { useToast } from 'shared/src/components/toast/use-toast';
import FileService from '@lib/service/FileService';

const RecipeFromLayout = () => {
  const loggedInUser = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const methods = useForm<Recipe>({
    defaultValues: {
      ...initialRecipeState,
    },
  });
  const { control, handleSubmit, formState, reset } = methods;
  const { toast } = useToast();

  const onsubmit = async (data: Recipe) => {
    console.log('data', data);
    if (data) {
      const total = Utils.calculateTotalTime(data.info.prep, data.info.cook);
      let imageUploaded: string | null = null;
      const image = fileInputRef.current?.files?.[0];
      if (image) {
        try {
          const response = await FileService.uploadImage(
            image,
            'recipe',
            `${data.recipeName.replace(/\s+/g, '-').toLowerCase()}`
          );
          imageUploaded = response.url || '';
          console.log('response of api', imageUploaded);
        } catch (error) {
          console.error('Image upload error:', error);
          // Handle error if the image upload fails
        }
      } else {
        imageUploaded = data.image.imgUrl;
      }

      const user = {
        uid: auth.currentUser?.uid || '',
        displayName: loggedInUser.user?.displayName || '',
        userName: loggedInUser.user?.userName || '',
        email: auth.currentUser?.email || '',
        phoneNumber: auth.currentUser?.phoneNumber || '',
      };
      console.log('Submitting user: ', user);
      const recipe = {
        ...data,
        id: data.recipeName.replace(/\s+/g, '-').toLowerCase(),
        createdAt: Timestamp.now(),
        createdBy: user,
        lastUpdated: Timestamp.now(),
        info: {
          ...data.info,
          total: total,
        },
        mealTime: data.mealTime,
        lastUpdatedBy: user,
        version: '1.0',
      } as Recipe;
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
        await RecipeService.createRecipe(recipe).then((res) => {
          console.log('Recipes been sent to server: ', res);
          if (res.status === 200) {
            toast({
              title: 'Recipe created.',
              description: 'Your recipe has been created.',
            });
            // reset();
            console.log('Recipe has been created: ', recipe);
          } else {
            console.log('There was an error: ', res.message);
            toast({
              title: 'Uh oh! Something went wrong.',
              description: 'There was an error while creating your recipe.',
              variant: 'destructive',
            });
          }
        });
      }
    }
  };

  return (
    <main className="pb-20">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col sm:gap1 sm:p-3 sm:w-3/5 sm:first-letter:mr-auto sm:ml-[15%] w-full gap-3 p-1 m-0"
        >
          <InputField
            id="recipeName"
            name="recipeName"
            label="Recipe Name"
            type="text"
            required={true}
            control={control}
            // defaultValue={recipe.recipeName}
          />
          <TextArea
            id="recipeDescription"
            name="recipeDescription"
            label="Recipe description"
            control={control}
            options={{ required: true }}
            // defaultValue={recipe.recipeDescription}
          />
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
            // defaultValue={recipe.info.prep}
          />
          <InputField
            id="cook"
            name="info.cook"
            label="Cook Time"
            type="string"
            required
            // options={{ pattern: /(\d+w)?(\d+d)?(\d+h)?(\d+m)?/ }}
            control={control}
            // defaultValue={recipe.info.cook}
          />
          <InputField
            id="serves"
            name="info.serves"
            label="Number of serves"
            type="number"
            required
            options={{ min: 0 }}
            control={control}
            // defaultValue={recipe.info.cook}
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
          <ImageUpload fileUploadRef={fileInputRef} />
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

          <div className="flex flex-row flex-wrap items-start p-0 sm:gap-8 gap-3 h-fit sm:w-full">
            <IngredientContainer />
            <StepContainer />
          </div>
          <TextArea
            id="notes"
            name="notes"
            label="Notes, Tips, Suggestions"
            control={control}
            // defaultValue={recipe.notes || ''}
          />
          <Button
            type="submit"
            className="text-step--1 mt-14 mb-3 border rounded-lg"
            disabled={!formState.dirtyFields || !formState.isValid}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </main>
  );
};

export default RecipeFromLayout;
