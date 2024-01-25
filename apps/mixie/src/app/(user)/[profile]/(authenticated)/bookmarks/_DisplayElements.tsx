"use client";
import { SearchCard, type CardRecipe } from "@/components/elements/Cards";
import { createQueryString } from "@/lib/utils";
import type { Bookmark, Collection } from "@/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface BookmarkWithRecipe extends Bookmark {
  recipe: CardRecipe;
}

interface DisplayElementsProps {
  collections: Collection[];
  bookmarks: BookmarkWithRecipe[];
}

const DisplayElements = ({ collections, bookmarks }: DisplayElementsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("collection");
  const activeCollection = collections.find((col) => col.uid == active);

  return (
    <div className="flex flex-wrap gap-2">
      {!activeCollection &&
        collections.map((collection) => {
          return (
            <button
              className="h-24 w-24 rounded-md"
              onClick={() => {
                router.push(
                  "?" + createQueryString("collection", collection.uid)
                );
              }}
            >
              <Image
                src="/images/placeholder.webp"
                alt="collection image"
                className="h-full w-full object-cover object-center"
              />
            </button>
          );
        })}

      {activeCollection && (
        <div>
          <button onClick={() => router.push("")}>Back</button>
          <h1 className="text-step0">{activeCollection.title}</h1>

          {bookmarks
            .filter((bookmark) =>
              bookmark.collections?.includes(activeCollection.uid)
            )
            .map((bookmark) => {
              return <SearchCard recipe={bookmark.recipe} />;
            })}
        </div>
      )}
    </div>
  );
};

export default DisplayElements;
