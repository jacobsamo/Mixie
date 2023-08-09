import { InferModel } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './schemas/auth';
import { recipes, info, ratings } from './schemas/recipe';
import { groupMembers, groups, groupRecipes } from './schemas/groups';
import { z } from 'zod';
import {
  amount,
  ingredientSchema,
  recipeSchema,
  stepSchema,
} from './zodSchemas';

// users
type User = InferModel<typeof users>;
type NewUser = InferModel<typeof users, 'insert'>;

export type { User, NewUser };

// recipes
type PartialRecipe = InferModel<typeof recipes, 'select'>;
type NewPartialRecipe = InferModel<typeof recipes, 'insert'>;
type Info = InferModel<typeof info, 'select'>;
type NewInfo = InferModel<typeof info, 'insert'>;

// ingredients
export type Ingredient = z.infer<typeof ingredientSchema>;

export type Amount = z.infer<typeof amount>;

export type Step = z.infer<typeof stepSchema>;

// set the recipe type to have the info and ingredients but ingredients as an array

interface Recipe extends PartialRecipe {
  info: Info;
  steps: Step[];
  ingredients: Ingredient[];
}

// type Recipe = PartialRecipe & Info & Ingredient[];
interface NewRecipe extends NewPartialRecipe {
  info: NewInfo;
  steps?: Step[];
  ingredients?: Ingredient[];
}

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
