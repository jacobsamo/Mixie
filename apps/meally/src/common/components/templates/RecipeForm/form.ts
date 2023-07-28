import { recipeId } from '@/src/common/lib/utils';
import { ingredients } from '@/src/db/schemas';
import * as z from 'zod';

export const recipeFormSchema = z.object({
  // uid: z.string(),
  id: z.string(), // generated from the title
  title: z.string().min(2, {
    message: 'must be at least 2 characters long',
  }),
  description: z.string().optional(),
  imgUrl: z.string().url().optional(),
  imgAlt: z.string().optional(),
  notes: z.string().optional(),
  info: z
    .object({
      prep: z.string().optional(),
      cook: z.string().optional(),
      total: z.string().optional(),
      rating: z.number().optional(),
      serves: z
        .number()
        .min(0, {
          message: 'Value must be above 0',
        })
        .optional(),
    })
    .optional(),
  mealTime: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  version: z.string().default('1.0.0'),
  ingredients: z
    .object({
      isHeading: z.boolean(),
      title: z.string(),
      unit: z.string().nullable(),
      quantity: z.number().nullable(),
      amount: z.string().nullable(),
    })
    .array()
    .optional(),
  steps: z
    .object({
      step_body: z.string(),
    })
    .array()
    .optional(),

  // little extras for searching
  keywords: z
    .object({
      value: z.string(),
    })
    .optional(),
  dietary: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  contains: z
    .object({
      value: z.string(),
    })
    .optional(),
  allergens: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  sweet_savoury: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  difficulty_level: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  cuisine: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  isPublic: z.boolean().default(false),

  lastUpdatedBy: z.string(),
  createdBy: z.string(),

  madeRecipe: z.number().default(0).optional(),
  savedRecipe: z.number().default(0).optional(),
});


