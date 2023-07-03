import {
  datetime,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const recipes = mysqlTable('recipes', {
  uid: serial('uid').primaryKey().notNull(),
  id: text('id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  notes: text('notes'),
  info: json('info'),
  ingredients: json('ingredients'),
  steps: json('steps'),
  keywords: json('keywords'),
  dietary: json('dietary'),
  allergens: json('allergens'),
  sweet_savoury: json('sweet_savoury'),
  mealTime: json('mealTime'),
  version: int('version').notNull(),
  createdAt: datetime('createdAt').notNull().default(new Date()),
  lastUpdated: datetime('lastUpdated').notNull().default(new Date()),
  lastUpdatedBy: text('lastUpdatedBy').notNull(),
  createdBy: text('createdBy').notNull(),
  // user          User     @relation(fields: [createdBy], references: [id])

  madeRecipe: int('madeRecipe'),
  savedRecipe: int('savedRecipe'),
  // Recipe GroupRecipe[]
  // Bookmark    Bookmark[]
});
