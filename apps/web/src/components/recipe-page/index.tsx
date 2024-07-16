"use client";
import type { Recipe } from "@/types";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Details from "./details";
import Info from "./info";
import StarRating from "./star-rating";
import dynamic from "next/dynamic";
import { RecipeProvider } from "./recipe-provider";

const ShareDialog = dynamic(
  () => import("@/components/modals/share-resource-modal")
);
const RecipePrintingView = dynamic(() => import("./recipe-printing-view"));

interface RecipePageComponentProps {
  recipe: Recipe;
  viewMode?: "page" | "preview";
}

const RecipePageComponent = ({
  recipe,
  viewMode = "page",
}: RecipePageComponentProps) => {
  return (
    <RecipeProvider recipe={recipe} viewMode={viewMode}>
      <RecipePrintingView />
      <div className="mb-14 flex flex-col justify-center items-center print:hidden">
        <div className="flex flex-wrap items-center gap-4">
          <h1 id="title" className="text-center text-step2 font-semibold">
            {recipe.title}
          </h1>
          {viewMode === "page" && <StarRating />}
        </div>
        <Info />
        <div>
          <div className="relative">
            <Image
              src={recipe?.image_url || "/images/placeholder.webp"}
              alt={
                recipe?.image_attributes?.alt ?? recipe.title ?? "recipe image"
              }
              width={800}
              height={600}
              className="aspect-video rounded-xl object-cover"
              priority
            />
            {recipe.image_attributes?.photographer &&
              recipe.image_attributes.photographer_link && (
                <div className="textOnBackground absolute bottom-2 left-2 bg-gray-700/20 text-white drop-shadow-xl">
                  Photo by{" "}
                  <Link
                    href={recipe.image_attributes.photographer_link}
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    {recipe.image_attributes.photographer}
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
                </div>
              )}
          </div>
          <div className="py-2">
            <span className="relative flex flex-wrap gap-2">
              {recipe?.keywords?.splice(0, 5).map((keyword, index) => (
                <p
                  key={index}
                  className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
                >
                  {keyword}
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
                image={recipe.image_url || ""}
                title={recipe.title}
                hashtags={recipe?.keywords
                  ?.splice(0, 5)
                  ?.map((keyword) => keyword)
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
        <span className="my-2 mb-4 h-[0.125rem] w-full rounded-md bg-grey dark:bg-white md:w-[800px]" />
        <Details />
      </div>
    </RecipeProvider>
  );
};

export default RecipePageComponent;
