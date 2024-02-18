"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookmarkButton, CardProps, RecipeImage } from "./card-utils";

export interface SearchCardProps extends CardProps {
  as?: "li" | "div" | "article" | "section";
  edit?: boolean;
}

export const SearchCard = ({
  as = "div",
  edit = false,
  recipe,
}: SearchCardProps) => {
  const { data: session } = useSession();

  const Tag = as;
  return (
    <Tag className="relative flex h-32 w-full max-w-[600px] flex-row gap-2 rounded-md bg-white shadow dark:bg-grey">
      <RecipeImage
        src={recipe.imageUrl || "/images/placeholder.webp"}
        alt={recipe?.imageAttributes?.alt ?? ""}
        width={100}
        height={100}
        className="h-32 min-w-32 w-2/5 rounded-lg"
      />

      {<BookmarkButton session={session} recipe={recipe} />}

      <div>
        <Link
          href={`/recipes/${edit ? `/preview/${recipe.uid}/edit` : recipe.id}`}
          className="text-step--2 sm:text-step--1"
        >
          {recipe.title}
        </Link>

      </div>
    </Tag>
  );
};
