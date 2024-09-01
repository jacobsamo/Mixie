import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { CardRecipe, CardSquare } from "../cards";
import { Collection } from "@/types";

interface CollectionRecipeModalProps<T extends CardRecipe> {
  collection: Collection;
  bookmarks: T[];
  Trigger?: React.ReactNode;
}

const CollectionRecipeModal = <T extends CardRecipe>({
  Trigger,
  collection,
  bookmarks,
}: CollectionRecipeModalProps<T>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {Trigger ? (
          Trigger
        ) : (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`?collection=${collection.collection_id}`}
          >
            View All
          </Link>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{collection.title}</DialogTitle>
          {collection.description && (
            <DialogDescription>
              {collection.description}
            </DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full">
          <div className="flex flex-wrap gap-2">
            {bookmarks.map((bookmark) => {
              return (
                // <div
                //   key={bookmark.bookmark_id}
                //   className="text-center"
                // >
                //   <img
                //     src={bookmark.image_url!}
                //     alt={bookmark.title!}
                //     className="mb-2 aspect-square h-auto w-full object-cover"
                //   />
                //   <p className="text-sm">{bookmark.title}</p>
                // </div>
                <CardSquare recipe={bookmark as CardRecipe} />
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionRecipeModal;
