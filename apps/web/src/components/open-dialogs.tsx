"use client";
import { cn } from "@/lib/utils";
import { HeartIcon, PlusCircleIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useStore } from "./providers/store-provider";
import { Button, ButtonProps } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { CardRecipe } from "./cards";
import { Bookmark } from "@/types";

export interface OpenDialogsProps {
  children?: React.ReactNode;
  className?: string;
}

export interface OpenDialogWithButtonProps extends OpenDialogsProps {
  props?: ButtonProps;
  text?: string;
}

// search
export const SearchIconTrigger = ({
  children,
  className,
}: OpenDialogsProps) => {
  const { setSearchOpen } = useStore((store) => store);

  return (
    <button
      onClick={() => setSearchOpen(true)}
      aria-label="search recipes"
      className={cn("cursor-pointer", className)}
    >
      <SearchIcon className="h-8 w-8" />
    </button>
  );
};

export const SearchBarTrigger = ({ children, className }: OpenDialogsProps) => {
  const { setSearchOpen } = useStore((store) => store);

  return (
    <Button
      onClick={() => setSearchOpen(true)}
      LeadingIcon={
        <SearchIcon className="ml-5 mr-2 h-5 w-5 shrink-0 opacity-50" />
      }
      unstyled
      className={cn(
        "flex w-11/12 flex-row items-center rounded-xl p-3 py-3 text-step--4 opacity-70 shadow dark:bg-grey sm:w-1/2 sm:max-w-[28rem] sm:text-step--3",
        className
      )}
    >
      Search for your next taste sensation
    </Button>
  );
};

export const CreateRecipeIconButton = ({
  children,
  className,
}: OpenDialogsProps) => {
  const { setCreateRecipeOpen } = useStore((store) => store);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setCreateRecipeOpen(true)}
          aria-label="create your own recipe"
          className={cn(
            "flex flex-row gap-1 border-none outline-none",
            className
          )}
        >
          <PlusCircleIcon className="h-8 w-8" />
        </TooltipTrigger>
        <TooltipContent>Create your own recipe</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const CreateRecipeTrigger = ({
  children,
  className,
  props,
  text,
}: OpenDialogWithButtonProps & { text?: string }) => {
  const { setCreateRecipeOpen } = useStore((store) => store);

  return (
    <Button
      LeadingIcon={<PlusCircleIcon />}
      aria-label="create a new recipe"
      onClick={() => setCreateRecipeOpen(true)}
      className={cn("text-step--3 text-black", className)}
      {...props}
    >
      {text || "Create a recipe"}
    </Button>
  );
};

export const BookmarkIconButton = ({ recipe }: { recipe: CardRecipe }) => {
  const [isBookmarked, setIsBookmarked] = useState<Bookmark | null>(null);
  const { bookmarks, setBookmarkRecipe, isLoggedIn } = useStore(
    (store) => store
  );

  useEffect(() => {
    const bookmarked =
      bookmarks?.find((bookmark) => bookmark.recipe_id == recipe.recipe_id) ??
      null;
    setIsBookmarked(bookmarked);
  }, [bookmarks, recipe]);

  if (!isLoggedIn) return null;

  return (
    <button
      className="absolute bottom-2 right-2"
      onClick={() => setBookmarkRecipe(true, recipe)}
    >
      {isBookmarked ? (
        <HeartIcon
          className={`textOnBackground h-8 w-8 cursor-pointer fill-red text-red`}
        />
      ) : (
        <HeartIcon className={`textOnBackground h-8 w-8 cursor-pointer`} />
      )}
    </button>
  );
};
