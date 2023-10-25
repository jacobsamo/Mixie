import { env } from "@/env.mjs";
import { CardRectangle } from "@components/elements/Cards";
import { Info } from "@db/types";
import { SearchIcon } from "lucide-react";
import Carousel from "../common/components/elements/Carousel";
import SearchTrigger from "../common/components/modules/SearchTrigger";

export default async function Page() {
  const req = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/recipes`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  const latestRecipes = (await req.json()) as Info[];

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
            <span className="m-1">
              Search by keyword, ingredient or recipes
            </span>
          </div>
        </SearchTrigger>
      </section>
      <section className="pt-9 ">
        <Carousel
          autoplay={true}
          averageWidth={400}
          count={latestRecipes.length}
        >
          {latestRecipes.map((recipe) => (
            <CardRectangle key={recipe.id} recipe={recipe} />
          ))}
        </Carousel>
      </section>
    </main>
  );
}
