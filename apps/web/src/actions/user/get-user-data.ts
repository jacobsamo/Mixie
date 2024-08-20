"use server";
import logger from "@/lib/services/logger";
import * as z from "zod";
import { authAction } from "../safe-action";
import { getBookmarkData } from "@mixie/supabase/queries";

export const getUserData = authAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ name: "get-user-data" })
  .action(async ({ parsedInput: params, ctx }) => {
    if (params.userId != ctx.user.id)
      throw new Error("You can't request another user's data");

    const data = await getBookmarkData();

    return {
      bookmarks: data?.bookmarks ?? null,
      bookmark_links: data?.bookmark_links ?? null,
      collections: data?.collections ?? null,
    };
  });
