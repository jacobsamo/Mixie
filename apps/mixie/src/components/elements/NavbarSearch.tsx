"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { SearchIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RecipeSearch from "../modules/RecipeSearch";
import { DialogClose } from "@radix-ui/react-dialog";

const NavbarSearch = () => {
  const pathName = usePathname();

  if (pathName === "/" || pathName === "/recipes") {
    return (
      <Button
        onClick={() => {
          document.getElementById("recipeSearch")?.focus();
        }}
        unstyled
      >
        <SearchIcon className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <SearchIcon className="h-8 w-8" />
      </DialogTrigger>
      <DialogContent
        className="flex w-full flex-row overflow-hidden rounded-xl border-none p-2"
        showClose={false}
      >
        <RecipeSearch
          className="w-full max-w-full shadow-none sm:w-full"
          TrailingIcon={
            <DialogClose>
              <X />
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
