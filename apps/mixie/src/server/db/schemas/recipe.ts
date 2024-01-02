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
import { Ingredient, Recipe, Step } from "../types";
import { recipe_versions } from "./versions";
import { users } from "./auth";

type SelectValue = {
  label: string;
  value: string;
};

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
  dietary: json("dietary").$type<SelectValue>(),
  allergens: json("allergens"),
  sweet_savoury: json("sweet_savoury").$type<SelectValue>(),
  difficulty_level: json("difficulty_level").$type<SelectValue>(),
  cuisine: json("cuisine").$type<SelectValue>(),
  isPublic: boolean("isPublic").default(false).notNull(),

  // users
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
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
  versions: many(recipe_versions),
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
  isPublic: boolean("isPublic").default(false).notNull(),
  rating: tinyint("rating").default(0),

  // users
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
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



export const bookmarks = mysqlTable("bookmarks", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  recipeId: char("recipeId", { length: 36 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  collections: json("collections"),
});

export const bookmarksRelation = relations(bookmarks, ({ one }) => ({
  recipe: one(info, {
    fields: [bookmarks.recipeId],
    references: [info.recipeId],
  }),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));
