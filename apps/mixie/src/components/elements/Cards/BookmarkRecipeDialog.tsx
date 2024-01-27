"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { env } from "env";
import { CheckCircle, HeartIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import CreateCollectionDialog from "@/components/elements/CreateCollectionDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Collection } from "@/types";
import { CardRecipe } from "./CardUtils";
import { cn } from "@/lib/utils";

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
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/collections`, {
        headers: {
          Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });
      return (await res.json()) as Collection[];
    },
  });

  const methods = useForm<z.infer<typeof selectCollection>>({
    resolver: zodResolver(selectCollection),
  });
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<z.infer<typeof selectCollection>> = (
    values
  ) => {
    setLoading(true);

    const collections = values.selected ? values.selected.join(", ") : null;

    const setBookmark = fetch(`/api/recipes/bookmark/${recipe.uid}`, {
      method: "POST",
      body: JSON.stringify(collections),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
      },
    });

    toast.promise(setBookmark, {
      loading: "Bookmarking recipe...",
      success: (data) => {
        setLoading(false);
        setOpen(false);
        return "Bookmark added successfully!";
      },
      error: (err) => {
        setLoading(false);
        setOpen(false);
        console.error(err);
        return "Error while bookmarking recipe";
      },
    });
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
        <HeartIcon
          className={`textOnBackground h-8 w-8 cursor-pointer drop-shadow-xl`}
        />
      </DialogTrigger>

      <DialogContent className="flex flex-col justify-between">
        <DialogHeader className="flex flex-row  gap-1">
          <Image
            src={recipe.imageUrl!}
            alt={recipe.imageAttributes?.alt ?? "saved recipe"}
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
          <CreateCollectionDialog
            userId={userId}
          />
        </span>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLoading && collections && (
            <ul className="flex flex-col gap-2 pb-8">
              {collections.map((collection) => {
                const isChecked = watch("selected")?.includes(collection.uid);

                return (
                  <li className="md:w-3/5">
                    <button
                      type="button"
                      onClick={() => handleChange(collection.uid)}
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
              {loading ? "Bookmarking..." : "Bookmark"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkRecipeDialog;
