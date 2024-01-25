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
    <div className="mt-4">
      <h1 className="mb-2 text-center text-step0">Bookmarked Recipes</h1>
      <CreateCollectionDialog userId={session.user.id} />

      <DisplayElements collections={userCollections} bookmarks={gotRecipes} />
    </div>
  );
}
