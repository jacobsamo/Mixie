"use client";
import React from "react";
import Image from "next/image";
import type { Info, Recipe } from "@db/types";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { cn } from "@/src/common/lib/utils/utils";
import { env } from "@/env.mjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Bookmark } from "@db/types";

function addBookMark(recipe: Info | Bookmark) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  if (!session) return router.push("/auth/login");

  const bookmark: Bookmark = {
    recipeId: recipe.recipeId,
    id: recipe.id,
    title: recipe.title,
    imgAlt: recipe.imgAlt,
    imgUrl: recipe.imgUrl,
    isPublic: recipe.isPublic,
    total: recipe.total,
    userId: session.user.id,
  };

  fetch(`/api/recipes/${bookmark.recipeId}/bookmark`, {
    method: "POST",
    body: JSON.stringify(bookmark),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      toast({
        title: "Recipe created.",
        description:
          "Your recipe has been created. Changes will be reflected within an hour",
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error while creating your recipe.",
        variant: "destructive",
      });
    }
  });
}

interface CardProps {
  recipe: Info | Bookmark;
}

interface BaseCardProps extends CardProps {
  hasCookTime?: boolean;
  classNames?: {
    container?: string;
    image?: string;
    title?: string;
    time?: string;
    bookmarkContainer?: string;
    cookTime?: string;
    bookmarkButton?: string;
    bookmarkIcon?: string;
  };
}

export const BaseCard = ({
  recipe,
  hasCookTime = true,
  classNames,
}: BaseCardProps) => {
  return (
    <div
      className={cn(
        "relative flex h-56 w-56 flex-col items-center justify-between rounded-xl  p-2 text-black dark:text-white",
        classNames?.container
      )}
    >
      <Link
        href={`/recipes/${recipe.id}`}
        className={cn("text-center text-step--2", classNames?.title)}
      >
        {recipe.title}
      </Link>

      {hasCookTime ? (
        <div
          className={cn(
            "flex w-full flex-row justify-between",
            classNames?.bookmarkContainer
          )}
        >
          <h3 className={cn("w-fit whitespace-nowrap", classNames?.cookTime)}>
            {recipe.total}
          </h3>
          <button
            onClick={() => {
              addBookMark(recipe);
            }}
            className={classNames?.bookmarkButton}
            aria-label="Bookmark Recipe"
          >
            <HeartIcon
              className={cn("h-8 w-8 cursor-pointer", classNames?.bookmarkIcon)}
            />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              addBookMark(recipe);
            }}
            className={cn(
              "absolute bottom-2 right-2",
              classNames?.bookmarkButton
            )}
            aria-label="Bookmark Recipe"
          >
            <HeartIcon
              className={cn("h-8 w-8 cursor-pointer", classNames?.bookmarkIcon)}
            />
          </button>
        </>
      )}

      <Image
        src={recipe.imgUrl || ""}
        alt={recipe.imgAlt || ""}
        fill
        priority
        className={cn(
          "-z-20 h-56 w-56 rounded-xl object-cover",
          classNames?.image
        )}
      />
    </div>
  );
};

const CardSquare = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      classNames={{
        container: "h-56 w-56 ",
        image: "h-56 w-56",
      }}
    />
  );
};

const CardRectangleSmall = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      // classNames={{ container: 'h-56 w-46', image: 'h-56 w-46' }}
      classNames={{
        container: "h-56 w-46",
        image: "h-56 w-46",
        title: "text-step--1",
      }}
    />
  );
};

interface SearchCardProps extends CardProps {
  as: "li" | "div" | "article" | "section";
  edit?: boolean;
}

const SearchCard = ({ as, edit, recipe }: SearchCardProps) => {
  const Tag = as;
  return (
    <Tag className="relative flex h-32 w-full max-w-[600px] flex-row gap-2 rounded-md bg-grey">
      <Image
        src={recipe.imgUrl || ""}
        alt={recipe.imgAlt || ""}
        width={100}
        height={100}
        className="h-32 w-2/5 rounded-lg object-cover"
      />
      <button
        onClick={() => addBookMark(recipe)}
        className="absolute bottom-2 right-2"
      >
        <HeartIcon className={`h-8 w-8 cursor-pointer`} />
      </button>
      <div>
        <Link
          href={`/recipes/${recipe.id}${edit ? "/edit" : ""}`}
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

const CardRectangle = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      hasCookTime={false}
      classNames={{
        container: "h-64 md:w-[43.75rem] resize",
        bookmarkContainer: "absolute right-2 bottom-2",
        image: "h-64 w-[43.75rem] resize",
        title: "text-step0",
      }}
    />
  );
};

export { CardRectangleSmall, CardRectangle, SearchCard, CardSquare };
