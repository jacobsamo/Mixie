import React from "react";
import Details from "./Details";
import Info from "./Info";
import StarRating from "./StarRating";
import type { NewRecipe, Recipe } from "@/src/db/types";
import Image from "next/image";
import { recipeFormSchema } from "@/src/db/zodSchemas";
import * as z from "zod";

interface RecipePageComponentProps {
  recipe: Recipe;
}

// TODO: user `next-seo` for ld+json for the recipe schema
const RecipePageComponent = ({ recipe }: RecipePageComponentProps) => {
  return (
    <div className="mb-14 flex flex-col  items-start lg:ml-[20%]">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-center text-step2 font-semibold">{recipe.title}</h1>
        <StarRating rating={recipe.info?.rating || 0} />
      </div>
      <Info info={recipe.info} />
      <div>
        <Image
          src={recipe?.info.imgUrl || "/images/placeholder.png"}
          alt={recipe?.info.imgAlt || recipe.title || "recipe image"}
          width={800}
          height={600}
          className="aspect-video rounded-xl object-cover"
          priority
        />
        <p>{recipe.description}</p>
        {recipe.notes && (
          <div>
            <h2>Notes: </h2>
            <p>{recipe.notes}</p>
          </div>
        )}
      </div>
      <span className="bg-grey my-2 mb-4 h-[0.125rem] w-full rounded-md dark:bg-white md:w-[800px]" />
      <Details
        ingredients={recipe.ingredients || []}
        steps={recipe.steps || []}
      />
    </div>
  );
};

export default RecipePageComponent;
