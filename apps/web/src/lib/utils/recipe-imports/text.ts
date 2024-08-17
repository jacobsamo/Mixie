"use server";
import { openAI } from "@/lib/server/ai/open_ai";
import { ratelimit } from "@/lib/server/kv";
import logger from "@/lib/services/logger";
import { recipeId } from "@/lib/utils";
import { NewRecipe, recipeSchema } from "@/types";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  user_id: z.string(),
  text: z.string(),
});

const recipeImportSchema = recipeSchema
  .pick({
    category: true,
    title: true,
    cook_time: true,
    prep_time: true,
    ingredients: true,
    steps: true,
    keywords: true,
    description: true,
    cuisine: true,
    sweet_savoury: true,
    yield: true,
    meal_time: true,
    notes: true,
    difficulty_level: true,
    suitable_for_diet: true,
  })
  .extend({
    ingredients: z.string().array(),
  });

export const createRecipeFromText = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const { success } = await ratelimit.limit(params.user_id);

  if (!success) {
    logger.warn(`Limit was exceeded for ${params.user_id}`, {
      location: "recipe-imports/image",
    });
    throw new Error("Limit exceeded, wait a little bit before creating again", {
      cause: 429,
    });
  }

  const { object } = await generateObject({
    model: openAI("gpt-4o-mini-2024-07-18"),
    schemaName: "Recipe",
    schemaDescription:
      "Extract the recipe in the image if not a recipe then return null",
    schema: recipeImportSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: params.text,
          },
        ],
      },
    ],
  });

  const ingredients = object.ingredients.map((ingredient) => {
    return { text: ingredient };
  });

  const newRecipe: NewRecipe = {
    ...object,
    id: recipeId(object.title),
    ingredients: ingredients,
    created_by: params.user_id,
    version: "1.0",
    recipe_creation_type: "upload",
  };

  return newRecipe;
};
