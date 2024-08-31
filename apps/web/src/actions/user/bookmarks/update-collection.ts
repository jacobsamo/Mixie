"use server";
import { authAction } from "@/actions/safe-action";
import { collectionSchema } from "@/types";
import { TablesInsert } from "@mixie/supabase/types";
import { revalidateTag } from "next/cache";

export const updateCollection = authAction
  .schema(collectionSchema)
  .metadata({ name: "update-collection" })
  .action(async ({ parsedInput: params, ctx }) => {
    const newCollection: TablesInsert<"collections"> = {
      ...params,
      user_id: ctx.user.id,
    };
    const { data: collection, error } = await ctx.supabase
      .from("collections")
      .update(newCollection)
      .eq("collection_id", params.collection_id)
      .select()
      .single();

    if (error) throw new Error(`Failed to create bookmark ${error.message}`);

    revalidateTag(`bookmarks_${ctx.user.id}`);

    return collection;
  });
