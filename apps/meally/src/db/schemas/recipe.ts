import { relations } from 'drizzle-orm';
import {
  datetime,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  tinytext,
  tinyint,
  varchar,
  boolean,
  timestamp,
  char,
} from 'drizzle-orm/mysql-core';

const difficulty_level = mysqlEnum('difficulty_level', [
  'not_set',
  'easy',
  'medium',
  'hard',
]);

const sweet_savoury = mysqlEnum('sweet_savoury', [
  'not_set',
  'sweet',
  'savoury',
  'both',
]);

const dietary = mysqlEnum('dietary', [
  'none',
  'vegetarian',
  'vegan',
  'pescatarian',
  'gluten_free',
  'dairy_free',
  'nut_free',
  'egg_free',
]);

const mealTime = mysqlEnum('mealTime', [
  'not_set',
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'dessert',
]);

export const recipes = mysqlTable('recipes', {
  uid: char('uid', { length: 36 }).primaryKey().notNull(),
  id: varchar('id', { length: 191 }).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: text('description'),
  imgUrl: text('imgUrl'),
  imgAlt: text('imgAlt'),
  notes: text('notes'),
  steps: json('steps'),
  mealTime: mealTime.default('not_set'),
  version: tinytext('version').notNull().default('1.0.0'),

  // little extras for searching
  keywords: json('keywords'),
  dietary: dietary.default('none'),
  allergens: json('allergens'),
  sweet_savoury: sweet_savoury.default('not_set'),
  difficulty_level: difficulty_level.default('not_set'),
  cuisine: json('cuisine'),
  isPublic: boolean('isPublic').notNull().default(false),

  // users
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  lastUpdated: timestamp('lastUpdated').notNull().defaultNow().onUpdateNow(),
  lastUpdatedBy: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  createdBy: varchar('createdBy', { length: 191 }).notNull(),

  madeRecipe: int('madeRecipe'),
  savedRecipe: int('savedRecipe'),
});

export const ingredientsRelation = relations(recipes, ({ one }) => ({
  ingredients: one(ingredients, {
    fields: [recipes.uid],
    references: [ingredients.recipeId],
  }),
}));

const unit = mysqlEnum('unit', [
  'not_set',
  'grams',
  'kg',
  'cup',
  'ml',
  'litre',
  'tsp',
  'tbsp',
  'pinch',
  'item',
  'handful',
  'slice',
  'piece',
  'can',
  'bunch',
  'bottle',
]);

const amount = mysqlEnum('amount', [
  'not_set',
  '1/8',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '3/4',
]);
export const ingredients = mysqlTable('ingredients', {
  recipeId: char('recipeId', { length: 36 }).notNull(),
  isHeading: boolean('isHeading').notNull(),
  title: varchar('title', { length: 191 }),
  unit: unit.default('not_set'),
  quantity: int('quantity'),
  amount: amount.default('not_set'),
});

export const infoRelations = relations(recipes, ({ one }) => ({
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
}));

export const info = mysqlTable('info', {
  recipeId: char('recipeId', { length: 36 }).primaryKey().notNull(),
  total: varchar('total', { length: 191 }),
  prep: varchar('prep', { length: 191 }),
  cook: varchar('cook', { length: 191 }),
  serves: tinyint('serves'),
});

export const ratingsRelation = relations(info, ({ one }) => ({
  ratings: one(ratings, {
    fields: [info.recipeId],
    references: [ratings.recipeId],
  }),
}));

export const ratings = mysqlTable('ratings', {
  recipeId: char('recipeId', { length: 36 }).primaryKey().notNull(),
  userId: varchar('userId', { length: 191 }).notNull(),
  rating: tinyint('rating').notNull(),
});
