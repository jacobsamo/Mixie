"use server";
import { profileEditSchema } from "@/types/zodSchemas/profile";
import { authAction } from "../safe-action";
import { revalidateTag } from "next/cache";

export const updateUser = authAction
  .schema(profileEditSchema)
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
      throw new Error(updateUserError.message);
    }

    if (!user) throw new Error("User not found");

    const { data, error } = await ctx.supabase
      .from("profiles")
      .update(params)
      .eq("profile_id", params.profile_id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    revalidateTag(user.id);

    return "Updated user successfully";
  });
