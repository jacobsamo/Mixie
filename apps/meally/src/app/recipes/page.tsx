import { Info } from "@db/types";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";
import { CardSquare } from "@/src/common/components/elements/Cards";
import { serverClient } from "@/src/common/trpc/serverClient";

export default async function RecipeViewPage() {
  const recipes = await serverClient.recipes.query();

  return (
    <>
      <section className="flex flex-wrap gap-2 p-3">
        {recipes.map((recipe) => {
          return <CardSquare key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </>
  );
}
