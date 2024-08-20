import { getBookmarksQuery } from "../queries";
import { unstable_cache } from "next/cache";
import { createClient } from "../client/server";

export const getBookmarkData = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return unstable_cache(
    async () => {
      return getBookmarksQuery(supabase, user.id);
    },
    ["bookmarks", user.id],
    {
      tags: [`bookmarks_${user.id}`],
    }
  )();
};

export const getRecipes = async () => {
  const supabase = createClient();

  return unstable_cache(
    async () => {
      return supabase.from("recipes").select().eq("public", true);
    },
    ["recipes"],
    {
      tags: ["recipes"],
    }
  )();
};
