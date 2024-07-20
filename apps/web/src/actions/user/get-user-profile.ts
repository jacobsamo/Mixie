"use server";
import { authAction } from "../safe-action";
import * as z from "zod";

export const getUserProfile = authAction
  .schema(z.object({ userId: z.string() }))
  .action(async ({ parsedInput: params, ctx }) => {
    console.log("params, ctx", {
      params,
      ctx,
    });

    if (params.userId != ctx.user.id)
      throw new Error("You can't request another user's profile");

    const { data, error } = await ctx.supabase
      .from("profiles")
      .select()
      .eq("profile_id", params.userId)
      .single();

    if (error) throw new Error(error.message);

    console.log("Data, ", {
      data,
      params,
    });

    return data;
  });
