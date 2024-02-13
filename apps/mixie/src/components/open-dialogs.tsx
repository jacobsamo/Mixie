"use client";
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { MessageCirclePlus, PlusCircleIcon, SearchIcon } from "lucide-react";
import { useAtom } from "jotai";
import {
  createRecipeOpen,
  giveFeedbackOpen,
  searchOpen,
} from "./providers/dialogs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

export interface OpenDialogsProps {
  children?: React.ReactNode;
  className?: string;
}

export interface OpenDialogWithButtonProps extends OpenDialogsProps {
  props?: ButtonProps;
}

// search
export const SearchIconTrigger = ({
  children,
  className,
}: OpenDialogsProps) => {
  const [, setSearchOpen] = useAtom(searchOpen);

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
  const [, setSearchOpen] = useAtom(searchOpen);

  return (
    <Button
      onClick={() => setSearchOpen(true)}
      LeadingIcon={
        <SearchIcon className="ml-5 mr-2 h-5 w-5 shrink-0 opacity-50" />
      }
      unstyled
      className={cn(
        "sm:1/2 flex w-2/4 max-w-[28rem] flex-row items-center rounded-xl bg-grey p-3 py-3 text-step--3 opacity-70 shadow",
        className
      )}
    >
      Search for your next taste sensation
    </Button>
  );
};

export const FeedbackDialogTrigger = ({
  children,
  className,
}: OpenDialogsProps) => {
  const [, setFeedbackOpen] = useAtom(giveFeedbackOpen);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => setFeedbackOpen(true)}
            aria-label="give feedback to the mixie team"
            className={cn(
              "flex flex-row gap-1 border-none outline-none",
              className
            )}
          >
            <MessageCirclePlus className="h-8 w-8" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Provide feedback to the Mixie team</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const FeedbackButton = ({
  children,
  className,
  props,
}: OpenDialogWithButtonProps) => {
  const [, setFeedbackOpen] = useAtom(giveFeedbackOpen);

  return (
    <Button
      LeadingIcon={<MessageCirclePlus />}
      onClick={() => setFeedbackOpen(true)}
      aria-label="give feedback to the mixie team"
      variant={"secondary"}
      className={cn("border-none text-step--3 outline-none ", className)}
      {...props}
    >
      Give feedback
    </Button>
  );
};


export const CreateRecipeIconButton = ({
  children,
  className,
}: OpenDialogsProps) => {
  const [, setCreateRecipeOpen] = useAtom(createRecipeOpen);


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            onClick={() => setCreateRecipeOpen(true)}
            aria-label="create your own recipe"
            className={cn(
              "flex flex-row gap-1 border-none outline-none",
              className
            )}
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
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
  const [, setCreateRecipeOpen] = useAtom(createRecipeOpen);

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
