import { recipeSchema } from "@/types";
import * as z from "zod";


export const infoSchema = recipeSchema.pick({
  title: true,
  source: true,
  prep_time: true,
  cook_time: true,
  yield: true,
  description: true,
  image_url: true,
  image_attributes: true,
});

export const ingredientsSchema = recipeSchema.pick({
  ingredients: true,
});

export const stepsSchema = recipeSchema.pick({
  steps: true,
});

export const detailsSchema = recipeSchema.pick({
  difficulty_level: true,
  keywords: true,
  meal_time: true,
  notes: true,
  public: true,
  sweet_savoury: true,
});