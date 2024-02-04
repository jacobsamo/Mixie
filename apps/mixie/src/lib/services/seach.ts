import { getRecipes } from "@/lib/services/data_fetching";
import { NextRequest, NextResponse } from "next/server";
import Fuse, { IFuseOptions } from "fuse.js";
import { Recipe } from "@/types";
import { isApp } from "@/lib/services/apiMiddleware";

export function searchRecipes({
  query,
  recipes,
}: {
  query: string;
  recipes: Recipe[];
}) {
  const options: IFuseOptions<Recipe> = {
    includeScore: true,
    keys: ["title"],
    threshold: 0.6,
  };

  const fuse = new Fuse(recipes, options);
  const results = fuse.search(query);

  return results.map((result) => result.item);
}
