import { relations } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  varchar,
  pgEnum,
  char,
  json,
  smallint,
  boolean
} from "drizzle-orm/pg-core";
// imoport
import { ImageAttributes, Ingredient, SelectValue, Step } from "@/types";
import { difficulty_level, sweet_savoury } from "./enums";
import { recipe_versions } from "./versions";

// Recipes
export const recipes = pgTable("recipes", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  id: varchar("id", { length: 191 }).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  imageUrl: text("imageUrl"),
  imageAttributes: json("imageAttributes").$type<ImageAttributes>(),
  description: text("description"),
  notes: text("notes"),
  steps: json("steps").$type<Step[]>(),
  ingredients: json("ingredients").$type<Ingredient[]>(),
  version: doublePrecision("version").default(1.0),
  source: varchar("source", { length: 191 }),
  total: varchar("total", { length: 191 }),
  prep: varchar("prep", { length: 191 }),
  cook: varchar("cook", { length: 191 }),
  serves: smallint("serves"),
  rating: smallint("rating").default(0),

  // little extras for searching
  dietary: json("dietary"),
  allergens: json("allergens"),
  mealTime: json("mealTime"),
  sweet_savoury: sweet_savoury('sweet_savoury').default("not_set"),
  difficulty_level: difficulty_level('difficulty_level').default("not_set"),
  isPublic: boolean("isPublic").default(false).notNull(),
  keywords: json("keywords").$type<{ value: string }[]>(),
  ingredientsList: json("ingredientsList").$type<string[]>(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  createdBy: varchar("createdBy", { length: 191 }).notNull(),
});

export const recipesRelation = relations(recipes, ({ one, many }) => ({
  ratings: many(ratings),
  versions: many(recipe_versions),
}));

// Ratings
export const ratings = pgTable("ratings", {
  recipeId: char("recipeId", { length: 36 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  rating: smallint("rating").notNull().default(0),
});

export const ratingsRelation = relations(ratings, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ratings.recipeId],
    references: [recipes.uid],
  }),
}));

export const bookmarks = pgTable("bookmarks", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  recipeId: char("recipeId", { length: 36 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  collections: text("collections"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const bookmarksRelation = relations(bookmarks, ({ one }) => ({
  recipe: one(recipes, {
    fields: [bookmarks.recipeId],
    references: [recipes.uid],
  }),
}));

export const collections = pgTable("collections", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: text("description"),
  userId: varchar("userId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});


