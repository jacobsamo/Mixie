"use server";
import logger from "@/lib/services/logger";
import * as z from "zod";
import { authAction } from "../safe-action";

export const getUserData = authAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ name: "get-user-data" })
  .action(async ({ parsedInput: params, ctx }) => {
    if (params.userId != ctx.user.id)
      throw new Error("You can't request another user's profile");

    const { data: bookmark_links, error: bookmarkLinkError } =
      await ctx.supabase.from("bookmark_link").select("*");

    const { data: bookmarks, error: bookmarkError } = await ctx.supabase
      .from("bookmarks")
      .select("*");

    const { data: collections, error: collectionError } = await ctx.supabase
      .from("collections")
      .select("*");

    if (collectionError || bookmarkError || bookmarkLinkError) {
      const errorMessage =
        collectionError || bookmarkError || bookmarkLinkError;
      logger.error(`Failed to get user profile: ${errorMessage!.message}`, {
        location: "user/get-user-profile",
        message: JSON.stringify({
          params,
          errorMessage,
        }),
        statusCode: 500,
      });
      throw new Error(errorMessage!.message);
    }

    return {
      bookmark_links,
      bookmarks,
      collections,
    };
  });
