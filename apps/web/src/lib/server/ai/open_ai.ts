import { createOpenAI } from "@ai-sdk/openai";
import { env } from "env";

export const openAI = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
  compatibility: "strict",
});
