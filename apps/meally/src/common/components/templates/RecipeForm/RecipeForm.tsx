'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';

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
  units,
} from '@lib/services/data';
import { IngredientContainer } from './IngredientContainer';
import Step from '../RecipePage/step/Step';
import { StepContainer } from './StepContainer';

const formSchema = z.object({
  uid: z.string(),
  id: z.string(), // generated from the title
  title: z.string().min(2, {
    message: 'must be at least 2 characters long',
  }),
  description: z.string(),
  imgUrl: z.string(),
  imgAlt: z.string(),
  notes: z.string(),
  info: z.object({
    prep: z.string(),
    cook: z.string(),
    total: z.string(),
    rating: z.number(),
    serves: z.number(),
  }),
  steps: z.object({
    id: z.number(),
    step_body: z.string(),
  }),
  mealTime: z.object({
    value: z.string(),
    label: z.string(),
  }),
  version: z.string().default('1.0.0'),

  // little extras for searching
  keywords: z.object({
    value: z.string(),
    label: z.string(),
  }),
  dietary: z.object({
    value: z.string(),
    label: z.string(),
  }),
  allergens: z.object({
    value: z.string(),
    label: z.string(),
  }),
  sweet_savoury: z.object({
    value: z.string(),
    label: z.string(),
  }),
  difficulty_level: z.object({
    value: z.string(),
    label: z.string(),
  }),
  cuisine: z.object({
    value: z.string(),
    label: z.string(),
  }),
  isPublic: z.boolean().default(false),

  lastUpdatedBy: z.string(),
  createdBy: z.string(),

  madeRecipe: z.number().default(0),
  savedRecipe: z.number().default(0),
});

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Input {...register('info.serves')} label="Serves" />

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
