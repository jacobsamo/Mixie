"use client";
import { SearchCard, type CardRecipe } from "@/components/cards";
import CreateCollectionDialog from "@/components/modals/create-collection-modal";
import { createQueryString } from "@/lib/utils";
import type { Bookmark } from "@/types";
import { User } from "@supabase/supabase-js";
import { Tables } from "database.types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface BookmarkWithRecipe extends Bookmark {
  recipe: CardRecipe;
  collections: string[];
}

interface DisplayElementsProps {
  collections: Tables<"collections">[] | null;
  bookmarks: BookmarkWithRecipe[] | null;
  user: User;
}

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => router.push(pathname)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-step0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
      <p>Back</p>
    </button>
  );
};

const CollectionCard = ({
  collectionId,
  title,
}: {
  collectionId: string;
  title: string;
}) => {
  const router = useRouter();

  return (
    <button
      className="relative w-1/2 max-w-56 flex-1 flex-shrink-0 resize-y rounded-md shadow outline outline-1 outline-slate-700 sm:w-1/3 dark:shadow-none"
      onClick={() => {
        router.push("?" + createQueryString("collection", collectionId));
      }}
    >
      <Image
        src="/images/placeholder.webp"
        alt="collection image"
        className="top-0 h-1/2 w-full  rounded-t-md  object-cover object-center opacity-90"
        width={128}
        height={96}
      />
      <p className="w-fit pl-1 text-start">{title}</p>
    </button>
  );
};

const DisplayElements = ({
  collections,
  bookmarks,
  user,
}: DisplayElementsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("collection");
  const activeCollection =
    collections && collections.find((col) => col.collection_id == active);

  return (
    <div className="mb-8 flex h-full max-h-[60%] w-full flex-wrap gap-1 p-2">
      {!activeCollection && active != "all" && (
        <div className="w-full">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-step--1">Collections</h2>
            <CreateCollectionDialog userId={user.id} />
          </div>

          <div className="flex flex-wrap gap-2">
            <CollectionCard collectionId="all" title="All Saves" />
            {collections &&
              collections.map((collection) => {
                return (
                  <CollectionCard
                    key={collection.collection_id}
                    collectionId={collection.collection_id}
                    title={collection.title}
                  />
                );
              })}
          </div>
        </div>
      )}

      {activeCollection && (
        <div>
          <BackButton />
          <h1 className="text-step0">{activeCollection.title}</h1>

          <div className="flex flex-col gap-2">
            {bookmarks &&
              bookmarks
                .filter((bookmark) =>
                  bookmark.collections?.includes(activeCollection.collection_id)
                )
                .map((bookmark) => {
                  return (
                    <SearchCard
                      key={bookmark.bookmark_id}
                      recipe={bookmark.recipe}
                    />
                  );
                })}
          </div>
        </div>
      )}

      {active == "all" && (
        <div className="h-full overflow-scroll">
          <BackButton />
          <h1 className="text-step0">All</h1>

          <div className="flex flex-col gap-2">
            {bookmarks &&
              bookmarks.map((bookmark) => {
                return (
                  <SearchCard
                    key={bookmark.bookmark_id}
                    recipe={bookmark.recipe}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayElements;
