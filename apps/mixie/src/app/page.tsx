import { CardRectangle } from "@/src/common/components/elements/Cards";
import { eq } from "drizzle-orm";
import { SearchIcon } from "lucide-react";
import { unstable_cache } from "next/cache";
import SearchTrigger from "@components/modules/SearchTrigger";
import { db } from "@server/db";
import { info } from "@server/db/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

export const revalidate = 3600;

const getRecipes = unstable_cache(
  async () => {
    const latestRecipes = await db.query.info.findMany({
      where: eq(info.isPublic, true),
      limit: 12,
      orderBy: info.createdAt,
    });
    return latestRecipes;
  },
  ["recipes"],
  {
    revalidate: 3600,
  }
);

// const getRecipes = cache(async () => {
//   const recipes = await db.query.info.findMany({
//     where: eq(info.isPublic, true),
//   });
//   return recipes;
// });

export default async function Page() {
  const latestRecipes = await getRecipes();

  return (
    <main className="h-full w-full">
      <section className="flex h-52 flex-col items-center justify-center">
        {/* <Image
            src="https://images.unsplash.com/photo-1605210055810-bdd1c4d1f343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="background img"
            fill
            className={styles.heroImg}
          /> */}
        <h1 className="pb-2 text-step--1">Want Tasty Recipes</h1>
        <SearchTrigger>
          <div className="relative flex h-[2.8rem] min-w-max max-w-[28rem] resize items-center rounded-xl bg-white p-1 pr-5 shadow-searchBarShadow dark:bg-grey dark:text-white">
            <SearchIcon className="ml-5 h-5 w-5" />
            <span className="m-1">Search for your next taste sensation</span>
          </div>
        </SearchTrigger>
      </section>
      <section className="pt-9 ">
        <Carousel
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {latestRecipes.map((recipe) => (
              <CarouselItem key={recipe.recipeId}>
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
