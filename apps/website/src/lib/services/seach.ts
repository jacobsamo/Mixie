import { Recipe } from "@/types";
import Fuse, { IFuseOptions } from "fuse.js";

interface SearchRecipesProps {
  query: string;
  filters?: {
    mealTime?: string | null;
    sweetSavory?: string | null;
  };
  recipes: Recipe[];
}

export function searchRecipes({ query, filters, recipes }: SearchRecipesProps) {
  let searchRecipes = recipes;

  const options: IFuseOptions<Recipe> = {
    includeScore: true,
    keys: ["title"],
    threshold: 0.6,
  };

  const fuse = new Fuse(searchRecipes, options);
  const results = fuse.search(query);

  const unfilteredResults = results.map((result) => result.item);
  const filteredResults = unfilteredResults.filter((recipe) => {
    if (
      filters?.mealTime &&
      filters.mealTime !== (recipe.meal_time?.values || "")
    )
      return false;
    if (filters?.sweetSavory && recipe.sweet_savoury !== filters.sweetSavory)
      return false;
    return true;
  });

  return filteredResults;
}
