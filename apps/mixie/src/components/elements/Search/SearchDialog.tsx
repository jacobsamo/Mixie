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
import { searchOpen } from "@/components/modules/Providers/Dialogs";
import { useAtom } from "jotai";

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
        <div className="inline-flex w-full items-center justify-between gap-2">
          <SearchInput setSearchResults={setSearchResults} />
          <DialogClose>
            <X className="hover:text-red" />
          </DialogClose>
        </div>

        {searchResults.length > 0 && (
          <motion.ul
            className="flex flex-col gap-2 overflow-scroll"
            transition={{ duration: 0.2 }}
          >
            {searchResults.splice(0, 4).map((recipe, index) => (
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
