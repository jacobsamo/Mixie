import { z } from "zod";

export const recipe_creation_type = z
  .enum(["title", "image", "link", "upload"])
  .default("title");

export const unit = z
  .enum([
    "not_set",
    "grams",
    "kg",
    "cup",
    "ml",
    "litre",
    "tsp",
    "tbsp",
    "pinch",
    "item",
    "handful",
    "slice",
    "piece",
    "can",
    "bunch",
    "bottle",
  ])
  .default("not_set");

export const amount = z
  .enum(["not_set", "1/8", "1/2", "1/3", "2/3", "1/4", "3/4"])
  .default("not_set");

export const difficulty_level = z
  .enum(["not_set", "easy", "medium", "hard"])
  .default("not_set");

export const sweet_savoury = z
  .enum(["not_set", "sweet", "savoury", "both"])
  .default("not_set");

export const dietary = z
  .enum([
    "none",
    "vegetarian",
    "vegan",
    "pescatarian",
    "gluten_free",
    "dairy_free",
    "nut_free",
    "egg_free",
  ])
  .default("none");

export const mealTime = z
  .enum(["not_set", "breakfast", "lunch", "dinner", "snack", "dessert"])
  .default("not_set");
