import * as z from "zod";

export const user_roleSchema = z.enum(["user", "admin"]);

export const profileEditSchema = z.object({
  bio: z.string().nullish(),
  created_at: z.string().optional(),
  email: z.string().nullish(),
  first_name: z.string().nullish(),
  full_name: z.string().nullish(),
  last_name: z.string().nullish(),
  profile_id: z.string(),
  profile_picture: z.string().nullish(),
  updated_at: z.string().optional(),
  user_name: z.string().nullish(),
  user_role: user_roleSchema.default("user"),
});
