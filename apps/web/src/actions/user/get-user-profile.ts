"use server";
import logger from "@/lib/services/logger";
import * as z from "zod";
import { authAction } from "../safe-action";

export const getUserProfile = authAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ name: "get-user-profile" })
  .action(async ({ parsedInput: params, ctx }) => {
    if (params.userId != ctx.user.id)
      throw new Error("You can't request another user's profile");

    const { data, error } = await ctx.supabase
      .from("profiles")
      .select()
      .eq("profile_id", params.userId)
      .single();

    if (error) {
      logger.error(`Failed to get user profile: ${error.message}`, {
        location: "user/get-user-profile",
        message: JSON.stringify({
          params,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    return data;
  });
