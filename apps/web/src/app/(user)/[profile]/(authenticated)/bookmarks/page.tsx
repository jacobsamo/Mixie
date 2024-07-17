import { getUser } from "@/lib/utils/getUser";
import { notFound } from "next/navigation";
import DisplayElements, { BookmarkWithRecipe } from "./_DisplayElements";
import { createClient } from "@mixie/supabase/server";

export default async function BookmarksPage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const supabase = createClient();

  const { data: userCollections } = await supabase
    .from("collections")
    .select("*")
    .eq("user_id", user.id);

  const { data: userBookmarks } = await supabase
    .from("bookmarks_view")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div className="shadow-main m-auto mt-4 flex h-fit max-h-[80%] flex-col items-center justify-center rounded-xl bg-white p-1 dark:bg-grey dark:shadow-none sm:w-full md:w-3/5 lg:min-h-80">
      <h1 className="mb-2 text-step0">Bookmarked Recipes</h1>

      <h2 className="text-center">Coming back soon!!</h2>

      {/* <DisplayElements
        collections={userCollections}
        bookmarks={userBookmarks as BookmarkWithRecipe[] | null}
        user={user}
      /> */}
    </div>
  );
}
