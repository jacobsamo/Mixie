import { relations, sql } from "drizzle-orm";
import {
  boolean,
  char,
  double,
  json,
  mysqlTable,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
// imoport
import { Ingredient, SelectValue, Step } from "../types";

// Recipes
export const recipes = mysqlTable("recipes", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  id: varchar("id", { length: 191 }).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: text("description"),
  notes: text("notes"),
  steps: json("steps").$type<Step[]>(),
  ingredients: json("ingredients").$type<Ingredient[]>(),
  mealTime: json("mealTime"),
  version: double("version").default(1.0),
  source: varchar("source", { length: 191 }),

  // little extras for searching
  dietary: json("dietary"),
  allergens: json("allergens"),
  sweet_savoury: json("sweet_savoury"),
  difficulty_level: json("difficulty_level"),
  cuisine: json("cuisine"),
  isPublic: boolean("isPublic").default(false),

  // users
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
  createByName: varchar("createByName", { length: 191 }).notNull(),
  lastUpdated: timestamp("lastUpdated")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
  lastUpdatedBy: varchar("lastUpdatedBy", { length: 191 }).notNull(),
  lastUpdatedByName: varchar("lastUpdatedByName", { length: 191 }).notNull(),
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
export const info = mysqlTable("info", {
  recipeId: char("recipeId", { length: 36 }).primaryKey().notNull(),
  id: varchar("id", { length: 191 }).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  imgUrl: text("imgUrl"),
  imgAlt: text("imgAlt"),
  total: varchar("total", { length: 191 }),
  prep: varchar("prep", { length: 191 }),
  cook: varchar("cook", { length: 191 }),
  serves: tinyint("serves"),
  keywords: json("keywords").$type<{ value: string }[]>(),
  ingredients: json("ingredients").$type<string[]>(),
  isPublic: boolean("isPublic").default(false),
  rating: tinyint("rating").default(0),

  // users
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
  createByName: varchar("createByName", { length: 191 }).notNull(),
  lastUpdated: timestamp("lastUpdated")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
  lastUpdatedBy: varchar("lastUpdatedBy", { length: 191 }).notNull(),
  lastUpdatedByName: varchar("lastUpdatedByName", { length: 191 }).notNull(),
});

export const infoRelations = relations(recipes, ({ one }) => ({
  info: one(info, {
    fields: [recipes.uid],
    references: [info.recipeId],
  }),
}));

// Ratings
export const ratings = mysqlTable("ratings", {
  recipeId: char("recipeId", { length: 36 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  rating: tinyint("rating").notNull().default(0),
});

export const ratingsRelation = relations(info, ({ one }) => ({
  ratings: one(ratings, {
    fields: [info.recipeId],
    references: [ratings.recipeId],
  }),
}));
