import * as z from "zod";
export * from "./recipes";
export * from "./enums";

const feedbackType = z.enum(["bug", "feature", "other"]);

const feedback = z.object({
  created_at: z.string(),
  description: z.string(),
  feedback_id: z.string(),
  page: z.string().nullable(),
  title: z.string(),
  type: feedbackType.default("bug"),
  user_email: z.string(),
  user_id: z.string().nullable(),
});

export const feedbackSchema = feedback.extend({
  created_at: z.string().optional(),
  feedback_id: z.string().optional(),
  page: z.string().nullish(),
  type: feedbackType.default("bug"),
  user_email: z.string(),
  user_id: z.string().nullish(),
});

export const bookmarkRouteSchema = z.object({
  collections: z.string().array().nullish(),
  notes: z.string().nullish(),
  rating: z.number().nullish(),
  tags: z.string().array().nullish(),
});
