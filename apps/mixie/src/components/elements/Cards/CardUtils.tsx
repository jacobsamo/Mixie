import { env } from "env";
import { HeartIcon } from "lucide-react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ImageAttributes } from "@/types";
import BookmarkRecipeDialog from "./BookmarkRecipeDialog";

export type CardRecipe = {
  recipeId?: string;
  uid?: string;
  id: string;
  title: string;
  imageUrl: string | null;
  imageAttributes: ImageAttributes | null;
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

  const setBookmark = fetch(`/api/recipes/bookmark/${bookmark.recipeId}`, {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
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
    <BookmarkRecipeDialog recipeId={recipe.uid!} userId={session.user.id} />
  );
};

export const RecipeImage = (
  props: ImageProps,
  { className }: { className: clsx.ClassValue }
) => (
  <Image
    loading="lazy"
    placeholder="blur"
    blurDataURL={props.src as string}
    className={cn("object-cover object-center", className)}
    {...props}
  />
);
