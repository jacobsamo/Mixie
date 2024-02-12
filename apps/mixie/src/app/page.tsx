import { CardRectangle } from "@/components/cards";
import CollectionCard from "@/components/collection-card";
import LandingText from "@/components/landing-page-text";
import { SearchDialog } from "@/components/search";
import { SearchBarTrigger } from "@/components/open-dialogs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { meal_times } from "@/lib/services/data";
import { getRecipes } from "@/lib/services/data_fetching";
import { Donut, EggFried, Salad, Sandwich, Soup } from "lucide-react";

export default async function Page() {
  const latestRecipes = await getRecipes();

  return (
    <main className="h-full w-full">
      <section className="flex h-52 flex-col items-center justify-center">
        <LandingText delay={0.2} />

        <SearchBarTrigger />
      </section>
      <section className="pb-10 pt-9">
        <h2 className="pb-4 text-center text-step--1">Top Recipes</h2>
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
          autoplay={true}
        >
          <CarouselContent>
            {latestRecipes.splice(0, 8).map((recipe) => (
              <CarouselItem key={recipe.uid}>
                <CardRectangle key={recipe.id} recipe={recipe} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <div className="flex flex-wrap items-center justify-center gap-2">
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
              href={`/recipes?mealTime=${meal_time.value}`}
              title={meal_time.label}
              icon={<DisplayIcon />}
            />
          );
        })}
      </div>
    </main>
  );
}
