import { CardSquare } from "@/src/common/components/elements/Cards";
import SearchTrigger from "@/src/common/components/modules/SearchTrigger";
import { constructMetadata } from "@/src/common/lib/utils/utils";
import { db } from "@/src/server/db";
import { info } from "@/src/server/db/schemas";
import { eq } from "drizzle-orm";
import { SearchIcon } from "lucide-react";
import { unstable_cache } from "next/cache";

export const revalidate = 60 * 60;

const getRecipes = unstable_cache(async () => {
  const recipes = await db.query.info.findMany({
    where: eq(info.isPublic, true),
  });
  return recipes;
});

export const metadata = constructMetadata({
  title: "Recipes",
});

export default async function RecipeViewPage() {
  const recipes = await getRecipes();

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
        {recipes.map((recipe) => {
          return <CardSquare key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </main>
  );
}
