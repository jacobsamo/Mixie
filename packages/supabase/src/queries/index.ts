import { Client } from "../types";

export async function getBookmarksQuery(supabase: Client, userId: string) {
  const { data: bookmark_links } = await supabase
    .from("bookmark_link")
    .select()
    .eq("user_id", userId)
    .throwOnError();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", userId)
    .throwOnError();

  const { data: collections } = await supabase
    .from("collections")
    .select()
    .eq("user_id", userId)
    .throwOnError();

  return {
    bookmarks,
    bookmark_links,
    collections,
  };
}

