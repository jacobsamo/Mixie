"use server";

import { action } from "@/actions/safe-action";
import { ingredientsSchema } from "@/actions/schema";
import { createClient } from "@mixie/supabase/server";
import { Ingredient, Recipe } from "@/types";
import { z } from "zod";
import logger from "@/lib/services/logger";

export const submitIngredients = action
  .schema(ingredientsSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();

    const cleanIngredients = parsedInput.ingredients.map(
      (ingredient: Ingredient) => {
        let ingredientText = ingredient.text.replace(/\s{2,}/g, " "); // remove extra spaces
        ingredientText =
          typeof ingredientText.charAt(0) === "string"
            ? ingredientText.charAt(0).toUpperCase() + ingredientText.slice(1)
            : ingredientText; // set the first letter to uppercase
        return {
          ...ingredient,
          text: ingredientText,
        };
      }
    );

    const { data, error } = await supabase
      .from("recipes")
      .update({
        ingredients: cleanIngredients,
      })
      .eq("recipe_id", parsedInput.recipe_id!)
      .select()
      .single();

    if (error) {
      logger.error(`Failed to update ingredients on recipe: ${error.message}`, {
        location: "recipe-form/submit-ingredients",
        message: JSON.stringify({
          parsedInput,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    return data as Recipe | null;
  });
