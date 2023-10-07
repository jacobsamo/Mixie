import { CardSquare } from "@/src/common/components/elements/Cards";
import { Get } from "@/src/common/lib/services/apiHandle";
import { serverClient } from "@/src/common/trpc/serverClient";
import { Info } from "@/src/db/types";

export default async function RecipeViewPage() {
  const recipes = await Get<Info[]>({
    url: `/api/recipes`,
    method: "GET",
  });

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
