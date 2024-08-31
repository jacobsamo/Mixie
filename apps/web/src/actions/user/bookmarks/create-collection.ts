"use server";
import { authAction } from "@/actions/safe-action";
import { TablesInsert } from "@mixie/supabase/types";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string().nullish(),
});

export const createCollection = authAction
  .schema(schema)
  .metadata({ name: "create-collection" })
  .action(async ({ parsedInput: params, ctx }) => {
    const newCollection: TablesInsert<"collections"> = {
      ...params,
      user_id: ctx.user.id,
    };
    const { data: collection, error } = await ctx.supabase
      .from("collections")
      .insert(newCollection)
      .select()
      .single();

    if (error) throw new Error(`Failed to create bookmark ${error.message}`);

    revalidateTag(`bookmarks_${ctx.user.id}`);


    return collection;
  });
