import { relations, sql } from "drizzle-orm";
import {
  boolean,
  char,
  double,
  json,
  mysqlEnum,
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
import {
  allergens,
  dietary,
  difficulty_level,
  mealTime,
  sweet_savoury,
} from "./enums";

// Recipes
export const recipes = mysqlTable("recipes", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  id: varchar("id", { length: 191 }).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  imgUrl: text("imgUrl"),
  imgAlt: text("imgAlt"),
  description: text("description"),
  notes: text("notes"),
  steps: json("steps").$type<Step[]>(),
  ingredients: json("ingredients").$type<Ingredient[]>(),
  version: double("version").default(1.0),
  source: varchar("source", { length: 191 }),
  total: varchar("total", { length: 191 }),
  prep: varchar("prep", { length: 191 }),
  cook: varchar("cook", { length: 191 }),
  serves: tinyint("serves"),
  rating: tinyint("rating").default(0),

  // little extras for searching
  dietary: dietary.default("none"),
  allergens: allergens.default("none"),
  sweet_savoury: sweet_savoury.default("not_set"),
  difficulty_level: difficulty_level.default("not_set"),
  isPublic: boolean("isPublic").default(false).notNull(),
  keywords: json("keywords").$type<{ value: string }[]>(),
  ingredientsList: json("ingredients").$type<string[]>(),
  mealTime: mealTime.default("not_set"),

  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
});

export const recipesRelation = relations(recipes, ({ one, many }) => ({
  ratings: many(ratings),
  versions: many(recipe_versions),
}));

// Ratings
export const ratings = mysqlTable("ratings", {
  recipeId: char("recipeId", { length: 36 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  rating: tinyint("rating").notNull().default(0),
});

export const ratingsRelation = relations(ratings, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ratings.recipeId],
    references: [recipes.uid],
  }),
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
}));

export const bookmarks = mysqlTable("bookmarks", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  recipeId: char("recipeId", { length: 36 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  collections: json("collections"),
});

export const bookmarksRelation = relations(bookmarks, ({ one }) => ({
  recipe: one(recipes, {
    fields: [bookmarks.recipeId],
    references: [recipes.uid],
  }),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));
