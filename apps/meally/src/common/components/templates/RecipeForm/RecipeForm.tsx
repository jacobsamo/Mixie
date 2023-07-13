'use client';
import React from 'react';
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
import { Input } from '@components/ui/input';
import { Recipe } from '@/src/db/types';

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

const RecipeForm = async () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
