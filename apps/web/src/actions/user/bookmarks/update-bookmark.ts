"use server";
import { authAction } from "@/actions/safe-action";
import logger from "@/lib/services/logger";
import { Tables, TablesInsert } from "@mixie/supabase/types";
import * as z from "zod";

const schema = z.object({
  bookmark_id: z.string(),
  collectionIds_to_add: z.array(z.string()).optional(),
  collectionIds_to_remove: z.array(z.string()).optional(),
});

export const getUserData = authAction
  .schema(schema)
  .metadata({ name: "get-user-data" })
  .action(async ({ parsedInput: params, ctx }) => {
    let bookmarkLinks: Tables<"bookmark_link">[] | null = null;
    if (params.collectionIds_to_add) {
      params.collectionIds_to_add.forEach(async (collectionId) => {
        const bookmarkLink: TablesInsert<"bookmark_link"> = {
          bookmark_id: params.bookmark_id,
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

    if (params.collectionIds_to_remove) {
      params.collectionIds_to_remove.forEach(async (collectionId) => {
        const bookmarkLink: TablesInsert<"bookmark_link"> = {
          bookmark_id: params.bookmark_id,
          collection_id: collectionId,
          user_id: ctx.user.id,
        };

        const { error } = await ctx.supabase
          .from("bookmark_link")
          .delete()
          .match({
            bookmark_id: params.bookmark_id,
            collection_id: collectionId,
          });

        logger.warn("Error deleting a bookmark link", {
          location: "create-bookmark.ts",
          message: JSON.stringify(error),
        });
      });
    }

    const { data: bookmarkLinksData } = await ctx.supabase
      .from("bookmark_link")
      .select()
      .eq("bookmark_id", params.bookmark_id);

    return {
      bookmarkLinks: bookmarkLinksData,
    };
  });
