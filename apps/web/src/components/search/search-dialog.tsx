"use client";
import { CreateRecipeTrigger } from "@/components/open-dialogs";
import { searchOpen } from "@/components/providers/dialogs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import FeedbackDialog from "@/components/modals/feedback-modal";
import { Recipe } from "@/types";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchCard } from "../cards";
import { SearchInput } from "./search-input";

type PartialRecipe = Pick<
  Recipe,
  | "recipe_id"
  | "id"
  | "title"
  | "image_attributes"
  | "image_url"
  | "total_time"
  | "ingredients_list"
  | "keywords"
>;

export const SearchDialog = () => {
  const [searchResults, setSearchResults] = useState<PartialRecipe[]>([]);
  const [open, setOpen] = useAtom(searchOpen);

  useEffect(() => {
    console.log("SearchResults: ", {
      searchResults,
      length: searchResults.length > 0,
    });
  }, [searchResults]);

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
              className="flex flex-col gap-2 overflow-scroll"
              transition={{ duration: 0.2 }}
            >
              {searchResults.length > 0 &&
                searchResults &&
                searchResults.map((recipe, index) => (
                  <DialogClose key={index}>
                    <SearchCard as="li" recipe={recipe} />
                  </DialogClose>
                ))}
            </motion.ul>
          )}
        </div>

        <DialogFooter className="mx-auto inline-flex gap-2 sm:justify-center">
          <FeedbackDialog />
          <CreateRecipeTrigger text="Create your own recipe" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
