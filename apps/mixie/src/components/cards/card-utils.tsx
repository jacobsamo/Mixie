import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import { User } from "@supabase/supabase-js";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image, { type ImageProps } from "next/image";

const BookmarkRecipeDialog = dynamic(
  () => import("@/components/modals/bookmark-recipe-modal"),
  {
    ssr: true,
  }
);

export type CardRecipe = Pick<
  Recipe,
  "uid" | "id" | "title" | "imageUrl" | "imageAttributes" | "total" | "keywords"
>;

export interface CardProps {
  recipe: CardRecipe;
}

export const BookmarkButton = ({
  user,
  recipe,
}: {
  user: User | null;
  recipe: CardRecipe;
}) => {
  if (!user) return null;

  return <BookmarkRecipeDialog recipe={recipe} userId={user.id} />;
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
