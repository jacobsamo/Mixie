import React from "react";
import Details from "./Details";
import Info from "./Info";
import StarRating from "./StarRating";
import type { NewRecipe, Recipe } from "@/server/db/types";
import Image from "next/image";
import { recipeFormSchema } from "@/server/db/zodSchemas";
import * as z from "zod";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import RecipePrintingView from "./RecipePrintingView";
import ShareDialog from "@/components/elements/ShareDialog";

interface RecipePageComponentProps {
  recipe: Recipe;
}

const RecipePageComponent = ({ recipe }: RecipePageComponentProps) => {
  return (
    <>
      <RecipePrintingView recipe={recipe} />
      <div className="mb-14 flex flex-col  items-start lg:ml-[20%] print:hidden">
        <div className="flex flex-wrap items-center gap-4">
          <h1 id="title" className="text-center text-step2 font-semibold">
            {recipe.title}
          </h1>
          <StarRating rating={recipe.rating || 0} recipeId={recipe.uid} />
        </div>
        <Info info={recipe} />
        <div className="w-full">
          <div className="relative">
            <Image
              src={recipe?.imageUrl || "/images/placeholder.webp"}
              alt={
                recipe?.imageAttributes?.alt ?? recipe.title ?? "recipe image"
              }
              width={800}
              height={600}
              className="aspect-video rounded-xl object-cover"
              priority
              placeholder="blur"
              blurDataURL={recipe.imageUrl || "/images/placeholder.webp"}
            />
            {recipe.imageAttributes?.photographer &&
              recipe.imageAttributes.photographerLink && (
                <p
                  className="absolute bottom-2 left-2 bg-gray-700/20 drop-shadow-xl"
                  style={{ textShadow: "4px 4px 20px rgba(0, 0, 0, 1)" }}
                >
                  Photo by{" "}
                  <Link
                    href={recipe.imageAttributes.photographerLink}
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    {recipe.imageAttributes.photographer}
                  </Link>{" "}
                  on{" "}
                  <Link
                    href={
                      "https://unsplash.com?utm_source=mixie&utm_medium=referral"
                    }
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    Unsplash
                  </Link>
                </p>
              )}
          </div>
          <div className="py-2">
            <span className="relative flex flex-wrap gap-2">
              {(recipe?.keywords as { value: string }[])
                ?.splice(0, 5)
                .map((keyword, index) => (
                  <p
                    key={index}
                    className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
                  >
                    {keyword.value}
                  </p>
                ))}
              {recipe.source && (
                <Link
                  href={recipe.source}
                  target="_blank"
                  className="flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-white p-1 dark:bg-grey"
                >
                  {" "}
                  <ExternalLinkIcon className="h-5 w-5" />
                  Source
                </Link>
              )}

              <ShareDialog
                url={`https://www.mixiecooking/recipes/${recipe.id}`}
                image={recipe.imageUrl || ""}
                title={recipe.title}
                hashtags={(recipe?.keywords as { value: string }[])
                  ?.splice(0, 5)
                  ?.map((keyword) => keyword.value)
                  .join(", ")}
              />
            </span>
          </div>
          <p className="md:w-9/12">{recipe.description}</p>
        </div>
        {recipe.notes && (
          <div className="mt-4">
            <h2 className="font-bold">Notes*: </h2>
            <p className="italic">{recipe.notes}</p>
          </div>
        )}
        <span className="my-2 mb-4 h-[0.125rem] w-full rounded-md bg-grey md:w-[800px] dark:bg-white" />
        <Details
          ingredients={recipe.ingredients || []}
          steps={recipe.steps || []}
        />
      </div>
    </>
  );
};

export default RecipePageComponent;
