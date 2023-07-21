import * as z from 'zod';

export const formSchema = z.object({
    // uid: z.string(),
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
      serves: z.number().min(0, {
        message: 'Value must be above 0',
      }),
    }),
    mealTime: z.object({
      value: z.string(),
      label: z.string(),
    }),
    version: z.string().default('1.0.0'),
    ingredients: z
      .object({
        isHeading: z.boolean(),
        title: z.string(),
        unit: z.string(),
        quantity: z.number(),
        amount: z.number(),
      })
      .array(),
    steps: z
      .object({
        id: z.number(),
        step_body: z.string(),
      })
      .array(),
  
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