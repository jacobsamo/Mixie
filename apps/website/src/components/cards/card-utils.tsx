import { cn } from "@/lib/utils";
import { Recipe } from "@/types";
import type { ClassValue } from "clsx";
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
  | "recipe_id"
  | "id"
  | "title"
  | "image_url"
  | "image_attributes"
  | "total_time"
  | "keywords"
>;

export interface CardProps {
  recipe: CardRecipe;
}

// export const BookmarkButton = ({
//   user,
//   recipe,
// }: {
//   user: User | null;
//   recipe: CardRecipe;
// }) => {
//   if (!user) return null;

//   return <BookmarkRecipeDialog recipe={recipe} userId={user.id} />;
// };

export const RecipeImage = (
  props: ImageProps,
  { className }: { className: ClassValue }
) => (
  <Image
    loading="lazy"
    className={cn("object-cover object-center", className)}
    {...props}
  />
);
