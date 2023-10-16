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
    <div className="hidden w-full flex-col items-start print:flex">
      <span className="flex flex-row gap-1">
        {/* Logo image */}
        <Image
          width={44}
          height={44}
          src="/favicon.ico"
          alt="Logo"
          className="h-11 w-11 rounded-full"
        />
        {/* Logo text */}
        <h1 className="text-step--1">Meally</h1>
      </span>

      <section>
        <div className="flex flex-wrap items-center gap-4">
          <h1 id="title" className="text-center text-step2 font-semibold">
            {recipe.title}
          </h1>
        </div>
        <span className="flex flex-row">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return recipe.info.rating && index <= recipe.info.rating ? (
              <StarIcon className="h-w-8 w-8 fill-[#ffe14cf6] text-[#ffe14cf6]" />
            ) : (
              <StarIcon className="h-w-8 w-8" />
            );
          })}
        </span>
        <Info info={recipe.info} />
      </section>

      <section className="w-full pb-12">
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
        <p className="text-blue underline underline-offset-2 opacity-50">
          https://meally.com.au/recipes/{recipe.id}
        </p>
      </section>

      <h2 className="text-step1">
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <>
            {recipe.ingredients.length}{" "}
            {recipe.ingredients.length === 1 ? "Ingredient" : "Ingredients"}
          </>
        ) : (
          "No Ingredients"
        )}
      </h2>

      <span className="my-2 mb-4 h-[0.125rem] w-full rounded-md bg-grey dark:bg-white md:w-[800px]" />

      <ol className="pb-12">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => {
            return (
              <li key={index} className="flex flex-row gap-4 whitespace-normal">
                {index + 1}. <p>{ingredient.title}</p>
              </li>
            );
          })}
      </ol>

      <h2 className="text-step1">
        {recipe.steps && recipe.steps.length > 0 ? (
          <>
            {recipe.steps.length} {recipe.steps.length === 1 ? "Step" : "Steps"}
          </>
        ) : (
          "No Steps"
        )}
      </h2>
      <span className="my-2 mb-4 h-[0.125rem] w-full rounded-md bg-grey dark:bg-white md:w-[800px]" />
      <ul>
        {recipe.steps &&
          recipe.steps.map((step, index) => {
            return (
              <li key={index}>
                <PrintingStep
                  step={step}
                  ingredients={recipe.ingredients || []}
                  index={index}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RecipePrintingView;
