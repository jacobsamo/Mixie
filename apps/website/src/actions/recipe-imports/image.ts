"use server";
import { action } from "@/actions/safe-action";
import { recipeId } from "@/lib/utils";
import { getUser } from "@/lib/utils/getUser";
import { googleGenAi } from "@/server/ai/google_ai";
import { ratelimit } from "@/server/kv";
import { createClient } from "@/server/supabase/server";
import { NewRecipe, recipeSchema } from "@/types";
import { generateObject } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
  image: z.string().base64(),
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

  const ip = headers().get("x-forwarded-for");

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error("Limit exceeded, wait a little bit before creating again");
  }

  console.log("starting ai request");

  const val = await generateObject({
    model: googleGenAi("models/gemini-1.5-flash-latest"),
    system: "if not a recipe return null",
    schema: z.union([recipeImportSchema, z.null()]),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Convert the recipe in the image",
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

  console.log('Return val: ', val);

  const newRecipe: NewRecipe = {
    ...object,
    id: recipeId(object.title),
    created_by: user.id,
    version: "1.0",
  };

  const { data, error } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select("recipe_id")
    .single();

  if (error) {
    return new Error("Something went wrong");
  }

  return data?.recipe_id;
});
