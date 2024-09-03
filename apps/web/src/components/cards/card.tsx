"use client";
import { cn, displayMinutes } from "@/lib/utils";
import Link from "next/link";
import { BookmarkIconButton } from "../open-dialogs";
import { CardProps, RecipeImage } from "./card-utils";

export interface BaseCardProps extends CardProps {
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
        "relative flex flex-col items-center justify-between rounded-xl p-2 text-white shadow",
        classNames?.container
      )}
    >
      <Link href={`/recipes/${recipe.id}`} className="h-full w-full">
        <h3
          className={cn(
            "textOnBackground max-w-full text-balance text-center text-step--2",
            classNames?.title
          )}
        >
          {recipe.title}
        </h3>

        <RecipeImage
          src={recipe.image_url || ""}
          alt={recipe?.image_attributes?.alt ?? ""}
          fill
          sizes="224px"
          className={cn(
            "-z-20 h-56 w-56 rounded-xl object-cover object-center",
            classNames?.image,
            classNames?.container
          )}
        />
      </Link>
      {hasCookTime && (
        <div
          className={cn(
            "flex w-full flex-row justify-between",
            classNames?.bookmarkContainer
          )}
        >
          <h3
            className={cn(
              "textOnBackground w-fit whitespace-nowrap",
              classNames?.cookTime
            )}
          >
            {displayMinutes(recipe.total_time)}
          </h3>
          <BookmarkIconButton recipe={recipe} />
        </div>
      )}
      {!hasCookTime && <BookmarkIconButton recipe={recipe} />}
    </div>
  );
};

const CardSquare = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      classNames={{
        container: "h-36 w-36 grow  sm:h-56 sm:w-56  sm:grow-0",
      }}
    />
  );
};

const CardRectangleSmall = ({ recipe }: CardProps) => {
  return (
    <BaseCard
      recipe={recipe}
      classNames={{
        container: "h-52 w-36 shrink-0  sm:h-56 sm:w-44 sm:w-48",
        title: "text-step--2",
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
