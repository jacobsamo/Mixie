import { CardSquare } from "@/src/common/components/elements/Cards";
import { Request } from "@/src/common/lib/services/apiHandle";
import { serverClient } from "@/src/common/trpc/serverClient";
import { Info } from "@/src/db/types";

export default async function RecipeViewPage() {
  const recipes = await Request<Info[]>("/api/recipes");

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
