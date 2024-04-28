import { getUser } from "@/lib/utils/getUser";
import { notFound } from "next/navigation";
import DisplayElements from "./_DisplayElements";
import { createClient } from "@/server/supabase/server";

export default async function BookmarksPage() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }
  // uid: true,
  // id: true,
  // title: true,
  // image_url: true,
  // image_attributes: true,
  // total: true,
  // keywords: true,
  const supabase = createClient();
  // const gotRecipes = await db
  //   .select({
  //     recipe_id: bookmarks.recipe_id,
  //     userId: bookmarks.userId,
  //     created_at: bookmarks.created_at,
  //     collections: bookmarks.collections,
  //     uid: recipes.uid,
  //     id: recipes.id,
  //     title: recipes.title,
  //     image_url: recipes.image_url,
  //     image_attributes: recipes.image_attributes,
  //     total: recipes.total,
  //     keywords: recipes.keywords,
  //   })
  //   .from(bookmarks)
  //   .leftJoin(recipes, eq(bookmarks.recipe_id, recipes.uid))
  //   .where(eq(bookmarks.userId, user.id));

  // const {data: gotRecipes} = await supabase.from("bookmarks").select()
  // .select({
  //   recipe_id: bookmarks.recipe_id,
  //   userId: bookmarks.userId,
  //   created_at: bookmarks.created_at,
  //   collections: bookmarks.collections,
  //   uid: recipes.uid,
  //   id: recipes.id,
  //   title: recipes.title,
  //   image_url: recipes.image_url,
  //   image_attributes: recipes.image_attributes,
  //   total: recipes.total,
  //   keywords: recipes.keywords,
  // })

  const { data: userCollections } = await supabase
    .from("collections")
    .select("*")
    .eq("userId", user.id);

  return (
    <div className="m-auto mt-4 flex h-fit max-h-[80%] flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main sm:w-full md:w-3/5 lg:min-h-80 dark:bg-grey dark:shadow-none">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>

      <DisplayElements
        collections={userCollections}
        bookmarks={gotRecipes}
        user={user}
      />
    </div>
  );
}
