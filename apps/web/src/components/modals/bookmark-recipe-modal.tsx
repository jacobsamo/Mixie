"use client";
import CreateCollectionDialog from "@/components/modals/create-collection-modal";
import {
  bookmarksAtom,
  collectionsAtom,
} from "@/components/providers/state-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { env } from "env";
import { useAtom } from "jotai";
import { CheckCircle, HeartIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { CardRecipe } from "../cards/card-utils";
import { bookmarkRouteSchema } from "@/types/zodSchemas";

const selectCollection = z.object({
  selected: z.string().array().nullish(),
});

export interface BookmarkRecipeDialogProps {
  recipe: CardRecipe;
  userId: string;
}

const BookmarkRecipeDialog = ({
  recipe,
  userId,
}: BookmarkRecipeDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookmarks, setBookmark] = useAtom(bookmarksAtom);
  const [collections] = useAtom(collectionsAtom);
  const isBookmarked = bookmarks?.find(
    (bookmark) => bookmark.recipe_id == recipe.recipe_id
  );

  const methods = useForm<z.infer<typeof selectCollection>>({
    resolver: zodResolver(selectCollection),
    defaultValues: {
      selected: isBookmarked?.collections,
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

  const bookmarkRecipe = useMutation({
    mutationKey: ["bookmarkRecipe"],
    mutationFn: async (collections: string | null) => {
      const req = await fetch(`/api/recipes/bookmark/${recipe.recipe_id}`, {
        method: "POST",
        body: JSON.stringify(collections),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });

      const res = await req.json();

      setBookmark((prev) =>
        prev != undefined
          ? [...prev, res.bookmarkedRecipe]
          : [res.bookmarkedRecipe]
      );
    },
    onSuccess() {
      toast.success("Bookmark added successfully!");
    },
    onError(err) {
      console.error(err);

      toast.error("Error while bookmarking recipe");
    },
  });

  const updateBookmarkedRecipe = useMutation({
    mutationKey: ["updateBookmarkedRecipe"],
    mutationFn: async (collections: string | null) => {
      const req = await fetch(
        `/api/recipes/bookmark/${recipe.recipe_id}/update`,
        {
          method: "PUT",
          body: JSON.stringify({
            collections: collections,
            notes: null,
            rating: null,
            tags: null,
          } as z.infer<typeof bookmarkRouteSchema>),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
          },
        }
      );

      const res = await req.json();

      setBookmark((prev) =>
        prev != undefined
          ? [...prev, res.bookmarkedRecipe]
          : [res.bookmarkedRecipe]
      );
    },
    onSuccess() {
      toast.success("Bookmark updated successfully!");
    },
    onError(err) {
      console.error(err);

      toast.error("Error while updating bookmark");
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof selectCollection>> = (
    values
  ) => {
    setLoading(true);

    const collections = values.selected ? values.selected.join(", ") : null;

    if (isBookmarked !== undefined) {
      updateBookmarkedRecipe.mutate(collections);
    }

    if (isBookmarked === undefined) {
      bookmarkRecipe.mutate(collections);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="absolute bottom-2 right-2">
        {isBookmarked != undefined ? (
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
          <CreateCollectionDialog userId={userId} />
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
            <Button type="submit">
              {isBookmarked != undefined
                ? loading
                  ? "Updating..."
                  : "Update"
                : loading
                  ? "Bookmarking..."
                  : "Bookmark"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkRecipeDialog;
