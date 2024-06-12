"use server";
import { action } from "@/actions/safe-action";
import { recipeId } from "@/lib/utils";
import { constructJsonSchemaPrompt } from "@/lib/utils/ai-convert/zod-to-json";
import { getUser } from "@/lib/utils/getUser";
import { googleGenAi } from "@/server/ai/google_ai";
import { ratelimit } from "@/server/kv";
import { createClient } from "@/server/supabase/server";
import { NewRecipe, recipeSchema } from "@/types";
import { safeParseJSON } from "@ai-sdk/provider-utils";
import { generateText } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

const schema = z.object({
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

export const createRecipeFromText = action(schema, async (params) => {
  const supabase = createClient();
  const user = await getUser();

  if (!user) return "Need to be authenticated";

  const ip = headers().get("x-forwarded-for");

  const { success } = await ratelimit.limit(ip || user.id);

  if (!success) {
    throw new Error("Limit exceeded, wait a little bit before creating again");
  }

  const system_prompt = constructJsonSchemaPrompt({
    zodSchema: recipeImportSchema,
    schemaSuffix:
      "You MUST answer with a JSON object that matches the JSON schema above however if the image is not a recipe then return just null, start your response with { and end it with }",
  });

  const val = await generateText({
    model: googleGenAi("models/gemini-1.5-flash-latest"),
    system: system_prompt,
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

  const parseResult = safeParseJSON<z.infer<typeof recipeImportSchema>>({
    text: val.text,
    schema: recipeImportSchema,
  });

  if (!parseResult.success) {
    throw Error("Recipe couldn't be created, make sure the image is a recipe");
  }

  const ingredients = parseResult.value.ingredients.map((ingredient) => {
    return { text: ingredient };
  });

  const newRecipe: NewRecipe = {
    ...parseResult.value,
    id: recipeId(parseResult.value.title),
    ingredients: ingredients,
    created_by: user.id,
    version: "1.0",
    recipe_creation_type: "upload",
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
