import { InferModel } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './schemas/auth';
import { recipes, info, ingredients, ratings } from './schemas/recipe';
import { groupMembers, groups, groupRecipes } from './schemas/groups';

// users
type User = InferModel<typeof users>;
type NewUser = InferModel<typeof users, 'insert'>;

export type { User, NewUser };

// recipes
type PartialRecipe = InferModel<typeof recipes, 'select'>;
type NewPartialRecipe = InferModel<typeof recipes, 'insert'>;
type Info = InferModel<typeof info, 'select'>;
type NewInfo = InferModel<typeof info, 'insert'>;
type Ingredient = InferModel<typeof ingredients, 'select'>;
type NewIngredient = InferModel<typeof ingredients, 'insert'>;

// set the recipe type to have the info and ingredients but ingredients as an array
type Recipe = PartialRecipe &
  Info & { ingredients: Ingredient[]; steps: { step_body: string }[] };

// type Recipe = PartialRecipe & Info & Ingredient[];
type NewRecipe = NewPartialRecipe &
  NewInfo & { ingredients?: Ingredient[]; steps?: { step_body: string }[] };

export type {
  Recipe,
  NewRecipe,
  PartialRecipe,
  NewPartialRecipe,
  Info,
  NewInfo,
  Ingredient,
  NewIngredient,
};

// groups
type Group = InferModel<typeof groups>;
type NewGroup = InferModel<typeof groups, 'insert'>;

export type { Group, NewGroup };
