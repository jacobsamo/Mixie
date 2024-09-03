"use client";
import FeedbackDialog from "@/components/modals/feedback-modal";
import { CreateRecipeTrigger } from "@/components/open-dialogs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Recipe } from "@/types";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { SearchCard } from "../cards";
import { useStore } from "../providers/store-provider";
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
  const { searchOpen, setSearchOpen } = useStore((store) => store);

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
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
