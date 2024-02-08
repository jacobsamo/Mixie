import { CardSquare } from "@/components/elements/Cards";
import RecipeSearch from "@/components/modules/RecipeSearch";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Recipes",
});

export default async function RecipeViewPage() {
  const recipes = await getRecipes();

  return (
    <main className="h-fit min-h-full w-full">
      <section className="flex h-52 items-center justify-center">
        <RecipeSearch shouldAutoFilter={true} />
      </section>

      <section className="flex flex-wrap gap-2 p-3">
        {recipes.map((recipe) => {
          return (
            <CardSquare
              key={recipe.id}
              recipe={{
                ...recipe,
                imageUrl: recipe.imageUrl || null,
                imageAttributes: recipe.imageAttributes || null,
                total: recipe.total || null,
                keywords: (recipe.keywords as { value: string }[]) || null,
              }}
            />
          );
        })}
      </section>
    </main>
  );
}
