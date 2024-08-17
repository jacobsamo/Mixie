import { recipe_creation_type } from "@/types/zodSchemas";
import { z } from "zod";

export const requestSchema = z
  .object({
    creation_type: recipe_creation_type,
    image: z.string().nullable().default(null),
    link: z.string().url().nullable().default(null),
    content: z.string().nullable().default(null),
    title: z.string().nullable().default(null),
  })
  .superRefine((values, ctx) => {
    // if (data.image && data.link && data.content && data.title) {
    //   return "Only one field can be filled";
    // }
    if (!values.image && !values.link && !values.content && !values.title) {
      return "At least one field must be filled";
    }
    return true;
  });

export type CreateRecipeSchema = z.infer<typeof requestSchema>;
