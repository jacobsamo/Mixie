"use client";
import { cn } from "@lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { CardProps, BookmarkButton, RecipeImage } from "./CardUtils";

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
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "relative flex h-56 w-56 flex-col items-center justify-between rounded-xl  p-2 text-black dark:text-white",
        classNames?.container
      )}
    >
      <Link
        href={`/recipes/${recipe.id}`}
        className={cn("text-center text-step--2 shadow", classNames?.title)}
      >
        {recipe.title}
      </Link>

      {hasCookTime && (
        <div
          className={cn(
            "flex w-full flex-row justify-between",
            classNames?.bookmarkContainer
          )}
        >
          <h3 className={cn("w-fit whitespace-nowrap", classNames?.cookTime)}>
            {recipe.total}
          </h3>
          {<BookmarkButton session={session} recipe={recipe} />}
        </div>
      )}

      {!hasCookTime && <BookmarkButton session={session} recipe={recipe} />}

      <RecipeImage
        src={recipe.imgUrl || ""}
        alt={recipe.imgAlt || ""}
        fill
        sizes="224px"
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

const CardRectangle = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      hasCookTime={false}
      classNames={{
        container:
          "h-64 min-w-[320px] md:min-w-[30rem] max-w-[43.75rem] resize",
        bookmarkContainer: "absolute right-2 bottom-2",
        image: "h-64 w-[43.75rem] resize",
        title: "text-step0",
      }}
    />
  );
};

export { CardRectangle, CardRectangleSmall, CardSquare };
