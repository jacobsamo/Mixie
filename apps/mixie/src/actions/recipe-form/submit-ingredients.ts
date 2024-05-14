"use server";

import { action } from "@/actions/safe-action";
import { ingredientsSchema } from "@/actions/schema";

export const submitIngredients = action(ingredientsSchema, async (params) => {
  return params;
});
