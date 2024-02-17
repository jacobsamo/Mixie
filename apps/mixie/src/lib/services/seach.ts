import { Recipe } from "@/types";
import Fuse, { IFuseOptions } from "fuse.js";

interface SearchRecipesProps {
  query: string;
  filters?: {
    mealTime?: string | null;
    sweetSavory?: string | null;
    dietary?: string | null;
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
      filters.mealTime !== "all" &&
      recipe.mealTime !== filters.mealTime
    )
      return false;
    if (filters?.sweetSavory && recipe.sweet_savoury !== filters.sweetSavory)
      return false;
    if (filters?.dietary && recipe.dietary !== filters.dietary) return false;
    return true;
  });

  return filteredResults;
}
