"use client";
import { SearchIcon, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "@/types";
import { SearchCard } from "../Cards";
import { env } from "env";
import { set } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

export type PartialRecipe = Pick<
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

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <SearchIcon className="h-8 w-8" />
      </DialogTrigger>
      <DialogContent
        className="flex w-full flex-col overflow-hidden rounded-xl border-none p-2"
        showClose={false}
      >
        <SearchInput setSearchResults={setSearchResults} />

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
