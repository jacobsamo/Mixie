import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  varchar,
  pgEnum,
  char,
  json,
} from "drizzle-orm/pg-core";
import type { Recipe } from "@/types";
import { recipes } from "./recipe";

export const recipe_versions = pgTable("recipe_versions", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  recipeId: char("recipeId", { length: 36 }).notNull(),
  changes: json("changes").$type<Partial<Recipe>>().notNull(),
  version: doublePrecision("version").notNull().default(1.1),
  updatedAt: timestamp("lastUpdated").defaultNow().notNull(),
  updatedBy: varchar("lastUpdatedBy", { length: 191 }).notNull(),
});

export const recipes_versionsRelation = relations(
  recipe_versions,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipe_versions.recipeId],
      references: [recipes.uid],
    }),
  })
);
