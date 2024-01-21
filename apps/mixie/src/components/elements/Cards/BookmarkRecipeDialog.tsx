"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { type Collection } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { env } from "env";
import toast from "react-hot-toast";
import CreateCollectionDialog from "./CreateCollectionDialog";

const selectCollection = z.object({
  selected: z.string().array().nullish(),
});

const BookmarkRecipeDialog = ({
  recipeId,
  userId,
}: {
  recipeId: string;
  userId: string;
}) => {
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

    const setBookmark = fetch(`/api/recipes/bookmark/${recipeId}`, {
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
          className={`h-8 w-8 cursor-pointer drop-shadow-xl`}
          style={{ textShadow: "4px 4px 20px rgba(0, 0, 0, 1)" }}
        />
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-between">
        <CreateCollectionDialog userId={userId} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLoading && collections && (
            <ul className="flex flex-col gap-2">
              {collections.map((collection) => {
                const isChecked = watch("selected")?.includes(collection.uid);

                return (
                  <li className="flex w-1/2 flex-row gap-2 rounded outline">
                    <button
                      type="button"
                      onClick={() => handleChange(collection.uid)}
                      className={`flex w-full flex-row items-center justify-center rounded p-2 outline-none ${
                        isChecked
                          ? "bg-red text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {collection.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <Button type="submit">
            {loading ? "Bookmarking..." : "Bookmark"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkRecipeDialog;
