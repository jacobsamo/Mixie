"use client";
import React from "react";
import { Button } from "../ui/button";
import { MessageCirclePlus, PlusCircleIcon, SearchIcon } from "lucide-react";
import { useAtom } from "jotai";
import {
  createRecipeOpen,
  giveFeedbackOpen,
  searchOpen,
} from "./Providers/Dialogs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// search
export const SearchIconTrigger = () => {
  const [, setSearchOpen] = useAtom(searchOpen);

  return (
    <button
      onClick={() => setSearchOpen(true)}
      aria-label="search recipes"
      className="cursor-pointer"
    >
      <SearchIcon className="h-8 w-8" />
    </button>
  );
};

export const SearchBarTrigger = () => {
  const [, setSearchOpen] = useAtom(searchOpen);

  return (
    <Button
      onClick={() => setSearchOpen(true)}
      LeadingIcon={
        <SearchIcon className="ml-5 mr-2 h-5 w-5 shrink-0 opacity-50" />
      }
      unstyled
      className="sm:1/2 flex w-2/4 max-w-[28rem] flex-row items-center rounded-xl bg-grey p-3 py-3 text-step--3 opacity-70 shadow"
    >
      Search for your next taste sensation
    </Button>
  );
};

export const FeedbackDialogTrigger = () => {
  const [, setFeedbackOpen] = useAtom(giveFeedbackOpen);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => setFeedbackOpen(true)}
            aria-label="give feedback to the mixie team"
            className="flex flex-row gap-1 border-none outline-none"
          >
            <MessageCirclePlus className="h-8 w-8" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Provide feedback to the Mixie team</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const CreateRecipeTrigger = () => {
  const [, setCreateRecipeOpen] = useAtom(createRecipeOpen);

  return (
    <button
      aria-label="create a new recipe"
      onClick={() => setCreateRecipeOpen(true)}
      className="flex flex-row gap-1 border-none outline-none"
    >
      <PlusCircleIcon /> Create a recipe
    </button>
  );
};
