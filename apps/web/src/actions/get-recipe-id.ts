"use server";

import { authAction } from "@/actions/safe-action";
import logger from "@/lib/services/logger";
import { Recipe } from "@/types";
import { z } from "zod";

export const getRecipeById = authAction
  .schema(
    z.object({
      recipe_id: z.string(),
    })
  )
  .metadata({ name: "get-recipe-id" })
  .action(async ({ parsedInput, ctx: { user, supabase } }) => {
    const { data: foundRecipe, error } = await supabase
      .from("recipes")
      .select()
      .eq("created_by", user.id)
      .eq("recipe_id", parsedInput.recipe_id)
      .single();

    if (error) {
      logger.error(`Failed to get recipe: ${error.message}`, {
        location: "get-recipe-id",
        message: JSON.stringify({
          parsedInput,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    return foundRecipe as Recipe | null;
  });
