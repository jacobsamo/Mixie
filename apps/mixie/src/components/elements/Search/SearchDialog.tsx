"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Recipe } from "@/types";
import { motion } from "framer-motion";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { SearchCard } from "../Cards";
import { SearchInput } from "./SearchInput";

export interface SearchDialogProps {
  searchTrigger?: "icon" | "bar";
}

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

const IconTrigger = () => {
  return (
    <DialogTrigger asChild className="cursor-pointer">
      <SearchIcon className="h-8 w-8" />
    </DialogTrigger>
  );
};

const SearchBarTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button
        LeadingIcon={
          <SearchIcon className="ml-5 mr-2 h-5 w-5 shrink-0 opacity-50" />
        }
        unstyled
        className="flex w-3/4 max-w-[28rem] flex-row items-center rounded-xl bg-grey p-3  text-opacity-70 shadow sm:w-1/2 "
      >
        Search for your next taste sensation
      </Button>
    </DialogTrigger>
  );
};

export const SearchDialog = ({ searchTrigger = "bar" }: SearchDialogProps) => {
  const [searchResults, setSearchResults] = useState<PartialRecipe[]>([]);

  return (
    <Dialog>
      {searchTrigger === "icon" && <IconTrigger />}
      {searchTrigger === "bar" && <SearchBarTrigger />}
      <DialogContent
        className="flex h-full  w-full flex-col overflow-hidden rounded-xl border-none md:h-80"
        showClose={false}
      >
        <div className="inline-flex w-full items-center justify-between gap-2">
          <SearchInput setSearchResults={setSearchResults} />
          <DialogClose>
            <X className="hover:text-red" />
          </DialogClose>
        </div>

        {searchResults.length > 0 && (
          <motion.ul
            className="flex h-64 flex-col gap-2 overflow-scroll"
            transition={{ duration: 0.2 }}
          >
            {searchResults.map((recipe, index) => (
              <DialogClose key={index}>
                <SearchCard as="li" recipe={recipe} />
              </DialogClose>
            ))}
          </motion.ul>
        )}
      </DialogContent>
    </Dialog>
  );
};
