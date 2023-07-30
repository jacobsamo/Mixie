import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { recipes, info, ingredients } from './schemas';

// join the info and ingredients to the recipe

export const infoSchema = createInsertSchema(info);

export const ingredientsSchema = createInsertSchema(ingredients);

export const recipeSchema = createInsertSchema(recipes, {
  imgUrl: z.string().url().optional(),
  steps: z
    .object({
      step_body: z.string(),
    })
    .array()
    .optional(),
});

// extend the recipe schema to include the info and ingredients
export const insertRecipeSchema = recipeSchema.extend({
  info: infoSchema.optional(),
  ingredients: ingredientsSchema.array().optional(),
});

export const recipeFormSchema = insertRecipeSchema.extend({
  ingredients: ingredientsSchema
    .extend({
      recipeId: z.string().uuid().optional(),
    })
    .array()
    .optional(),
});
