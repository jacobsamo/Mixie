import { users, accounts, sessions, verificationTokens } from "./schemas/auth";
import { recipes, info, ratings } from "./schemas/recipe";
// import { groupMembers, groups, groupRecipes } from './schemas/groups';

import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { z } from "zod";
import {
  recipeSchema,
  infoSchema,
  ingredientSchema,
  stepSchema,
  recipeFormSchema,
  recipesSelect,
  ratingsSchema,
  bookmarkSchema,
} from "./zodSchemas";

import { amount } from "./zodEnums";

// users
type User = InferSelectModel<typeof users>;
type NewUser = InferInsertModel<typeof users>;

export type { User, NewUser };


type PartialRecipe = z.infer<typeof recipeSchema>;
type NewPartialRecipe = z.infer<typeof recipeSchema>;
type Info = z.infer<typeof infoSchema>;
type NewInfo = z.infer<typeof infoSchema>;

type Recipe = z.infer<typeof recipesSelect>;
type NewRecipe = z.infer<typeof recipeFormSchema>;


// ingredients
export type Ingredient = z.infer<typeof ingredientSchema>;

export type Amount = z.infer<typeof amount>;

export type Step = z.infer<typeof stepSchema>;

export type SelectValue = {
  label: string;
  value: string;
};


export type {
  Recipe,
  NewRecipe,
  PartialRecipe,
  NewPartialRecipe,
  Info,
  NewInfo,
};

export type Rating = z.infer<typeof ratingsSchema>;

// bookmarks
export type Bookmark = z.infer<typeof bookmarkSchema>;

// groups
// type Group = InferModel<typeof groups>;
// type NewGroup = InferModel<typeof groups, 'insert'>;

// export type { Group, NewGroup };
