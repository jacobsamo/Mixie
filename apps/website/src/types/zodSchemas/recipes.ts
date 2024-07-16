import { z } from "zod";
import { difficulty_level, recipe_creation_type, sweet_savoury } from "./enums";
import { NewRecipe } from "..";

const selectValue = z.object({
  value: z.string(),
  label: z.string(),
});

export const createRecipeSchema = z
  .object({
    title: z.string().nullish(),
    link: z.string().nullish(),
  })
  .superRefine((values, ctx) => {
    if (!values.title && !values.link) {
      ctx.addIssue({
        code: "custom",
        message: "Either a title or a link is required",
        path: ["title", "link"],
      });
    }

    if (values.link) {
      try {
        new URL(values.link);
      } catch (err) {
        ctx.addIssue({
          code: "custom",
          message: "Link must be a valid url",
          path: ["link"],
        });
      }
    }

    return values;
  });

export const image_attributesSchema = z.object({
  alt: z.string(),
  photographer: z.string().optional(),
  photographer_link: z.string().url().optional(),
  source: z.enum(["unsplash", "pexels", "upload", "other"]).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const ingredientSchema = z.object({
  isHeading: z.boolean().nullish(),
  text: z.string(),
});

export const stepSchema = z.object({
  /**
   * The step instructions
   */
  text: z.string(),
  /**
   * A image to help visualize the step
   */
  image: z.string().nullish(),
  /**
   * The url of the step
   */
  url: z.string().url().nullish(),
});

const recipes = z.object({
  category: z.string().array().nullable(),
  cook_time: z
    .number()
    .min(0, { message: "Cook time must be a positive number" })
    .nullable(),
  created_by: z.string(),
  created_at: z.string(),
  cuisine: z.string().array().nullable(),
  description: z.string().nullable(),
  difficulty_level: difficulty_level.default("not_set").nullable(),
  id: z.string(),
  image_attributes: image_attributesSchema.nullable(),
  image_url: z.string().nullable(),
  ingredients: ingredientSchema.array().nullable(),
  ingredients_list: z.string().array().nullable(),
  keywords: z.string().array().nullable(),
  meal_time: selectValue.array().nullish(),
  notes: z.string().nullable(),
  nutrition: z.string().array().nullable(),
  prep_time: z
    .number()
    .min(0, { message: "Prep time must be a positive number" })
    .nullable(),
  public: z.boolean().default(false),
  rating: z.number().nullable(),
  recipe_creation_type: recipe_creation_type.default("title"),
  recipe_id: z.string(),
  source: z
    .string()
    .url({ message: "Should be the url of the recipe" })
    .nullable(),
  steps: stepSchema.array().nullable(),
  suitable_for_diet: z.string().nullable(),
  sweet_savoury: sweet_savoury.default("not_set").nullable(),
  title: z.string(),
  total_time: z.number().nullable(),
  version: z.string(),
  yield: z.number().nullable(),
});

const recipes_edit = z.object({
  category: z.string().array().nullish(),
  cook_time: z
    .number()
    .min(0, { message: "Cook time must be a positive number" })
    .nullish(),
  created_at: z.string().optional(),
  created_by: z.string(),
  cuisine: z.string().array().nullish(),
  description: z.string().nullish(),
  difficulty_level: difficulty_level.default("not_set").optional(),
  id: z.string(),
  image_attributes: image_attributesSchema.nullish(),
  image_url: z.string().nullish(),
  ingredients: ingredientSchema.array().nullish(),
  ingredients_list: z.string().array().nullish(),
  keywords: z.string().array().nullish(),
  meal_time: selectValue.array().nullish(),
  notes: z.string().nullish(),
  nutrition: z.string().array().nullish(),
  prep_time: z
    .number()
    .min(0, { message: "Prep time must be a positive number" })
    .nullish(),
  public: z.boolean().default(false).optional(),
  rating: z.number().nullish(),
  recipe_creation_type: recipe_creation_type.default("title").optional(),
  recipe_id: z.string().optional(),
  source: z
    .string()
    .url({ message: "Should be the url of the recipe" })
    .nullish(),
  steps: stepSchema.array().nullish(),
  suitable_for_diet: z.string().nullish(),
  sweet_savoury: sweet_savoury.default("not_set").optional(),
  title: z.string(),
  total_time: z.number().nullish(),
  version: z.string(),
  yield: z.number().nullish(),
});

export const recipeSchema = recipes_edit.extend({
  // recipe_id: z.string(),
  steps: stepSchema.array(),
  ingredients: ingredientSchema.array(),
  ingredients_list: z.string().array().nullish(),
  image_url: z
    .string({
      required_error: "An image must be present when a recipe is public",
    })
    .url({ message: "Must be a valid url" })
    .nullish(),
  image_attributes: image_attributesSchema.nullish(),
});

// extend the recipe schema to include the info and ingredients
export const recipeClientFormSchema = recipeSchema
  .extend({
    keywords: z
      .object({
        value: z.string(),
      })
      .array()
      .nullish(),
  })
  .superRefine((values, ctx) => {
    if (values.public) {
      ["cook_time", "prep_time", "image_url"].forEach((field) => {
        if (!(values as { [key: string]: any })[field]) {
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

      if (!values.meal_time) {
        ctx.addIssue({
          code: "custom",
          message: "Meal time is required for public recipes",
          path: ["meal_time"],
        });
      }
    }
    return values;
  });

export const recipeFormSchema = recipeSchema.superRefine((values, ctx) => {
  if (values.public) {
    ["cook_time", "prep_time", "image_url"].forEach((field) => {
      if (!(values as { [key: string]: any })[field]) {
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

    if (!values.meal_time) {
      ctx.addIssue({
        code: "custom",
        message: "Meal time is required for public recipes",
        path: ["meal_time"],
      });
    }
  }
  return values;
});

export const bookmarkSchema = z.object({
  bookmark_id: z.string(),
  created_at: z.string(),
  notes: z.string().nullable(),
  rating: z.number().nullable(),
  tags: z.string().array().nullable(),
  recipe_id: z.string().nullable(),
  user_id: z.string().nullable(),
});

export const bookmarksWithLinkSchema = bookmarkSchema.extend({
  collections: z.string().array().nullable(),
  recipes: recipes,
});

export const collectionSchema = z.object({
  collection_id: z.string(),
  created_at: z.string(),
  description: z.string().nullish(),
  title: z.string(),
  user_id: z.string().optional(),
});
export const ratingsSchema = z.object({
  rating: z.number(),
  rating_id: z.string(),
  recipe_id: z.string(),
  user_id: z.string(),
});
