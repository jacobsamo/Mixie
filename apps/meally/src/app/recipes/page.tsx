import { Info } from "@db/types";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";
import {
  CardSquare,
} from "@/src/common/components/elements/Cards";

export default async function RecipeViewPage() {
  const recipes = (await db.query.info.findMany({
    limit: 100,
    offset: 0,
    orderBy: [asc(info.lastUpdated)],
  })) as Info[];

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
