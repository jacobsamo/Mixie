import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { bookmarks, ratings, recipes, users } from "./schemas";
import { amount, unit } from "./zodEnums";

// join the info and ingredients to the recipe

const selectValue = z.object({
  value: z.string(),
  label: z.string(),
});

export const ingredientSchema = z.object({
  isHeading: z.boolean(),
  title: z.string(),
  unit: selectValue
    .extend({
      value: unit,
      label: unit,
    })
    .default({
      label: "grams",
      value: "grams",
    })
    .nullable(),
  quantity: z.number().optional().nullable(),
  amount: selectValue
    .extend({
      value: amount,
      label: amount,
    })
    .default({
      label: "not_set",
      value: "not_set",
    })
    .nullable(),
});

export const stepSchema = z.object({
  step_body: z.string(),
});

export const recipeSchema = createInsertSchema(recipes, {
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
  ingredientsList: z.string().array().nullable().optional(),
  imgUrl: z.string().url({ message: "Must be a valid url" }),
  imgAlt: z.string({ required_error: "Image must have an alt text" }),
  keywords: z.object({ value: z.string() }).array().optional(),
  prep: z
    .string()
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .optional(),
  cook: z
    .string()
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .optional(),
});

export const ratingsSchema = createInsertSchema(ratings);

// extend the recipe schema to include the info and ingredients
export const recipeFormSchema = recipeSchema;

// select
const recipeSchemaSelect = createSelectSchema(recipes, {
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
});

export const recipesSelect = recipeSchemaSelect.extend({
  ratings: ratingsSchema.optional(),
});

export const userSchema = createInsertSchema(users);

export const bookmarkSchema = createInsertSchema(bookmarks);
