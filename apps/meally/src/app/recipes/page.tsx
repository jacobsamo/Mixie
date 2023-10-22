import { env } from "@/env.mjs";
import { CardSquare } from "@/src/common/components/elements/Cards";
import { Info } from "@/src/db/types";

export default async function RecipeViewPage() {
  const req = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/recipes`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const recipes = (await req.json()) as Info[];

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
