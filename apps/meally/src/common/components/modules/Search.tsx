"use client";
import React, { useEffect, useState } from "react";
// import { useFetchAllRecipe } from '../../lib/services/RecipeService';
import { Dialog, DialogContent } from "@components/ui/dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  ArrowUpRightSquare,
  Bookmark,
  ScrollText,
  Settings,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToggleWithShortcut } from "../../hooks/useToggleWithShortCut";
import useUser from "../../hooks/useUser";
import CreateRecipeDialog from "../elements/CreateRecipeDialog";

interface SearchProps {
  externalOpen?: boolean;
  setExternalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Search({ externalOpen, setExternalOpen }: SearchProps) {
  const { user } = useUser();
  const router = useRouter();

  const { open, setOpen } = useToggleWithShortcut(setExternalOpen);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);

  const { register, watch, getValues } = useForm<{ search: string }>({
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");

  const dialogOpen = externalOpen !== undefined ? externalOpen : open;
  const setDialogOpen =
    setExternalOpen !== undefined ? setExternalOpen : setOpen;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setDialogOpen((dialogOpen) => !dialogOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleKeyUp = (e: React.KeyboardEvent<any>) => {
    if (e.key === "ArrowUp") {
      setActiveIndex(activeIndex + 1);
      document.getElementById((activeIndex + 1).toString())?.focus();
      return;
    }

    if (e.key === "ArrowDown") {
      setActiveIndex(activeIndex - 1);
      document.getElementById((activeIndex - 1).toString())?.focus();
      return;
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="overflow-hidden p-0">
          <div className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md">
            <div className="flex items-center border-b px-3">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <input
                className="text-sm placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                {...register("search")}
                onKeyDown={(e) => {
                  if ((e.key == "Enter")) {
                    router.push(`/recipes?search=${getValues("search")}`);
                  } else {
                    handleKeyUp(e);
                  }
                }}
              />
            </div>

            <div id="quick-access">
              <Link
                id="1"
                onKeyUp={handleKeyUp}
                onClick={() => setDialogOpen(false)}
                href={`/${user?.id}`}
                className="flex flex-row gap-1"
              >
                <UserCircle2 /> Profile
              </Link>
              <CreateRecipeDialog />
              <Link
                id="2"
                onKeyUp={handleKeyUp}
                onClick={() => setDialogOpen(false)}
                href={`/${user?.id}/bookmarks`}
                className="flex flex-row gap-1"
              >
                {" "}
                <Bookmark />
                Bookmarks
              </Link>
              <Link
                id="3"
                onKeyUp={handleKeyUp}
                onClick={() => setDialogOpen(false)}
                href={`/${user?.id}/drafts`}
                className="flex flex-row gap-1"
              >
                <ScrollText /> Drafts
              </Link>
              <Link
                id="4"
                onKeyUp={handleKeyUp}
                onClick={() => setDialogOpen(false)}
                href={`/${user?.id}/settings?activeLink=profile`}
                className="flex flex-row gap-1"
              >
                {" "}
                <Settings />
                Settings
              </Link>
              <Link
                id="5"
                onKeyUp={handleKeyUp}
                onClick={() => setDialogOpen(false)}
                href={"/api/auth/signout"}
                className="flex flex-row gap-1"
              >
                {" "}
                <ArrowUpRightSquare />
                Signout
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Search;
