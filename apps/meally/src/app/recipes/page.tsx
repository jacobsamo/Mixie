import { env } from "@/env.mjs";
import { CardSquare } from "@/src/common/components/elements/Cards";
import { constructMetadata } from "@/src/common/lib/utils/utils";
import { db } from "@/src/server/db";
import { info } from "@/src/server/db/schemas";
import { Info } from "@db/types";
import { eq } from "drizzle-orm";
import { cache } from "react";

const getRecipes = cache(async () => {
  const recipes = await db.query.info.findMany({
    where: eq(info.isPublic, true),
    // where: eq(recipeSchema.isPublic, true),
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
      <section className="flex flex-wrap gap-2 p-3">
        {recipes.map((recipe) => {
          return <CardSquare key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </main>
  );
}
