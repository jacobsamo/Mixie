import { unstable_cache } from "next/cache";
import { createClient } from "../client/server";
import { Client } from "../types";

export async function getBookmarksQuery(supabase: Client, userId: string) {
  const { data: bookmark_links } = await supabase
    .from("bookmark_link")
    .select("*")
    .throwOnError();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .throwOnError();

  const { data: collections } = await supabase
    .from("collections")
    .select("*")
    .throwOnError();

  return {
    bookmarks,
    bookmark_links,
    collections,
  };
}

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
  );
};
