"use client";
import { Input } from "@/components/ui/input";
import { env } from "env";
import { useRouter } from "next/router";
import React, { useState } from "react";

export interface SearchInputProps {
  setSearchResults?: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchInput = ({ setSearchResults }: SearchInputProps) => {
  const [search, setSearch] = useState("");

  return (
    <Input
      name="recipeSearch"
      id="recipeSearch"
      type="search"
      placeholder="Search for recipes"
      className="w-full max-w-full shadow-none sm:w-full"
      onChange={async (e) => {
        if (!setSearchResults) return;

        const req = await fetch(`/api/recipes/search?q=${e.target.value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
          },
        });

        const recipes = await req.json();
        setSearch(e.target.value);
        setSearchResults(recipes);
      }}
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          window.location.href = `/recipes/search?q=${search}`;
        }
      }}
    />
  );
};
