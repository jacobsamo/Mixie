import { CardSquare } from "@/components/elements/Cards";
import RecipeSearch from "@/components/modules/RecipeSearch";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";

import { searchRecipes } from "@/lib/services/seach";

export const metadata = constructMetadata({
  title: "Search Recipes",
});

export default async function RecipeViewPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const recipes = await getRecipes();
  const { q: searchValue } = searchParams as { [key: string]: string };
  console.log('Search param: ', searchParams);
  console.log('Search: ', searchValue);
  const searchedRecipes = await searchRecipes({ query: searchValue, recipes });

  return (
    <main className="h-fit min-h-full w-full">
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
                imageUrl: recipe.imageUrl || null,
                imageAttributes: recipe.imageAttributes || null,
                total: recipe.total || null,
                keywords: (recipe.keywords as { value: string }[]) || null,
              }}
            />
          );
        })}
      </section>
    </main>
  );
}
