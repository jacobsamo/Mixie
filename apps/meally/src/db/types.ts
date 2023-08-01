import { InferModel } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './schemas/auth';
import { recipes, info, ratings } from './schemas/recipe';
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

// ingredients
export enum unit {
  not_set = 'not_set',
  grams = 'grams',
  kg = 'kg',
  cup = 'cup',
  ml = 'ml',
  litre = 'litre',
  tsp = 'tsp',
  tbsp = 'tbsp',
  pinch = 'pinch',
  item = 'item',
  handful = 'handful',
  slice = 'slice',
  piece = 'piece',
  can = 'can',
  bunch = 'bunch',
  bottle = 'bottle',
}

export enum amount {
  not_set = 'not_set',
  '1/8' = '1/8',
  '1/2' = '1/2',
  '1/3' = '1/3',
  '2/3' = '2/3',
  '1/4' = '1/4',
  '3/4' = '3/4',
}

export type Ingredient = {
  isHeading: boolean;
  title: string;
  unit?: unit.not_set | unit | null;
  quantity?: number | null;
  amount?: amount.not_set | amount | null;
};

export type Step = {
  step_body: string;
};

// set the recipe type to have the info and ingredients but ingredients as an array
type Recipe = PartialRecipe &
  Info & {
    steps: { step_body: string }[];
    ingredients: Ingredient[];
  };

// type Recipe = PartialRecipe & Info & Ingredient[];
type NewRecipe = NewPartialRecipe &
  NewInfo & {
    steps?: { step_body: string }[];
    ingredients?: Ingredient[];
  };

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
