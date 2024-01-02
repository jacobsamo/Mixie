import { mysqlEnum } from "drizzle-orm/mysql-core";

export const unit = mysqlEnum("unit", [
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
]);

export const amount = mysqlEnum("amount", [
  "not_set",
  "1/8",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "3/4",
]);

export const difficulty_level = mysqlEnum("difficulty_level", [
  "not_set",
  "easy",
  "medium",
  "hard",
]);

export const sweet_savoury = mysqlEnum("sweet_savoury", [
  "not_set",
  "sweet",
  "savoury",
  "both",
]);

export const dietary = mysqlEnum("dietary", [
  "none",
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten_free",
  "dairy_free",
  "nut_free",
  "egg_free",
]);

export const mealTime = mysqlEnum("mealTime", [
  "not_set",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "snack"
]);

// auth

export const theme = mysqlEnum("theme", ["system", "light", "dark"]);
export const fonts = mysqlEnum("fonts", [
  "default",
  "open_dyslexic",
  "monospace",
  "serif",
  "sans_serif",
]);
export const diet = mysqlEnum("diet", [
  "none",
  "vegetarian",
  "vegan",
  "pescatarian",
  "gluten_free",
  "dairy_free",
  "nut_free",
  "egg_free",
]);

export const allergens = mysqlEnum("allergens", [
  "none",
  "gluten",
  "dairy",
  "nuts",
  "eggs",
  "soya",
  "fish",
  "shellfish",
  "sesame",
  "celery",
  "mustard",
  "lupin",
  "molluscs",
]);

export const loveCooking = mysqlEnum("loveCooking", [
  "not_set",
  "hate_it",
  "dislike_it",
  "neutral",
  "like_it",
  "love_it",
]);

export const averageTimeToCook = mysqlEnum("averageTimeToCook", [
  "not_set",
  "less_than_15",
  "15_to_30",
  "30_to_45",
  "45_to_60",
  "60_to_90",
  "90_to_120",
  "more_than_120",
]);
