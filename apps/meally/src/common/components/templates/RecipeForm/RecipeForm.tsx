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
import { formSchema } from './form';
import TagInput from '../../ui/taginput';
import ImageUpload from './ImageUpload';

interface RecipeFormProps {
  recipe: Recipe | null;
}
// { recipe }: RecipeFormProps

const RecipeForm = () => {
  const [preview, setPreview] = useState(false);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    formState: { errors },
  } = methods;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //TODO: handle when a unit for the recipe is not `tsp` or `tbsp` and convert to `tsp, tbsp or cup` and there is a value in the amount this should be set to `undefined`
    console.log(values);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/2 mx-auto p-2 md:p-0"
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
          {...register('info.serves', { min: 0 })}
          error={errors.info?.serves}
          min={0}
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

        <section className="flex flex-row gap-4 ">
          <IngredientContainer />
          <StepContainer />
        </section>
        <Textarea
          id="notes"
          control={control}
          label="Notes, Tips or Suggestions"
        />
        <button>Submit</button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
