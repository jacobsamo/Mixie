import { InferModel } from 'drizzle-orm';
import { users, accounts, sessions, verificationTokens } from './schemas/auth';
import { recipes, info, ingredients, ratings } from './schemas/recipe';
import { groupMembers, groups, groupRecipes } from './schemas/groups';

// users
type User = InferModel<typeof users>;
type NewUser = InferModel<typeof users, 'insert'>;

export type { User, NewUser };

// recipes
type Recipe = InferModel<typeof recipes>;
type NewRecipe = InferModel<typeof recipes, 'insert'>;
type Info = InferModel<typeof info>;
type NewInfo = InferModel<typeof info, 'insert'>;
type Ingredient = InferModel<typeof ingredients>;
type NewIngredient = InferModel<typeof ingredients, 'insert'>;

export type { Recipe, NewRecipe, Info, NewInfo, Ingredient, NewIngredient };

// groups
type Group = InferModel<typeof groups>;
type NewGroup = InferModel<typeof groups, 'insert'>;

export type { Group, NewGroup };
