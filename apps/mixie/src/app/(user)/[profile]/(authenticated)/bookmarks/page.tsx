import CreateCollectionDialog from "@/components/elements/CreateCollectionDialog";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db/index";
import { bookmarks, collections } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import DisplayElements from "./_DisplayElements";

export default async function BookmarksPage() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return notFound();
  }

  const gotRecipes = await db.query.bookmarks.findMany({
    with: {
      recipe: {
        columns: {
          uid: true,
          id: true,
          title: true,
          imageUrl: true,
          imageAttributes: true,
          total: true,
          keywords: true,
        },
      },
    },
    where: eq(bookmarks.userId, session.user.id),
  });

  const userCollections = await db.query.collections.findMany({
    where: eq(collections.userId, session.user.id),
  });

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
