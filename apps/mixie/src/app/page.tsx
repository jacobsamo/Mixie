import { CardRectangle, CardRectangleSmall } from "@/components/cards";
import CollectionCard from "@/components/collection-card";
import LandingText from "@/components/landing-page-text";
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
import { getUser } from "@/lib/utils/getUser";
import { Donut, EggFried, Salad, Sandwich, Soup } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const user = await getUser();
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

      <div className="mt-6 flex flex-wrap items-start justify-center gap-1 sm:gap-2 ">
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
        <div className="flex flex-col items-center gap-2">
          {!user ? (
            <Link
              className="text-base mt-3 inline-flex w-11/12 items-center justify-center rounded-md border border-transparent bg-yellow px-4 py-2 text-step--2 font-medium text-black shadow-sm transition-colors duration-200 ease-in-out hover:bg-yellow/90 focus:outline-none focus:ring-2 focus:ring-yellow/90 focus:ring-offset-2 sm:w-2/5"
              href={"/auth/login"}
            >
              Join now
            </Link>
          ) : (
            <CreateRecipeTrigger className="mt-3 w-11/12 sm:w-2/5" />
          )}
        </div>
        {/* <FeedbackButton className="mt-4 bg-none text-step--4 hover:bg-none" /> */}
      </div>
    </>
  );
}
