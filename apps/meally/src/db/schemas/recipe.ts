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
import { mealTime, dietary, difficulty_level, sweet_savoury } from './enums';

// Recipes
export const recipes = mysqlTable('recipes', {
  uid: char('uid', { length: 36 })
    .primaryKey()
    .notNull()
    .references(() => recipes.uid, { onDelete: 'cascade' }),
  id: varchar('id', { length: 191 }).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: text('description'),
  notes: text('notes'),
  steps: json('steps'),
  ingredients: json('ingredients'),
  mealTime: mealTime.default('not_set'),
  version: tinytext('version').default('1.0.0'),

  // little extras for searching
  dietary: dietary.default('none'),
  allergens: json('allergens'),
  sweet_savoury: sweet_savoury.default('not_set'),
  difficulty_level: difficulty_level.default('not_set'),
  cuisine: json('cuisine'),
  isPublic: boolean('isPublic').default(false).notNull(),

  // users
  createByName: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),

  lastUpdated: timestamp('lastUpdated', { mode: 'date' })
    .notNull()
    .defaultNow()
    .onUpdateNow(),
  lastUpdatedBy: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  lastUpdatedByName: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  createdBy: varchar('createdBy', { length: 191 }).notNull(),
});

export const recipesRelation = relations(recipes, ({ one, many }) => ({
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
  ratings: one(ratings, {
    fields: [recipes.uid],
    references: [ratings.recipeId],
  }),
}));

// Info
export const info = mysqlTable('info', {
  recipeId: char('recipeId', { length: 36 })
    .primaryKey()
    .notNull()
    .references(() => recipes.uid, { onDelete: 'cascade' }),
  id: varchar('id', { length: 191 }).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  imgUrl: text('imgUrl'),
  imgAlt: text('imgAlt'),
  total: varchar('total', { length: 191 }),
  prep: varchar('prep', { length: 191 }),
  cook: varchar('cook', { length: 191 }),
  serves: tinyint('serves'),
  keywords: json('keywords'),
  ingredients: json('ingredients'),
  isPublic: boolean('isPublic').default(false),
  rating: tinyint('rating').default(0),

  // users
  createByName: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  lastUpdated: timestamp('lastUpdated').defaultNow().onUpdateNow(),
  lastUpdatedBy: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  lastUpdatedByName: varchar('lastUpdatedBy', { length: 191 }).notNull(),
  createdBy: varchar('createdBy', { length: 191 }).notNull(),
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
  rating: tinyint('rating').notNull().default(0),
});

export const ratingsRelation = relations(info, ({ one }) => ({
  ratings: one(ratings, {
    fields: [info.recipeId],
    references: [ratings.recipeId],
  }),
}));
