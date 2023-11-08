import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { recipes, info, ratings, users } from "./schemas";
import { unit, amount } from "./zodEnums";

// join the info and ingredients to the recipe

export const infoSchema = createInsertSchema(info, {
  ingredients: z.string().array().nullable().optional(),
  imgUrl: z.string().url().optional(),
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

const selectValue = z.object({
  value: z.string(),
  label: z.string(),
});

export const ingredientSchema = z.object({
  isHeading: z.boolean(),
  title: z.string(),
  unit: selectValue.extend({
    value: unit,
    label: unit,
  }),
  quantity: z.number().nullable(),
  amount: selectValue.extend({
    value: amount,
    label: amount,
  }),
});

export const stepSchema = z.object({
  step_body: z.string(),
});

export const recipeSchema = createInsertSchema(recipes, {
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
});

export const ratingsSchema = createInsertSchema(ratings);

// extend the recipe schema to include the info and ingredients
export const recipeFormSchema = recipeSchema.extend({
  info: infoSchema.optional(),
});

// select

const recipeSchemaSelect = createSelectSchema(recipes, {
  steps: stepSchema.array().optional(),
  ingredients: ingredientSchema.array().optional(),
});

export const recipesSelect = recipeSchemaSelect.extend({
  info: infoSchema,
  ratings: ratingsSchema.optional(),
});

export const userSchema = createInsertSchema(users);
