import { cache } from "react";

import { CardSquare } from "@/src/common/components/elements/Cards";
import SearchTrigger from "@/src/common/components/modules/SearchTrigger";
import { db } from "@/src/server/db";
import { info } from "@/src/server/db/schemas";
import { constructMetadata } from "@lib/utils";
import { eq } from "drizzle-orm";
import { Loader2, SearchIcon } from "lucide-react";
import { IFuseOptions } from "fuse.js";
import { Info } from "@/src/server/db/types";

export const revalidate = 60 * 60;

// const getRecipes = unstable_cache(
//   async () => {
//     const recipes = await db.query.info.findMany({
//       where: eq(info.isPublic, true),
//     });
//     return recipes;
//   },
//   ["recipes"],
//   {
//     revalidate: 60 * 60,
//   }
// );
const getRecipes = cache(async () => {
  const recipes = await db.query.info.findMany({
    where: eq(info.isPublic, true),
  });
  return recipes;
});

async function searchRecipes({
  query,
  recipes,
}: {
  query: string | undefined;
  recipes: Info[];
}) {
  if (query == undefined) return;
  console.log("Query: ", query);

  const options: IFuseOptions<Info> = {
    includeScore: true,
    isCaseSensitive: true,
    keys: ["title"],
  };

  const Fuse = (await import("fuse.js")).default;
  const fuse = new Fuse(recipes, options);
  const result = fuse.search(query);
  console.log("Result: ", result);

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
    <main className="h-full w-full">
      <section className="flex h-52 flex-col items-center justify-center">
        <SearchTrigger>
          <div className="relative flex h-[2.8rem] min-w-max max-w-[28rem] resize items-center rounded-xl bg-white p-1 pr-5 shadow-searchBarShadow dark:bg-grey dark:text-white">
            <SearchIcon className="ml-5 h-5 w-5" />
            <span className="m-1">
              Search by keyword, ingredient or recipes
            </span>
          </div>
        </SearchTrigger>
      </section>

      <section className="flex flex-wrap gap-2 p-3">
        {(searchedRecipes && searchedRecipes?.length > 1
          ? searchedRecipes
          : recipes
        )?.map((recipe) => {
          return <CardSquare key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </main>
  );
}
