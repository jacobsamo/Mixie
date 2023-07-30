import { recipeId } from '@/src/common/lib/utils';
import { ingredients } from '@/src/db/schemas';
import * as z from 'zod';

// keep this here until i know that everything works as it should with the drizzleZod plugin
export const recipeFormSchema = z.object({
  uid: z.string().uuid(),
  id: z.string(), // generated from the title
  title: z.string().min(2, {
    message: 'must be at least 2 characters long',
  }),
  description: z.string().nullable().optional(),
  imgUrl: z.string().url().nullable().optional(),
  imgAlt: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  info: z
    .object({
      recipeId: z.string().uuid().optional(),
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
    .enum(['not_set', 'breakfast', 'lunch', 'dinner', 'snack'])
    .default('not_set')
    .nullable()
    .optional(),
  version: z.string().default('1.0.0'),

  ingredients: z
    .object({
      recipeId: z.string().uuid().optional(),
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
      quantity: z.number().nullable(),
      amount: z
        .enum(['not_set', '1/8', '1/2', '1/3', '2/3', '1/4', '3/4'])
        .default('not_set'),
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
    .array()
    .optional(),
  dietary: z
    .enum([
      'none',
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
      'egg_free',
    ])
    .default('none')
    .nullable()
    .optional(),
  contains: z
    .object({
      value: z.string(),
    })
    .array()
    .optional(),
  allergens: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .optional(),
  sweet_savoury: z
    .enum(['not_set', 'sweet', 'savoury'])
    .default('not_set')
    .nullable()
    .optional(),
  difficulty_level: z.enum(['not_set', 'easy', 'medium', 'hard']).optional(),
  cuisine: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable()
    .optional(),
  isPublic: z.boolean().default(false),

  lastUpdatedBy: z.string(),
  createdBy: z.string(),

  madeRecipe: z.number().nullable().default(null).optional(),
  savedRecipe: z.number().nullable().default(null).optional(),
});
