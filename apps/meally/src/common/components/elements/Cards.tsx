"use client";
import { env } from "@/env.mjs";
import { cn } from "@lib/utils";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Recipe = {
  recipeId?: string;
  uid?: string;
  id: string;
  title: string;
  imgUrl: string | null;
  imgAlt: string | null;
  total: string | null;
  keywords: { value: string }[] | null;
};

interface CardProps {
  recipe: Recipe;
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
  const { data: session } = useSession();

  function addBookMark(recipe: Recipe) {
    if (!session) return redirect("/auth/login");

    const bookmark = {
      uid: null,
      recipeId: recipe.recipeId || recipe.uid,
      userId: session.user.id,
    };

    const setBookmark = fetch(`/api/recipes/${bookmark.recipeId}/bookmark`, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
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
          {session && (
            <button
              onClick={() => addBookMark(recipe)}
              className="absolute bottom-2 right-2"
            >
              <HeartIcon className={`h-8 w-8 cursor-pointer`} />
            </button>
          )}
        </div>
      ) : (
        <>
          {session && (
            <button
              onClick={() => addBookMark(recipe)}
              className="absolute bottom-2 right-2"
            >
              <HeartIcon className={`h-8 w-8 cursor-pointer`} />
            </button>
          )}
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

const SearchCard = ({ as, edit = false, recipe }: SearchCardProps) => {
  const { data: session } = useSession();

  function addBookMark(recipe: Recipe) {
    if (!session) return redirect("/auth/login");

    const bookmark = {
      uid: null,
      recipeId: recipe.recipeId || recipe.uid,
      userId: session.user.id,
    };

    const setBookmark = fetch(`/api/recipes/${bookmark.recipeId}/bookmark`, {
      method: "POST",
      body: JSON.stringify(bookmark),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
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

  const Tag = as;
  return (
    <Tag className="relative flex h-32 w-full max-w-[600px] flex-row gap-2 rounded-md bg-white shadow dark:bg-grey">
      <Image
        src={recipe.imgUrl || ""}
        alt={recipe.imgAlt || ""}
        width={100}
        height={100}
        className="h-32 w-2/5 rounded-lg object-cover"
      />
      {session && (
        <button
          onClick={() => addBookMark(recipe)}
          className="absolute bottom-2 right-2"
        >
          <HeartIcon className={`h-8 w-8 cursor-pointer`} />
        </button>
      )}
      <div>
        <Link
          href={`/recipes/${
            edit ? `/preview/${recipe.recipeId}/edit` : recipe.id
          }`}
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

export { CardRectangle, CardRectangleSmall, CardSquare, SearchCard };
