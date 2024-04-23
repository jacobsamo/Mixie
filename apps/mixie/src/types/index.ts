import { Tables } from "database.types";
import { z } from "zod";
import { amount } from "./zodSchemas/enums";
import {
  imageAttributesSchema,
  ingredientSchema,
  recipeFormSchema,
  recipeSchema,
  stepSchema,
  bookmarkSchema,
  collectionSchema,
  ratingsSchema,
} from "./zodSchemas/recipes";

export * from "./zodSchemas/recipes";

//recipes
export type Recipe = z.infer<typeof recipeSchema>;
export type NewRecipe = z.infer<typeof recipeFormSchema>;

export type ImageAttributes = z.infer<typeof imageAttributesSchema>;

// ingredients
export type Ingredient = z.infer<typeof ingredientSchema>;

export type Amount = z.infer<typeof amount>;

export type Step = z.infer<typeof stepSchema>;

export type SelectValue = {
  label: string;
  value: string;
};

export type Rating = z.infer<typeof ratingsSchema>;

// bookmarks
export type Bookmark = z.infer<typeof bookmarkSchema>;
export type Collection = z.infer<typeof collectionSchema>;
