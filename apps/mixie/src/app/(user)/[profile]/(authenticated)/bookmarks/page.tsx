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
  // imageUrl: true,
  // imageAttributes: true,
  // total: true,
  // keywords: true,
  const supabase = createClient();
  // const gotRecipes = await db
  //   .select({
  //     recipeId: bookmarks.recipeId,
  //     userId: bookmarks.userId,
  //     createdAt: bookmarks.createdAt,
  //     collections: bookmarks.collections,
  //     uid: recipes.uid,
  //     id: recipes.id,
  //     title: recipes.title,
  //     imageUrl: recipes.imageUrl,
  //     imageAttributes: recipes.imageAttributes,
  //     total: recipes.total,
  //     keywords: recipes.keywords,
  //   })
  //   .from(bookmarks)
  //   .leftJoin(recipes, eq(bookmarks.recipeId, recipes.uid))
  //   .where(eq(bookmarks.userId, user.id));

    // const {data: gotRecipes} = await supabase.from("bookmarks").select()
    // .select({
    //   recipeId: bookmarks.recipeId,
    //   userId: bookmarks.userId,
    //   createdAt: bookmarks.createdAt,
    //   collections: bookmarks.collections,
    //   uid: recipes.uid,
    //   id: recipes.id,
    //   title: recipes.title,
    //   imageUrl: recipes.imageUrl,
    //   imageAttributes: recipes.imageAttributes,
    //   total: recipes.total,
    //   keywords: recipes.keywords,
    // })
  
  

  const userCollections = await supabase.from("collections").select("*").eq("userId", user.id);



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
