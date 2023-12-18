"use client";
import { createUrl } from "@/src/common/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "../ui/input";

/**
 * A client component that allows the user to search for recipes using search params
 */
const RecipeSearch = ({ className }: { className?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams();
    newParams.set("search", value);

    if (value.length == 0) newParams.delete("search");

    router.push(createUrl(pathname, newParams));
  };

  return (
    <Input
      LeadingIcon={
        <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      }
      name="search"
      value={searchParams?.get("search") || ""}
      onChange={(event) => handleSearch(event.target.value)}
      ref={searchInputRef}
      placeholder="Search for your next taste sensation"
      classNames={{
        container: `w-1/2 max-w-[28rem] ${className}`,
        inputWrapper: "border-none rounded-xl",
      }}
    />
  );
};

export default RecipeSearch;
