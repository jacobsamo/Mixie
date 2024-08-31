"use server";
import { authAction } from "@/actions/safe-action";
import logger from "@/lib/services/logger";
import { Tables, TablesInsert } from "@mixie/supabase/types";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const schema = z.object({
  bookmark_id: z.string(),
  collectionIds_to_add: z.array(z.string()).optional(),
  collectionIds_to_remove: z.array(z.string()).optional(),
});

export const updateBookmark = authAction
  .schema(schema)
  .metadata({ name: "update-bookmark" })
  .action(async ({ parsedInput: params, ctx }) => {
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
        const data = await ctx.supabase
          .from("bookmark_link")
          .delete()
          .eq("bookmark_id", params.bookmark_id)
          .eq("collection_id", collectionId);

        logger.warn("Error deleting a bookmark link", {
          location: "create-bookmark.ts",
          message: JSON.stringify(data),
        });
      });
    }

    const { data: bookmarkLinksData } = await ctx.supabase
      .from("bookmark_link")
      .select()
      .eq("bookmark_id", params.bookmark_id);

    revalidateTag(`bookmarks_${ctx.user.id}`);

    console.log("Bookmark links: ", {
      links: bookmarkLinksData,
      parsed: params,
    });

    return {
      bookmarkLinks: bookmarkLinksData,
    };
  });
