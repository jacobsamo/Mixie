"use client";
import { Input } from "@/components/ui/advanced-components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dietaryRequirements,
  meal_times,
  sweet_savoury,
} from "@/lib/services/data";
import { env } from "env";
import { FilterIcon } from "lucide-react";
import React, { useState } from "react";

export interface SearchInputProps {
  setSearchResults?: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SearchInput = ({ setSearchResults }: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [mealTime, setMealTime] = useState<string | undefined>(undefined);
  const [sweetSavoury, setSweetSavoury] = useState<string | undefined>(
    undefined
  );

  const searchUrl = `${mealTime ? `&mealTime=${mealTime}` : ""}${
    sweetSavoury ? `&sweetSavoury=${sweetSavoury}` : ""
  }`;

  return (
    <div className="flex w-[90%] flex-col gap-4">
      <div className="inline-flex w-full gap-2">
        <Input
          name="recipeSearch"
          id="recipeSearch"
          type="search"
          placeholder="Search for recipes"
          classNames={{
            container: "w-full max-w-full shadow-none",
          }}
          onChange={async (e) => {
            if (!setSearchResults) return;

            const req = await fetch(
              `/api/recipes/search?q=${e.target.value}${searchUrl}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${env.NEXT_PUBLIC_API_APP_TOKEN}`,
                },
              }
            );

            const recipes = await req.json();
            setSearch(e.target.value);
            setSearchResults(recipes);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              window.location.href = `/recipes/search?q=${search}${searchUrl}`;
            }
          }}
        />
        <button
          className="h-12 w-12 "
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon />
        </button>
      </div>
      {showFilters && (
        <div className="inline-flex w-full gap-2">
          <Select value={mealTime} onValueChange={setMealTime}>
            <SelectTrigger>
              <SelectValue placeholder="Meal time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                All
              </SelectItem>
              {meal_times.map((meal_time) => (
                <SelectItem key={meal_time.value} value={meal_time.value}>
                  {meal_time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sweetSavoury} onValueChange={setSweetSavoury}>
            <SelectTrigger>
              <SelectValue placeholder="Sweet/Savoury" />
            </SelectTrigger>
            <SelectContent>
              {sweet_savoury.map((meal_time) => (
                <SelectItem key={meal_time.value} value={meal_time.value}>
                  {meal_time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
