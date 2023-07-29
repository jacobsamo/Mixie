'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Recipe } from '@/src/db/types';
import { Textarea } from '../../ui/textarea';

import {
  dietaryRequirements,
  meal_times,
  sweet_savoury,
} from '@lib/services/data';
import { IngredientContainer } from './IngredientContainer';
import { StepContainer } from './StepContainer';
import { recipeFormSchema } from './form';
import TagInput from '../../ui/taginput';
import ImageUpload from './ImageUpload';
import RecipeService from '@/src/common/lib/services/RecipeService';
import { toast } from '../../ui/use-toast';

interface RecipeFormProps {
  recipe: any | null;
}

const RecipeForm = ({ recipe }: RecipeFormProps) => {
  const [preview, setPreview] = useState(false);
  const methods = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      ...recipe,
      ingredients: [
        {
          title: '',
          unit: 'grams',
          quantity: null,
          isHeading: false,
          amount: null,
        },
      ],
      steps: [{ step_body: '' }],
    },
    // defaultValues: {
    //   mealTime: { label: 'Meal Time', value: '' },
    //   sweet_savoury: { label: 'Sweet or Savoury', value: '' },
    //   allergens: { label: 'Allergens', value: '' },
    // }
  });

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors, isDirty, isValid },
  } = methods;

  const onSubmit = async (recipe: z.infer<typeof recipeFormSchema>) => {
    console.log('Recipe: ', recipe);
    console.log(getValues());
    // if (!recipe) return;
    // const ingredients = recipe?.ingredients?.map((ingredient) => {
    //   if (!['cup', 'tbsp', 'tsp'].includes(ingredient?.unit || '')) {
    //     ingredient.unit = null;
    //   }
    //   return ingredient;
    // });
    // const data = {
    //   ...recipe,
    //   ingredients,
    // };
    // console.log('Data: ', data);
    // send data to edit the recipe in the db
    //   const res = await RecipeService.EditRecipe(data).then(res => {
    //     if (res.status == 200) {
    //       toast({'Recipe has been published succfulyy'})
    //     }
    //     else {
    //       toast({'An error occurred'})
    //     }
    //  })
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/2 mx-auto p-2 md:p-0 mb-[20%]"
      >
        <button type="button" onClick={() => console.log(getValues())}>
          get values
        </button>
        <Input
          {...register('title', {
            required: true,
          })}
          required
          label="Title"
        />
        <Textarea id="description" label="Description" control={control} />
        <Input
          {...register('info.prep')}
          label="Prep Time"
          hint="Must be in the format 4h 3m 4s where h = hours, m = mintues, s = seconds"
        />
        <Input
          {...register('info.cook')}
          label="Cook Time"
          hint="Must be in the format 4h 3m 4s where h = hours, m = mintues, s = seconds"
        />
        <Input
          {...register('info.serves', { valueAsNumber: true, min: 0 })}
          error={errors.info?.serves}
          label="Serves"
          type="number"
        />

        <Controller
          control={control}
          name="dietary"
          render={({ field }) => (
            <>
              <label
                htmlFor="dietary"
                className="block text-step--3 font-medium"
              >
                Dietary Requirements
              </label>
              <Select
                name="dietary"
                defaultValue={field.value?.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Dietary Requirements" />
                </SelectTrigger>
                <SelectContent>
                  {dietaryRequirements.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <TagInput
          control={control}
          name="contains"
          // label='Contains'
          placeholder="E.g gluten, dairy, nuts"
          hint="Allergens (separated by a comma)"
        />

        <Controller
          control={control}
          name="sweet_savoury"
          render={({ field }) => (
            <>
              <label
                htmlFor="sweet_savoury"
                className="block text-step--3 font-medium"
              >
                Sweet or Savoury
              </label>
              <Select
                name="sweet_savoury"
                defaultValue={field.value?.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Sweet or Savoury" />
                </SelectTrigger>
                <SelectContent>
                  {sweet_savoury.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <ImageUpload />

        <Controller
          control={control}
          name="mealTime"
          render={({ field }) => (
            <>
              <label
                htmlFor="mealTime"
                className="block text-step--3 font-medium"
              >
                Meal Time
              </label>
              <Select
                name="mealTime"
                defaultValue={field.value?.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-2/3 text-step--2">
                  <SelectValue placeholder="Meal time" />
                </SelectTrigger>
                <SelectContent>
                  {meal_times.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <TagInput
          name="keywords"
          control={control}
          placeholder="Keywords (separated by a comma)"
          hint="Keywords will be used to help users find your recipe."
        />

        <section className="flex flex-row flex-wrap gap-4 mb-8">
          <IngredientContainer />
          <StepContainer />
        </section>
        <Textarea
          id="notes"
          control={control}
          label="Notes, Tips or Suggestions"
        />
        <Button
          type="submit"
          ariaLabel="Submit Recipe"
          className="text-step--1 mt-14 mb-3  border rounded-lg"
          // disabled={!isDirty || !isValid}
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
