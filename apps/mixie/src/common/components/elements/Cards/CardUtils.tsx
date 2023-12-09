import { env } from "@/env.mjs";
import { HeartIcon } from "lucide-react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/src/common/lib/utils";
import clsx from "clsx";

export type CardRecipe = {
  recipeId?: string;
  uid?: string;
  id: string;
  title: string;
  imgUrl: string | null;
  imgAlt: string | null;
  total: string | null;
  keywords: { value: string }[] | null;
};

export interface CardProps {
  recipe: CardRecipe;
}

export function addBookMark(recipe: CardRecipe) {
  const bookmark = {
    uid: null,
    recipeId: recipe.recipeId || recipe.uid,
    userId: null,
  };

  const setBookmark = fetch(`/api/recipes/${bookmark.recipeId}/bookmark`, {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
    },
  });

  toast.promise(setBookmark, {
    loading: "Setting bookmark...",
    success: "Bookmark added successfully",
    error: (err) => {
      console.error(err);
      return "Error while bookmarking recipe";
    },
  });
}

export const BookmarkButton = ({
  session,
  recipe,
}: {
  session: Session | null;
  recipe: CardRecipe;
}) => {
  if (!session) return null;

  return (
    <button
      onClick={() => addBookMark(recipe)}
      className="absolute bottom-2 right-2"
    >
      <HeartIcon className={`h-8 w-8 cursor-pointer`} />
    </button>
  );
};

export const RecipeImage = (
  props: ImageProps,
  { className }: { className: clsx.ClassValue }
) => (
  <Image className={cn("object-cover object-center", className)} {...props} />
);
