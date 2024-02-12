import { CardSquare } from "@/components/cards";
import CollectionCard from "@/components/collection-card";
import { SearchDialog } from "@/components/search";
import { SearchBarTrigger } from "@/components/open-dialogs";
import RecipeSearch from "@/components/search/search-recipes";
import { meal_times } from "@/lib/services/data";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";
import { Donut, EggFried, Grid, Salad, Sandwich, Soup } from "lucide-react";

export const metadata = constructMetadata({
  title: "Recipes",
});

export default async function RecipeViewPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const recipes = await getRecipes();
  const { mealTime: collection } = searchParams!;
  const mealTime = meal_times.find((meal) => meal.value === collection);
  const mealTimeRecipes = recipes.filter((recipe) => {
    return recipe.mealTime?.value == mealTime?.value;
  });

  return (
    <main className="h-fit min-h-full w-full">
      <section className="mb-2 flex h-52 items-center justify-center">
        <SearchBarTrigger />
      </section>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        <CollectionCard
          key="all"
          href="/recipes"
          title="All"
          icon={<Grid />}
          className={
            mealTime == undefined ? "bg-slate-800 outline outline-1" : ""
          }
        />

        {meal_times.map((meal_time) => {
          const DisplayIcon = () => {
            switch (meal_time.value) {
              case "breakfast":
                return <EggFried />;
              case "lunch":
                return <Sandwich />;
              case "dinner":
                return <Soup />;
              case "snack":
                return <Donut />;
              default:
                return <Salad />;
            }
          };

          return (
            <CollectionCard
              key={meal_time.value}
              href={`?mealTime=${meal_time.value}`}
              title={meal_time.label}
              icon={<DisplayIcon />}
              className={
                meal_time.value === collection
                  ? "bg-gray-800 outline outline-1"
                  : ""
              }
            />
          );
        })}
      </div>

      {mealTime && (
        <h2 className="text-center text-step--1">{mealTime.label} Recipes</h2>
      )}

      <section className="flex flex-wrap gap-2 p-3">
        {(mealTimeRecipes || recipes).map((recipe) => {
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
