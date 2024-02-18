"use client";
import { cn, createUrl } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input, InputProps } from "../ui/input";

interface RecipeSearchProps extends Omit<InputProps, "name"> {
  className?: string;
  shouldAutoFilter?: boolean;
  name?: string;
}

/**
 * A client component that allows the user to search for recipes using search params
 */
const RecipeSearch = ({
  className,
  shouldAutoFilter = false,
  name = "recipeSearch",
  ...props
}: RecipeSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams?.get("search") || ""
  );

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = searchValue;
    const newParams = new URLSearchParams();
    newParams.set("search", value);

    if (value.length == 0) newParams.delete("search");

    if (pathname !== "/recipes") {
      const paramsString = newParams.toString();
      router.push(`/recipes${paramsString.length ? "?" : ""}${paramsString}`);
      return;
    }

    router.push(createUrl(pathname, newParams));
  };

  return (
    <Input
      LeadingIcon={
        <SearchIcon className="ml-5 mr-2 h-5 w-5 shrink-0 opacity-50" />
      }
      id="recipeSearch"
      name={name}
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      onKeyDown={(event) => {
        if (!shouldAutoFilter && event.key == "Enter") handleSearch(event);

        if (shouldAutoFilter) {
          handleSearch(event);
        }
      }}
      placeholder="Search for your next taste sensation"
      classNames={{
        container: cn(
          "w-3/4 sm:w-1/2 max-w-[28rem] shadow rounded-xl ",
          className
        ),
        inputWrapper: "border-none rounded-xl",
      }}
      {...props}
    />
  );
};

export default RecipeSearch;
