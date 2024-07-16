import { CardSquare } from "@/components/cards";
import RecipeSearch from "@/components/search/search-recipes";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";

import { searchRecipes } from "@/lib/services/seach";

export const metadata = constructMetadata({
  title: "Search Recipes",
});

export default async function RecipeViewPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const recipes = await getRecipes();
  const { q: searchValue, mealTime, sweetSavory } = searchParams!;
  const searchedRecipes =
    searchValue != undefined
      ? await searchRecipes({
          query: searchValue,
          filters: {
            mealTime,
            sweetSavory,
          },
          recipes,
        })
      : undefined;

  return (
    <div className="h-fit min-h-full w-full">
      <section className="flex h-52 items-center justify-center">
        <RecipeSearch shouldAutoFilter={true} />
      </section>

      {(!searchedRecipes || searchedRecipes?.length == 0) && searchValue && (
        <p className="text0-white text-center text-step--2">
          No recipes found for your search
        </p>
      )}

      <section className="flex flex-wrap gap-2 p-3">
        {(searchedRecipes && searchedRecipes?.length > 0
          ? searchedRecipes
          : recipes
        )?.map((recipe) => {
          return (
            <CardSquare
              key={recipe.id}
              recipe={{
                ...recipe,
                image_url: recipe.image_url || null,
                image_attributes: recipe.image_attributes || null,
                total_time: recipe.total_time || null,
                keywords: recipe.keywords || null,
              }}
            />
          );
        })}
      </section>
    </div>
  );
}
