"use client";
import Fuse, { IFuseOptions } from "fuse.js";
import React, { useEffect, useState } from "react";
// import { useFetchAllRecipe } from '../../lib/services/RecipeService';
import { env } from "@/env.mjs";
import { Dialog, DialogContent } from "@components/ui/dialog";
import { Info } from "@db/types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useToggleWithShortcut } from "../../hooks/useToggleWithShortCut";
import { recipeId } from "../../lib/utils/utils";

interface SearchProps {
  externalOpen?: boolean;
  setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

//TODO: Make it so this component can be used anywhere and can listen to a `useContext` to open so we don't have multiple instances on this component in the DOM
export function Search({ externalOpen, setExternalOpen }: SearchProps) {
  const [recipes, setRecipes] = useState<Info[]>([]);

  const [searchedRecipes, setSearchedRecipes] = React.useState<
    Info[] | undefined
  >(recipes);
  const { open, setOpen } = useToggleWithShortcut(setExternalOpen);
  const { register, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");

  function searchRecipes(query: string) {
    if (recipes.length === 0) return;

    const options: IFuseOptions<Info> = {
      includeScore: true,
      keys: ["title", "keywords"],
    };
    const fuse = new Fuse(recipes, options);
    const result = fuse.search(query);

    setSearchedRecipes(result.map((item) => item.item));
  }

  React.useEffect(() => {
    const fetchRecipes = async () => {
      const req = await fetch(`/api/recipes`, {
        headers: {
          authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
        next: {
          revalidate: 60 * 60,
        },
      });

      const recipes = (await req.json()) as Info[];

      setRecipes(recipes);
    };

    if (recipes?.length === 0) {
      fetchRecipes();
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      searchRecipes(searchValue);
    } else {
      setSearchedRecipes([]);
    }
  }, [searchValue]);

  //TODO: Make this to work just like CMDK with keyboard navigation and more refence to OPTcode
  return (
    <>
      <Dialog
        open={externalOpen !== undefined ? externalOpen : open}
        onOpenChange={setExternalOpen !== undefined ? setExternalOpen : setOpen}
      >
        <DialogContent className="overflow-hidden p-0">
          <div className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">
            <div className="flex items-center border-b px-3">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="text-sm placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                {...register("search")}
              />
            </div>

            {searchedRecipes?.length !== 0 && (
              <div className="overflow-hidden p-1">
                <h3 className="px-2 py-1.5 text-step--3">Searched Recipes</h3>
                {searchedRecipes?.map((recipe) => (
                  <Link
                    href={`/recipes/${recipeId(recipe.title)}`}
                    key={recipe.id}
                    className="text-sm relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none aria-selected:bg-grey aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    {recipe.title}
                  </Link>
                ))}
              </div>
            )}

            <div className="overflow-hidden p-1">
              <h3 className="px-2 py-1.5 text-step--3">Top Recipes</h3>
              {recipes?.map((recipe) => (
                <Link
                  href={`/recipes/${recipeId(recipe.title)}`}
                  key={recipe.id}
                  className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-step--3 outline-none aria-selected:bg-grey aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  {recipe.title}
                </Link>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Search;
