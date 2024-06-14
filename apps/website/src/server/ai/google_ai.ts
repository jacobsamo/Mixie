import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "env";

export const googleGenAi = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_AI_API_KEY,
});
