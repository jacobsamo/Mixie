import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import recipeService from "@lib/services/RecipeService";
import { CardRectangle } from "@components/elements/Cards";
import Slides from "../common/components/elements/Slides";

import { Info } from "@db/types";
import { db } from "@/src/db";
import { info } from "@/src/db/schemas";
import { desc, asc } from "drizzle-orm";

import { SelectWithSearch } from "../common/components/ui/combobox";
import SearchTrigger from "../common/components/modules/SearchTrigger";
import { SearchIcon } from "lucide-react";
import { Button } from "../common/components/ui/button";
import Image from "next/image";

export default async function Page() {
  // const latestRecipes = await recipeService.getAllRecipeCards();
  const latestRecipes = (await db.query.info.findMany({
    limit: 9,
    offset: 0,
    orderBy: [asc(info.lastUpdated)],
  })) as Info[];

  return (
    <>
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
        <Slides>
          {latestRecipes.map((recipe) => {
            return <CardRectangle key={recipe.id} recipe={recipe} />;
          })}
        </Slides>
      </section>
    </>
  );
}
