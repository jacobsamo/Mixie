import { createRecipeFromImage } from "@/actions/recipe-imports/image";
import { createRecipeFromLink } from "@/actions/recipe-imports/link";
import { createRecipeFromText } from "@/actions/recipe-imports/text";
import { createRecipeFromTitle } from "@/actions/recipe-imports/title";

import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import * as z from "zod";

export const schema = z.object({
  image: z.string().base64().nullable().default(null),
  link: z.string().url().nullable().default(null),
  content: z.string().nullable().default(null),
  title: z.string().nullable().default(null),
}).superRefine((values, ctx) => {
  // if (data.image && data.link && data.content && data.title) {
  //   return "Only one field can be filled";
  // }
  if (!values.image && !values.link && !values.content && !values.title) {
    return "At least one field must be filled";
  }
  return true;
})

export type CreateRecipeSchema = z.infer<typeof schema>;

