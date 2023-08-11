import { InferModel } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './schemas/auth';
import { recipes, info, ratings } from './schemas/recipe';
import { groupMembers, groups, groupRecipes } from './schemas/groups';
import { z } from 'zod';
import {
  recipeSchema,
  infoSchema,
  ingredientSchema,
  amount,
  stepSchema,
  recipeFormSchema,
  recipesSelect,
} from './zodSchemas';

// users
type User = InferModel<typeof users>;
type NewUser = InferModel<typeof users, 'insert'>;

export type { User, NewUser };

// recipes
// type PartialRecipe = InferModel<typeof recipes, 'select'>;
// type NewPartialRecipe = InferModel<typeof recipes, 'insert'>;
// type Info = InferModel<typeof info, 'select'>;
// type NewInfo = InferModel<typeof info, 'insert'>;

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

// set the recipe type to have the info and ingredients but ingredients as an array

// type Recipe = PartialRecipe & Info & Ingredient[];

export type {
  Recipe,
  NewRecipe,
  PartialRecipe,
  NewPartialRecipe,
  Info,
  NewInfo,
};

// groups
type Group = InferModel<typeof groups>;
type NewGroup = InferModel<typeof groups, 'insert'>;

export type { Group, NewGroup };
