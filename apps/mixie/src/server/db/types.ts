import { users } from "./schemas/auth";
// import { groupMembers, groups, groupRecipes } from './schemas/groups';

import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import {
  bookmarkSchema,
  ingredientSchema,
  ratingsSchema,
  recipeFormSchema,
  recipesSelect,
  stepSchema
} from "./zodSchemas";

import { amount } from "./zodEnums";

// users
type User = InferSelectModel<typeof users>;
type NewUser = InferInsertModel<typeof users>;

export type { NewUser, User };

export type Recipe = z.infer<typeof recipesSelect>;
export type NewRecipe = z.infer<typeof recipeFormSchema>;

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
