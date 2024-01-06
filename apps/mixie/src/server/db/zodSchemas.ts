import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { bookmarks, ratings, recipes, users } from "./schemas";
import { amount, unit } from "./zodEnums";

// join the info and ingredients to the recipe

const selectValue = z.object({
  value: z.string(),
  label: z.string(),
});

export const imageAttributesSchema = z.object({
  alt: z.string(),
  photographer: z.string().optional(),
  photographerLink: z.string().url().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
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
  quantity: z.number().nullish(),
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
  ingredientsList: z.string().array().nullish(),
  imgUrl: z
    .string({
      required_error: "An image must be present when a recipe is public",
    })
    .url({ message: "Must be a valid url" })
    .nullish(),
  imageAttributes: imageAttributesSchema.nullish(),
  keywords: z.object({ value: z.string() }).array().nullish(),
  prep: z
    .string({ required_error: "Prep time is required for public recipes" })
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .nullish(),
  cook: z
    .string({ required_error: "Cook time is required for public recipes" })
    .regex(/^(\d{1,2}[hms]\s?)+$/i, {
      message:
        "Must be in the format 4h 3m 4s where h = hours, m = minutes, s = seconds",
    })
    .nullish(),
});

export const ratingsSchema = createInsertSchema(ratings);

// extend the recipe schema to include the info and ingredients
export const recipeFormSchema = recipeSchema.superRefine((values, ctx) => {
  // if `isPublic` is `true` make sure cook, prep, keywords, imgUrl, ingredients.length < 0, steps.length < 0
  // if `isPublic` is `false` make these fields optional & nullable
  if (values.isPublic) {
    ["cook", "prep", "imgUrl"].forEach((field) => {
      if (!values[field]) {
        ctx.addIssue({
          code: "custom",
          message: `${field} is required for public recipes`,
          path: [field],
        });
      }
    });

    if (!values.ingredients || values.ingredients.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one ingredient is required for public recipes",
        path: ["ingredients"],
      });
    }

    if (!values.steps || values.steps.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one step is required for public recipes",
        path: ["steps"],
      });
    }
  }
  return values;
});

export const userSchema = createInsertSchema(users);

export const bookmarkSchema = createInsertSchema(bookmarks);
