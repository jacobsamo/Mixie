"use server";
import { getBookmarkData } from "@mixie/supabase/cached-queries";
import * as z from "zod";
import { authAction } from "../safe-action";

export const getUserData = authAction
  .schema(z.object({ userId: z.string() }))
  .metadata({ name: "get-user-data" })
  .action(async ({ parsedInput: params, ctx }) => {
    if (params.userId != ctx.user.id)
      throw new Error("You can't request another user's data");

    const data = await getBookmarkData();

    console.log('Data: ', data);

    return {
      bookmarks: data?.bookmarks ?? null,
      bookmark_links: data?.bookmark_links ?? null,
      collections: data?.collections ?? null,
    };
  });
