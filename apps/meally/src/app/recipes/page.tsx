import { CardSquare } from "@/src/common/components/elements/Cards";
import { serverClient } from "@/src/common/trpc/serverClient";

export default async function RecipeViewPage() {
  const recipes = await fetch("/api/recipes", {
    next: { revalidate: 60 * 60 * 24 },
  }).then((res) => res.json());

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
