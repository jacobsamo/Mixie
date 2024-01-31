import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import clsx from "clsx";
import { Session } from "next-auth";
import Image, { type ImageProps } from "next/image";
import BookmarkRecipeDialog from "./BookmarkRecipeDialog";

export type CardRecipe = Pick<
  Recipe,
  "uid" | "id" | "title" | "imageUrl" | "imageAttributes" | "total" | "keywords"
>;

export interface CardProps {
  recipe: CardRecipe;
}

export const BookmarkButton = ({
  session,
  recipe,
}: {
  session: Session | null;
  recipe: CardRecipe;
}) => {
  if (!session) return null;

  return <BookmarkRecipeDialog recipe={recipe} userId={session.user.id} />;
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
