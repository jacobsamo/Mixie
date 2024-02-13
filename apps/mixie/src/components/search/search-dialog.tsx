"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Recipe } from "@/types";
import { motion } from "framer-motion";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { SearchCard } from "../cards";
import { SearchInput } from "./search-input";
import { searchOpen } from "@/components/providers/dialogs";
import { useAtom } from "jotai";
import { CreateRecipeTrigger, FeedbackButton } from "@/components/open-dialogs";

type PartialRecipe = Pick<
  Recipe,
  | "uid"
  | "id"
  | "title"
  | "imageAttributes"
  | "imageUrl"
  | "total"
  | "ingredientsList"
  | "keywords"
>;

export const SearchDialog = () => {
  const [searchResults, setSearchResults] = useState<PartialRecipe[]>([]);
  const [open, setOpen] = useAtom(searchOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="flex h-full w-full flex-col overflow-hidden rounded-xl border-none md:h-2/3"
        showClose={false}
      >
        <div className="relative inline-flex w-full items-center gap-2">
          <SearchInput setSearchResults={setSearchResults} />
          <DialogClose className="absolute right-2 top-2">
            <X className="hover:text-red" />
          </DialogClose>
        </div>

        <div className="h-4/5">
          {searchResults.length > 0 && (
            <motion.ul
              className="flex  flex-col gap-2 overflow-scroll"
              transition={{ duration: 0.2 }}
            >
              {searchResults.splice(0, 4).map((recipe, index) => (
                <DialogClose key={index}>
                  <SearchCard as="li" recipe={recipe} />
                </DialogClose>
              ))}
            </motion.ul>
          )}
        </div>

        <DialogFooter className="mx-auto inline-flex gap-2 sm:justify-center">
          <FeedbackButton />
          <CreateRecipeTrigger text="Create your own recipe" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
