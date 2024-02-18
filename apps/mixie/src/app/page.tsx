import {
  CardRectangle,
  CardRectangleSmall,
  CardSquare,
} from "@/components/cards";
import CollectionCard from "@/components/collection-card";
import LandingText from "@/components/landing-page-text";
import { SearchDialog } from "@/components/search";
import {
  CreateRecipeTrigger,
  SearchBarTrigger,
} from "@/components/open-dialogs";
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
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();
  const latestRecipes = await getRecipes();
  const carouselRecipes = latestRecipes.slice(0, 9);

  return (
    <>
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
            {carouselRecipes.splice(0, 9).map((recipe) => (
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

      <div className="flex flex-wrap items-start justify-center gap-1 sm:gap-2 mt-6 ">
        {latestRecipes.splice(0, 12).map((recipe) => (
          <CardRectangleSmall key={recipe.uid} recipe={recipe} />
        ))}
      </div>

      <div className="mx-auto my-12 max-w-7xl rounded-md bg-gradient-to-tl from-yellow/80 to-white px-4 py-12 text-center text-black sm:px-6 lg:px-8">
        <h2 className="text-step--1 font-bold">Join the Mixie Community</h2>
        <p className="mt-4 text-step--2">
          Share your recipes with fellow food enthusiasts and explore new
          flavors together!
        </p>
        {!session ? (
          <Button className="mt-3 w-11/12 sm:w-2/5">Join now</Button>
        ) : (
          <CreateRecipeTrigger className="mt-3 w-11/12 sm:w-2/5" />
        )}
      </div>
    </>
  );
}
