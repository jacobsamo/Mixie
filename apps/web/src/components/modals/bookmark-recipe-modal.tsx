"use client";
import { createBookmark } from "@/actions/user/bookmarks/create-bookmark";
import { updateBookmark } from "@/actions/user/bookmarks/update-bookmark";
import CreateCollectionDialog from "@/components/modals/create-collection-modal";
import { useStore } from "@/components/providers/store-provider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Bookmark } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, HeartIcon, Loader2, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { CardRecipe } from "../cards/card-utils";
import { Button } from "../ui/button";

const selectCollection = z.object({
  selected: z.string().array().nullish(),
});

export interface BookmarkRecipeDialogProps {
  recipe: CardRecipe;
}

const BookmarkRecipeDialog = ({ recipe }: BookmarkRecipeDialogProps) => {
  const {
    bookmarks,
    setBookmarks,
    setBookmarkLinks,
    collections,
    getCollectionsForBookmark,
  } = useStore((store) => store);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState<Bookmark | null>(null);
  const [inCollections, setInCollections] = useState<string[] | null>(null);

  const methods = useForm<z.infer<typeof selectCollection>>({
    resolver: zodResolver(selectCollection),
    defaultValues: {
      selected: inCollections,
    },
  });
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof selectCollection>> = async (
    values
  ) => {
    setLoading(true);
    const collections = values.selected ?? null;

    if (isBookmarked) {
      const bookmarkId = isBookmarked.bookmark_id;
      const selectedCollections = values.selected ?? [];

      // Collections to add are those in the selected list but not in the current list
      const collectionsToAdd = selectedCollections.filter(
        (collectionId) => !inCollections!.includes(collectionId)
      );

      // Collections to remove are those in the current list but not in the selected list
      const collectionsToRemove = inCollections!.filter(
        (collectionId) => !selectedCollections.includes(collectionId)
      );

      const res = await updateBookmark({
        bookmark_id: bookmarkId,
        collectionIds_to_add: collectionsToAdd,
        collectionIds_to_remove: collectionsToRemove,
      });

      if (res && res.data) {
        setBookmarkLinks(res.data.bookmarkLinks);
        toast.success("Updated Bookmark");
      }
    }

    if (!isBookmarked) {
      const res = await createBookmark({
        recipeId: recipe.recipe_id!,
        collectionIds: collections!,
      });

      if (res && res.data) {
        setBookmarks([res.data.bookmark]);
        setBookmarkLinks(res.data.bookmarkLinks);
        toast.success("Bookmarked recipe");
      }
    }

    setOpen(false);
    setLoading(false);
  };

  function handleChange(id: string) {
    const value = watch("selected") ?? [];
    if (watch("selected")?.includes(id)) {
      setValue(
        "selected",
        value?.filter((collectionId) => collectionId !== id)
      );
    } else {
      setValue("selected", [...value, id]);
    }
  }

  useEffect(() => {
    if (errors)
      console.log("Errors: ", {
        errors: errors,
        values: getValues(),
      });
  }, [errors]);

  useEffect(() => {
    const bookmarked = bookmarks?.find((bookmark) => bookmark.recipe_id == recipe.recipe_id) ??
    null
    setIsBookmarked(
      bookmarked
    );

    const inCols =
      getCollectionsForBookmark(bookmarked?.bookmark_id ?? null)?.map(
        (collection) => collection.collection_id
      ) ?? null;
    setInCollections(inCols);
    setValue("selected", inCols);
  }, [bookmarks]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="absolute bottom-2 right-2">
        {isBookmarked ? (
          <HeartIcon
            className={`textOnBackground h-8 w-8 cursor-pointer fill-red text-red`}
          />
        ) : (
          <HeartIcon className={`textOnBackground h-8 w-8 cursor-pointer`} />
        )}
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-between">
        <DialogHeader className="flex flex-row gap-1">
          <Image
            src={recipe.image_url!}
            alt={recipe.image_attributes?.alt ?? "saved recipe"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-md object-cover object-center"
          />
          <h1 className="w-fit text-wrap text-start text-step--2 font-bold">
            {recipe.title}
          </h1>
        </DialogHeader>
        <span className="flex w-full flex-row justify-between">
          <h2 className="font-bold">Collections</h2>
          <CreateCollectionDialog />
        </span>

        <form onSubmit={handleSubmit(onSubmit)}>
          {collections && (
            <ul className="flex flex-col gap-2 pb-8">
              {collections.map((collection) => {
                const isChecked = watch("selected")?.includes(
                  collection.collection_id
                );

                return (
                  <li className="md:w-3/5" key={collection.collection_id}>
                    <button
                      type="button"
                      onClick={() => handleChange(collection.collection_id)}
                      className={cn(
                        "flex w-full flex-row items-center justify-between rounded border-none p-2 shadow outline outline-1 outline-slate-400 dark:bg-grey/50 dark:outline-slate-600",
                        {
                          "outline-2 outline-slate-600 dark:outline-slate-300":
                            isChecked,
                        }
                      )}
                      aria-label={`Add bookmark to collection ${collection.title}`}
                    >
                      {collection.title}

                      {isChecked ? <CheckCircle /> : <PlusCircle />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <DialogFooter>
            <Button disabled={loading} type="submit">
              {isBookmarked != undefined
                ? loading
                  ? "Updating..."
                  : "Update"
                : loading
                  ? "Bookmarking..."
                  : "Bookmark"}
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkRecipeDialog;
