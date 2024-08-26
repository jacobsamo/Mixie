"use server";
import { authAction } from "@/actions/safe-action";
import logger from "@/lib/services/logger";
import { Tables, TablesInsert } from "@mixie/supabase/types";
import * as z from "zod";

const schema = z.object({
  recipeId: z.string(),
  collectionIds: z.array(z.string()).optional(),
});

export const getUserData = authAction
  .schema(schema)
  .metadata({ name: "create-bookmark" })
  .action(async ({ parsedInput: params, ctx }) => {
    const newBookmark: TablesInsert<"bookmarks"> = {
      recipe_id: params.recipeId,
      user_id: ctx.user.id,
    };
    const { data: bookmark, error } = await ctx.supabase
      .from("bookmarks")
      .insert(newBookmark)
      .select()
      .single();

    if (error) throw new Error(`Failed to create bookmark ${error.message}`);
      

    let bookmarkLinks: Tables<"bookmark_link">[] | null = null;
    if (params.collectionIds) {
      params.collectionIds.forEach(async (collectionId) => {
        const bookmarkLink: TablesInsert<"bookmark_link"> = {
          bookmark_id: bookmark.bookmark_id,
          collection_id: collectionId,
          user_id: ctx.user.id,
        };

        const { error } = await ctx.supabase
          .from("bookmark_link")
          .insert(bookmarkLink);
        logger.warn("Error creating a bookmark link", {
          location: "create-bookmark.ts",
          message: JSON.stringify(error),
        });
      });
    }

    const { data: bookmarkLinksData } = await ctx.supabase
      .from("bookmark_link")
      .select()
      .eq("bookmark_id", bookmark.bookmark_id);

    return {
      bookmark,
      bookmarkLinks: bookmarkLinksData,
    };
  });
