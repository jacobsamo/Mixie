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
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const googleGenAi = createGoogleGenerativeAI({ apiKey: env.GOOGLE_AI_API_KEY });

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "500 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

const schema = z.object({
  image: z.string().base64(),
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

export const createRecipeFromImage = action(schema, async (params) => {
  const supabase = createClient();
  const user = await getUser();

  if (!user) return "Need to be authenticated";

  const ip = headers().get("x-forwarded-for");

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error("Rate limit exceeded");
  }

  console.log("starting ai request");

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

  const ingredients = object.ingredients.map((ingredient) => {
    return { text: ingredient };
  });

  const newRecipe: NewRecipe = {
    ...object,
    id: recipeId(object.title),
    created_by: user.id,
    version: "1.0",
    ingredients: ingredients,
  };

  const { data } = await supabase
    .from("recipes")
    .insert(newRecipe)
    .select()
    .single();

  return data?.recipe_id;
});
