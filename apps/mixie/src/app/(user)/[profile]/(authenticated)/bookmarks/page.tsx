import CreateCollectionDialog from "@/components/modals/create-collection-modal";
import { getUser } from "@/lib/utils/getUser";
import db from "@/server/db/index";
import { bookmarks, collections, recipes } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import DisplayElements from "./_DisplayElements";

export default async function BookmarksPage() {
  const user = await getServerUser();

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
  const gotRecipes = await db
    .select({
      recipeId: bookmarks.recipeId,
      userId: bookmarks.userId,
      createdAt: bookmarks.createdAt,
      collections: bookmarks.collections,
      uid: recipes.uid,
      id: recipes.id,
      title: recipes.title,
      imageUrl: recipes.imageUrl,
      imageAttributes: recipes.imageAttributes,
      total: recipes.total,
      keywords: recipes.keywords,
    })
    .from(bookmarks)
    .leftJoin(recipes, eq(bookmarks.recipeId, recipes.uid))
    .where(eq(bookmarks.userId, user.id));

  const userCollections = await db
    .select()
    .from(collections)
    .where(eq(collections.userId, user.id));

  return (
    <div className="m-auto mt-4 flex h-fit max-h-[80%] flex-col items-center justify-center rounded-xl bg-white p-1 shadow-main sm:w-full md:w-3/5 lg:min-h-80 dark:bg-grey dark:shadow-none">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>

      <DisplayElements
        collections={userCollections}
        bookmarks={gotRecipes}
        session={session}
      />
    </div>
  );
}
