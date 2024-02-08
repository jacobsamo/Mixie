import { CardRectangle } from "@/components/elements/Cards";
import LandingText from "@/components/elements/LandingText";
import { SearchDialog } from "@/components/elements/Search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getRecipes } from "@/lib/services/data_fetching";

export default async function Page() {
  const latestRecipes = await getRecipes();

  return (
    <main className="h-full w-full">
      <section className="flex h-52 flex-col items-center justify-center">
        <LandingText delay={0.2} />

        <SearchDialog />
      </section>
      <section className="pt-9 ">
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
            {latestRecipes
            
              .splice(0, 8)
              .map((recipe) => (
                <CarouselItem key={recipe.uid}>
                  <CardRectangle key={recipe.id} recipe={recipe} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}
