import { relations, sql } from "drizzle-orm";
import {
  char,
  double,
  json,
  mysqlTable,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";
import type { Recipe } from "../types";
import { users } from "./auth";
import { recipes } from "./recipe";

export const recipe_versions = mysqlTable("recipe_versions", {
  uid: char("uid", { length: 36 }).primaryKey().notNull(),
  recipeId: char("recipeId", { length: 36 }).notNull(),
  changes: json("changes").$type<Partial<Recipe>>().notNull(),
  version: double("version").notNull(),
  lastUpdated: timestamp("lastUpdated")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  updatedBy: varchar("lastUpdatedBy", { length: 191 }).notNull(),
});

export const recipes_versionsRelation = relations(
  recipe_versions,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipe_versions.recipeId],
      references: [recipes.uid],
    }),
    user: one(users, {
      fields: [recipe_versions.updatedBy],
      references: [users.id],
    }),
  })
);
