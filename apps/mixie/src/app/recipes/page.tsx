import { CardSquare } from "@/components/elements/Cards";
import RecipeSearch from "@/components/modules/RecipeSearch";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";
import { Recipe } from "@/types";
import { IFuseOptions } from "fuse.js";
// const getRecipes = cache(async () => {
//   const recipes = await db.query.info.findMany({
//     where: eq(info.isPublic, true),
//   });
//   return recipes;
// });

async function searchRecipes({
  query,
  recipes,
}: {
  query: string | undefined;
  recipes: Recipe[];
}) {
  if (query == undefined) return;

  const options: IFuseOptions<Recipe> = {
    includeScore: true,
    isCaseSensitive: true,
    keys: ["title"],
    threshold: 0.6,
  };

  const Fuse = (await import("fuse.js")).default;
  const fuse = new Fuse(recipes, options);
  const result = fuse.search(query);

  console.log("Results: ", result);

  return result.map((item) => item.item);
}

export const metadata = constructMetadata({
  title: "Recipes",
});

export default async function RecipeViewPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const recipes = await getRecipes();
  const { search: searchValue } = searchParams as { [key: string]: string };
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
