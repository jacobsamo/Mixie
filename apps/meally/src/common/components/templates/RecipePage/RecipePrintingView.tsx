import { Recipe } from "@/src/db/types";
import { StarIcon } from "lucide-react";
import React from "react";
import Info from "./Info";
import Image from "next/image";
import PrintingStep from "./step/PrintingStep";

interface RecipePrintingViewProps {
  recipe: Recipe;
}

const RecipePrintingView = ({ recipe }: RecipePrintingViewProps) => {
  return (
    <div className="mb-14 flex flex-col  items-start lg:ml-[20%]">
      <div className="flex flex-wrap items-center gap-4">
        <h1 id="title" className="text-center text-step2 font-semibold">
          {recipe.title}
        </h1>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return recipe.info.rating && index <= recipe.info.rating ? (
            <StarIcon className="h-w-8 w-8 fill-[#ffe14cf6] text-[#ffe14cf6]" />
          ) : (
            <StarIcon className="h-w-8 w-8" />
          );
        })}
      </div>
      <Info info={recipe.info} />
      <div className="w-full">
        <Image
          src={recipe?.info.imgUrl || "/images/placeholder.png"}
          alt={recipe?.info.imgAlt || recipe.title || "recipe image"}
          width={800}
          height={600}
          className="aspect-video rounded-xl object-cover"
          priority
        />
        {/* {recipe.source && (
              <Link
                href={recipe.source}
                target="_blank"
                className="absolute right-2 flex cursor-pointer flex-row items-center gap-1 rounded-lg bg-white p-1 dark:bg-grey "
              >
                {" "}
                <ExternalLinkIcon className="h-5 w-5" />
                Source
              </Link>
            )} */}
        <p className="md:w-9/12">{recipe.description}</p>
        {recipe.notes && (
          <div>
            <h2>Notes: </h2>
            <p>{recipe.notes}</p>
          </div>
        )}
      </div>
      <span className="my-2 mb-4 h-[0.125rem] w-full rounded-md bg-grey dark:bg-white md:w-[800px]" />
      <div className="flex flex-row items-center gap-x-[50%] px-2 pb-2 md:w-[800px]">
        <div>
          <h2 className="underline underline-offset-2">
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <>
                {recipe.ingredients.length}{" "}
                {recipe.ingredients.length === 1 ? "Ingredient" : "Ingredients"}
              </>
            ) : (
              "No Ingredients"
            )}
          </h2>
          <h2 className="underline underline-offset-2">
            {recipe.steps && recipe.steps.length > 0 ? (
              <>
                {recipe.steps.length}{" "}
                {recipe.steps.length === 1 ? "Step" : "Steps"}
              </>
            ) : (
              "No Steps"
            )}
          </h2>
        </div>

        <section>steps</section>

        <ul>
          {recipe.steps &&
            recipe.steps.map((step, index) => {
              return (
                <li key={index}>
                  <PrintingStep step={step} ingredients={recipe.ingredients} index={index} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default RecipePrintingView;
