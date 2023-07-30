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
// imoport
import {
  mealTime,
  amount,
  dietary,
  difficulty_level,
  sweet_savoury,
  unit,
} from './enums';

// Recipes
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

export const recipesRelation = relations(recipes, ({ one, many }) => ({
  ingredients: many(ingredients),
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
  ratings: one(ratings, {
    fields: [recipes.uid],
    references: [ratings.recipeId],
  }),
}));

// Ingredients
export const ingredients = mysqlTable('ingredients', {
  recipeId: char('recipeId', { length: 36 }).notNull(),
  isHeading: boolean('isHeading').notNull(),
  title: varchar('title', { length: 191 }),
  unit: unit.default('not_set'),
  quantity: int('quantity'),
  amount: amount.default('not_set'),
});

export const ingredientsRelation = relations(recipes, ({ one }) => ({
  ingredients: one(ingredients, {
    fields: [recipes.uid],
    references: [ingredients.recipeId],
  }),
}));

// Info
export const info = mysqlTable('info', {
  recipeId: char('recipeId', { length: 36 }).primaryKey().notNull(),
  total: varchar('total', { length: 191 }),
  prep: varchar('prep', { length: 191 }),
  cook: varchar('cook', { length: 191 }),
  serves: tinyint('serves'),
});

export const infoRelations = relations(recipes, ({ one }) => ({
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
}));

// Ratings
export const ratings = mysqlTable('ratings', {
  recipeId: char('recipeId', { length: 36 }).primaryKey().notNull(),
  userId: varchar('userId', { length: 191 }).notNull(),
  rating: tinyint('rating').notNull(),
});

export const ratingsRelation = relations(info, ({ one }) => ({
  ratings: one(ratings, {
    fields: [info.recipeId],
    references: [ratings.recipeId],
  }),
}));
