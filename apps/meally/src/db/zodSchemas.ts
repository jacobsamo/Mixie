import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { recipes, info } from './schemas';

// join the info and ingredients to the recipe

export const infoSchema = createInsertSchema(info, {
  ingredients: z.string().array().nullable().optional(),
  keywords: z.object({ value: z.string() }).array().optional(),
});

export const amount = z
  .enum(['not_set', '1/8', '1/2', '1/3', '2/3', '1/4', '3/4'])
  .default('not_set');

export const ingredientSchema = z.object({
  isHeading: z.boolean(),
  title: z.string(),
  unit: z.enum([
    'not_set',
    'grams',
    'kg',
    'cup',
    'ml',
    'litre',
    'tsp',
    'tbsp',
    'pinch',
    'item',
    'handful',
    'slice',
    'piece',
    'can',
    'bunch',
    'bottle',
  ]),
  quantity: z.number().optional().nullable(),
  amount: amount,
});

export const stepSchema = z.object({
  step_body: z.string(),
});

export const recipeSchema = createInsertSchema(recipes, {
  imgUrl: z.string().url().optional(),
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
});

// extend the recipe schema to include the info and ingredients
export const recipeFormSchema = recipeSchema.extend({
  info: infoSchema,
});
