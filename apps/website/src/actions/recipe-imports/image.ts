"use server";
import { action } from "@/actions/safe-action";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { createClient } from "@/server/supabase/server";
import { NewRecipe, recipeSchema } from "@/types";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { env } from "env";
import { z } from "zod";

const googleGenAi = createGoogleGenerativeAI({ apiKey: env.GOOGLE_AI_API_KEY });

const schema = z.object({
  image: z.string(),
});

const recipeImportSchema = recipeSchema.pick({
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
});

export const createRecipeFromImage = action(schema, async (params) => {
  const supabase = createClient();
  const user = await getUser();

  if (!user) return "Need to be authenticated";

  const val = await generateObject({
    model: googleGenAi("models/gemini-1.5-flash-latest"),
    schema: recipeImportSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Convert the recipe in the image to recipe.org/Recipe schema with ingredients as string[] and steps HowToStep",
          },
          {
            type: "image",
            image: params.image,
          },
        ],
      },
    ],
  });

  const { object } = val;

  const newRecipe: NewRecipe = {
    ...object,
    id: recipeId(object.title),
    created_by: user.id,
    version: "1.0",
  };

  const { data } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select()
    .single();

  console.log("Response", {
    object: JSON.stringify(object),
    recipe_created: JSON.stringify(data),
  });

  return data?.recipe_id;
});
