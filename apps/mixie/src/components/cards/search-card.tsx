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
        className="h-32 w-2/5 rounded-lg"
      />

      {<BookmarkButton session={session} recipe={recipe} />}

      <div>
        <Link
          href={`/recipes/${edit ? `/preview/${recipe.uid}/edit` : recipe.id}`}
          className="text-step--1"
        >
          {recipe.title}
        </Link>

        {recipe.keywords && (
          <div className="flex w-full flex-row flex-wrap gap-1">
            {(Array.isArray(recipe?.keywords) &&
              recipe?.keywords?.slice(0, 5).map((keyword, index) => {
                return (
                  <p
                    key={index}
                    className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
                  >
                    {keyword.value}
                  </p>
                );
              })) ||
              null}
            {Array.isArray(recipe?.keywords) && recipe?.keywords.length > 5 && (
              <p className="text-center text-step--4 text-black opacity-80">
                ...
              </p>
            )}
          </div>
        )}
      </div>
    </Tag>
  );
};
