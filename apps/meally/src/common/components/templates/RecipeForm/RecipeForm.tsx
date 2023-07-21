'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
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



interface RecipeFormProps {
  recipe: Recipe | null;
}
// { recipe }: RecipeFormProps

const RecipeForm = () => {
  const [preview, setPreview] = useState(false);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    console.log(values);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full md:w-1/2 mx-auto p-2 md:p-0"
      >
        <Input
          {...register('title', {
            required: true,
          })}
          required
          label="Title"
        />
        <Textarea
          id="recipe-description"
          label="Description"
          control={control}
        />
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

        <Select {...register('allergens')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Allergens" />
          </SelectTrigger>
          <SelectContent>
            {dietaryRequirements.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Vegan, vegerenten, etc select */}

        <Select {...register('allergens')}>
          <SelectTrigger className="w-[180px]">
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

        <section>{/*Image upload */}</section>

        <Select {...register('allergens')}>
          <SelectTrigger className="w-[180px]">
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

        {/* Keywords */}

        <section>
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
