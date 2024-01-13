"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { env } from "env";
import toast from "react-hot-toast";
import { type Collection, collectionSchema } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
      <DialogContent>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isLoading && collections && (
              <ul className="flex flex-col gap-2">
                {collections.map((collection) => {
                  return (
                    <li>
                      <label htmlFor={collection.uid}>{collection.title}</label>
                      <input
                        id={collection.uid}
                        type="checkbox"
                        {...register("selected")}
                        value={collection.uid}
                      />
                    </li>
                  );
                })}
              </ul>
            )}

            <Button type="submit">
              {loading ? "Bookmarking..." : "Bookmark"}
            </Button>
          </form>
          <CreateCollectionDialog userId={userId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkRecipeDialog;
