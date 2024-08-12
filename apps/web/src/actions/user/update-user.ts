"use server";
import logger from "@/lib/services/logger";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { revalidateTag } from "next/cache";
import { authAction } from "../safe-action";

export const updateUser = authAction
  .schema(profileEditSchema)
  .metadata({ name: "update-user" })
  .action(async ({ parsedInput: params, ctx }) => {
    if (params.profile_id !== ctx.user.id)
      throw new Error("You can't edit another user's profile");

    const {
      data: { user },
      error: updateUserError,
    } = await ctx.supabase.auth.updateUser({
      data: {
        ...params,
      },
    });

    if (updateUserError) {
      logger.error(`Failed to update user: ${updateUserError.message}`, {
        location: "user/update-user",
        message: JSON.stringify({
          params,
          updateUserError,
        }),
        statusCode: 500,
      });
      throw new Error(updateUserError.message);
    }

    if (!user) {
      logger.error(`User not found: ${params.profile_id}`, {
        location: "user/update-user",
        message: "Failed to get user",
        statusCode: 500,
      });
      throw new Error("User not found");
    }

    const { data, error } = await ctx.supabase
      .from("profiles")
      .update(params)
      .eq("profile_id", params.profile_id)
      .single();

    if (error) {
      logger.error(`Failed to update profile: ${error.message}`, {
        location: "user/update-user",
        message: JSON.stringify({
          params,
          error,
        }),
        statusCode: 500,
      });
      throw new Error(error.message);
    }

    revalidateTag(user.id);

    return "Updated user successfully";
  });
