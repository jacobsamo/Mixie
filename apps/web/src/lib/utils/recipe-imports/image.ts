"use server";
import { recipeId } from "@/lib/utils";
import { constructJsonSchemaPrompt } from "@/lib/utils/ai-convert/zod-to-json";
import { googleGenAi } from "@/lib/server/ai/google_ai";
import { ratelimit } from "@/lib/server/kv";
import { NewRecipe, recipeSchema } from "@/types";
import { safeParseJSON } from "@ai-sdk/provider-utils";
import { generateText } from "ai";
import { z } from "zod";

const schema = z.object({
  user_id: z.string(),
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

export const createRecipeFromImage = async (
  params: z.infer<typeof schema>
): Promise<NewRecipe> => {
  const { success } = await ratelimit.limit(params.user_id);

  if (!success) {
    console.info(`Limit was exceeded for ${params.user_id}`);
    throw new Error("Limit exceeded, wait a little bit before creating again", {
      cause: 429,
    });
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
            text: "Extract the recipe in the image",
          },
          {
            type: "image",
            image: params.image,
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
    console.error(`Failed to parse JSON: ${parseResult.error.message}`, {
      location: "recipe-imports/image",
      message: JSON.stringify({
        image: params.image,
        text: val.text,
        error: parseResult.error.message,
      }),
      statusCode: 422,
    });
    throw Error("Recipe couldn't be created, make sure the image is a recipe", {
      cause: 422,
    });
  }

  const newRecipe: NewRecipe = {
    ...parseResult.value,
    id: recipeId(parseResult.value.title),
    created_by: params.user_id,
    version: "1.0",
    recipe_creation_type: "image",
  };

  return newRecipe;
};
