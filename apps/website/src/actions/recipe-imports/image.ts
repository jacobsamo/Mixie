"use server";
import { action } from "@/actions/safe-action";
import { infoSchema } from "@/actions/schema";
import { createClient } from "@/server/supabase/server";
import { createVertex } from "@ai-sdk/google-vertex";
import { generateObject, generateText } from "ai";
import {
  GenerateContentRequest,
  GoogleGenerativeAI,
  InlineDataPart,
  Part,
} from "@google/generative-ai";
import { VertexAI } from "@google-cloud/vertexai";
import { env } from "env";

const genAi = new GoogleGenerativeAI(env.GOOGLE_AI_API_KEY);

import { z } from "zod";
import { contents } from "cheerio/lib/api/traversing";

const schema = z.object({
  image: z.string(),
});

export const createRecipeFromImage = action(schema, async (params) => {
  // const supabase = createClient();

  console.log("Sending request", params);
  const settings = {
    system: `\
    You are a helful asssitant in Mixie that helps you fill out information about recipes, if the image is not clear or a recipe is not available, throw an error.\
    `,

    messages: [
      {
        role: "user",
        content: [
          // {
          //   type: "text",
          //   text: ,
          // },
          {
            type: "image",
            image: params.image,
          },
        ],
      },
    ],
  };

  const geminiProVisionConfig = {
    model: "gemini-pro-vision",
    // systemInstruction: settings.system,
    // generationConfig: {
    //   responseMimeType: "application/json",
    // },
  };

  const geminiFlashConfig = {
    model: "gemini-1.5-flash",
    systemInstruction: settings.system,
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  const model = genAi.getGenerativeModel(geminiFlashConfig);
  const filePart: InlineDataPart = {
    inlineData: { data: params.image, mimeType: "image/jpeg" },
  };
  const textPart = {
    text: "Convert the recipe in the image to recipe.org/Recipe schema with ingredients as string[] and steps HowToStep",
  };
  const request: GenerateContentRequest = {
    contents: [
      {
        role: "user",
        parts: [textPart, filePart],
      },
    ],
  };

  const val = await model.generateContent(request);

  console.log(
    "Response",
    JSON.stringify({
      val: val.response,
      text: val.response.text,
    })
  );

  return val;
});
