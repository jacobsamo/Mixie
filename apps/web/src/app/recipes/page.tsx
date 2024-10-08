import { CardSquare } from "@/components/cards";
import CollectionCard from "@/components/collection-card";
import { SearchBarTrigger } from "@/components/open-dialogs";
import { meal_times } from "@/lib/services/data";
import { getRecipes } from "@/lib/services/data_fetching";
import { constructMetadata } from "@/lib/utils";
import { Donut, EggFried, Grid, Salad, Sandwich, Soup } from "lucide-react";

export const metadata = constructMetadata({
  title: "Recipes",
  image: "/images/recipes-landing-page.jpg",
  url: "https://www.mixiecooking.com/recipes",
  description: "Find delicious recipes for any meal of the day",
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
    return recipe.meal_time?.values == mealTime?.value;
  });

  return (
    <div className="h-fit min-h-full w-full items-center">
      <section className="mb-2 flex h-52 items-center justify-center">
        <SearchBarTrigger />
      </section>

      {/* <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        <CollectionCard
          key="all"
          href="/recipes"
          title="All"
          icon={<Grid />}
          className={
            mealTime == undefined
              ? "bg-white/50 outline outline-1 dark:bg-slate-800"
              : ""
          }
        />

        {/* {meal_times.map((meal_time) => {
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
                  ? "bg-white/50 outline outline-1 dark:bg-slate-800"
                  : ""
              }
            />
          );
        })}
      </div> */}

      {mealTime && (
        <h2 className="text-center text-step--1">{mealTime.label} Recipes</h2>
      )}

      <section className="flex flex-wrap gap-2 p-3">
        {((collection && mealTimeRecipes) || recipes).map((recipe) => {
          return (
            <CardSquare
              key={recipe.id}
              recipe={{
                ...recipe,
                image_url: recipe.image_url || null,
                image_attributes: recipe.image_attributes || null,
                total_time: recipe.total_time || null,
                keywords: recipe.keywords || null,
              }}
            />
          );
        })}
      </section>
    </div>
  );
}
