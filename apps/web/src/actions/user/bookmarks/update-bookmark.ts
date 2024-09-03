"use server";
import { authAction } from "@/actions/safe-action";
import logger from "@/lib/services/logger";
import { Tables, TablesInsert } from "@mixie/supabase/types";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const schema = z.object({
  bookmark_id: z.string(),
  recipe_id: z.string(),
  collectionIds_to_add: z.array(z.string()).optional(),
  collectionIds_to_remove: z.array(z.string()).optional(),
});

export const updateBookmark = authAction
  .schema(schema)
  .metadata({ name: "update-bookmark" })
  .action(async ({ parsedInput: params, ctx }) => {
    let bookmarkLinksCreated: Tables<"bookmark_link">[] | null = null;
    let bookmarkLinksDeleted: string[] | null = null;

    if (params.collectionIds_to_add) {
      const addPromises = params.collectionIds_to_add.map(
        async (collectionId) => {
          const bookmarkLink: TablesInsert<"bookmark_link"> = {
            bookmark_id: params.bookmark_id,
            collection_id: collectionId,
            recipe_id: params.recipe_id,
            user_id: ctx.user.id,
          };

          const { data: newBookmarkLink, error } = await ctx.supabase
            .from("bookmark_link")
            .insert(bookmarkLink)
            .select();

          if (error) {
            logger.warn("Error creating a bookmark link", {
              location: "update-bookmark.ts",
              message: JSON.stringify(error),
            });
          }

          if (newBookmarkLink) {
            bookmarkLinksCreated = bookmarkLinksCreated ?? [];
            bookmarkLinksCreated.push(...newBookmarkLink);
          }
        }
      );

      await Promise.all(addPromises);
    }

    if (params.collectionIds_to_remove) {
      const removePromises = params.collectionIds_to_remove.map(
        async (collectionId) => {
          const { error } = await ctx.supabase
            .from("bookmark_link")
            .delete()
            .eq("bookmark_id", params.bookmark_id)
            .eq("collection_id", collectionId);

          if (error) {
            logger.warn("Error deleting a bookmark link", {
              location: "update-bookmark.ts",
              message: JSON.stringify(error),
            });
          } else {
            bookmarkLinksDeleted = bookmarkLinksDeleted ?? [];
            bookmarkLinksDeleted.push(collectionId);
          }
        }
      );

      await Promise.all(removePromises);
    }


    revalidateTag(`bookmarks_${ctx.user.id}`);

    return {
      bookmarkLinksDeleted: bookmarkLinksDeleted,
      bookmarkLinksCreated: bookmarkLinksCreated,
    };
  });
