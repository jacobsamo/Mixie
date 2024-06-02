"use client";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { CardProps, RecipeImage } from "./card-utils";

export interface SearchCardProps extends CardProps {
  as?: "li" | "div" | "article" | "section";
  edit?: boolean;
}

export const SearchCard = ({
  as = "div",
  edit = false,
  recipe,
}: SearchCardProps) => {
  const user = useUser();

  const Tag = as;
  return (
    <Tag className="relative flex h-32 w-full max-w-[600px] flex-row gap-2 rounded-md bg-white shadow dark:bg-grey">
      <RecipeImage
        src={recipe?.image_url ?? "/images/placeholder.webp"}
        alt={recipe?.image_attributes?.alt ?? ""}
        width={100}
        height={100}
        className="h-32 w-2/5 min-w-32 rounded-lg"
      />

      {/* {<BookmarkButton user={user} recipe={recipe} />} */}

      <div>
        <Link
          href={`/recipes/${
            edit ? `/preview/${recipe.recipe_id}/edit` : recipe.id
          }`}
          className="text-step--2 sm:text-step--1"
        >
          {recipe.title}
        </Link>
      </div>
    </Tag>
  );
};
