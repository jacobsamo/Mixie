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
  uniqueIndex,
  varchar,
  boolean,
} from 'drizzle-orm/mysql-core';

const difficulty_level = mysqlEnum('difficulty_level', [
  'not_set',
  'easy',
  'medium',
  'hard',
]);

export const recipes = mysqlTable('recipes', {
  uid: serial('uid').primaryKey().notNull(),
  id: text('id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  imgUrl: text('imgUrl'),
  imgAlt: text('imgAlt'),
  notes: text('notes'),
  info: json('info'),
  steps: json('steps'),
  mealTime: json('mealTime'),
  version: tinyint('version').notNull(),

  // little extras for searching
  keywords: json('keywords'),
  dietary: json('dietary'),
  allergens: json('allergens'),
  sweet_savoury: json('sweet_savoury'),
  difficulty_level: difficulty_level.default('not_set'),
  cuisine: json('cuisine'),
  isPublic: boolean('isPublic').notNull().default(false),

  // users
  createdAt: datetime('createdAt').notNull().default(new Date()),
  lastUpdated: datetime('lastUpdated').notNull().default(new Date()),
  lastUpdatedBy: varchar('lastUpdatedBy', { length: 255 }).notNull(),
  createdBy: varchar('createdBy', { length: 255 }).notNull(),

  madeRecipe: int('madeRecipe'),
  savedRecipe: int('savedRecipe'),
});

export const ingredientsRelation = relations(recipes, ({ one }) => ({
  ingredients: one(ingredients, {
    fields: [recipes.uid],
    references: [ingredients.recipeId],
  }),
}));

export const ingredients = mysqlTable('ingredients', {
  recipeId: varchar('recipeId', { length: 255 }).notNull(),
  isHeading: boolean('isHeading').notNull(),
  title: varchar('title', { length: 255 }),
  unit: varchar('unit', { length: 255 }),
  quantity: tinyint('quantity'),
  amount: tinyint('amount'),
});

export const infoRelations = relations(recipes, ({ one }) => ({
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
}));

export const info = mysqlTable('info', {
  recipeId: varchar('recipeId', { length: 255 }).notNull(),
  total: varchar('total', { length: 255 }),
  prep: varchar('prep', { length: 255 }),
  cook: varchar('cook', { length: 255 }),
  serves: tinyint('serves'),
});

export const ratingsRelation = relations(info, ({ one }) => ({
  ratings: one(ratings, {
    fields: [info.recipeId],
    references: [ratings.recipeId],
  }),
}));

export const ratings = mysqlTable('ratings', {
  recipeId: varchar('recipeId', { length: 255 }).notNull(),
  userId: varchar('userId', { length: 255 }).notNull(),
  rating: tinyint('rating').notNull(),
});
