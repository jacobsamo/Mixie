import { Info } from "@db/types";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";
import {
  BaseCard,
  CardRectangle,
  CardRectangleSmall,
  CardSquare,
} from "@/src/common/components/elements/Cards";
import Link from "next/link";
import Image from "next/image";

export default async function RecipeViewPage() {
  const recipes = (await db.query.info.findMany({
    limit: 9,
    offset: 0,
    orderBy: [asc(info.lastUpdated)],
  })) as Info[];
  return (
    <>
      <h1>Recipes</h1>
      <section>
        {recipes.map((recipe) => {
          return <CardSquare key={recipe.id} recipe={recipe} />;
        })}
      </section>
    </>
  );
}
