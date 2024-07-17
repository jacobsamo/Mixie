"use client";
import { calculateAllIngredients, cn } from "@/lib/utils";
import type { Ingredient as IngredientType, Step } from "@/types";
import { cva } from "class-variance-authority";
import { useEffect, useMemo, useState } from "react";
import AddBatch from "./ingredient/add-batch";
import Ingredient from "./ingredient/ingredient";
import StepContainer from "./step/step-container";
import { useRecipeContext } from "./recipe-provider";

//title styles for the ingredients and steps section with cva (class variance authority) to remove the underline from the h2
const titleStyles = cva("md:cursor-default", {
  variants: {
    variant: {
      true: "underline underline-offset-2 dark:bg-background bg-secondary/50 p-2 rounded-md",
      false: "underline-none p-2 rounded-md",
    },
  },
  defaultVariants: {
    variant: true,
  },
});

const Details = () => {
  const { recipe } = useRecipeContext();
  const [add, setAdd] = useState(0);
  const [ingredientOpen, setIngredientOpen] = useState(true);
  const [stepsOpen, setStepsOpen] = useState(true);

  const calculatedIngredients = useMemo(() => {
    return calculateAllIngredients(recipe.ingredients, add);
  }, [add, recipe.ingredients]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (mediaQuery: any) => {
      if (mediaQuery.matches) {
        setStepsOpen(false);
        setIngredientOpen(true);
      } else {
        setStepsOpen(true);
        setIngredientOpen(true);
      }
    };

    handleMediaQueryChange(mediaQuery); // call the function on initial load
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex w-full flex-row items-center gap-x-[50%] px-2 pb-2 md:w-[800px]",
          {
            "dark:bg-grey shadow border mx-2 my-2 rounded-md p-1":
              window.innerWidth <= 768,
          }
        )}
      >
        <button
          onClick={() => {
            if (window.innerWidth <= 768) {
              setIngredientOpen(true);
              setStepsOpen(false);
            }
          }}
        >
          <h2 className={titleStyles({ variant: ingredientOpen })}>
            {recipe.ingredients.length > 0 ? (
              <>
                {recipe.ingredients.length}{" "}
                {recipe.ingredients.length === 1 ? "Ingredient" : "Ingredients"}
              </>
            ) : (
              "No Ingredients"
            )}
          </h2>
        </button>
        <button
          onClick={() => {
            if (window.innerWidth <= 768) {
              setStepsOpen(true);
              setIngredientOpen(false);
            }
          }}
        >
          <h2 className={titleStyles({ variant: stepsOpen })}>
            {recipe.steps.length > 0 ? (
              <>
                {recipe.steps.length}{" "}
                {recipe.steps.length === 1 ? "Step" : "Steps"}
              </>
            ) : (
              "No Steps"
            )}
          </h2>
        </button>
      </div>

      <section className="flex w-full flex-row md:w-[800px] md:gap-4 lg:gap-8">
        {ingredientOpen && (
          <div className="flex h-fit w-full min-w-[250px] flex-col items-start rounded-lg bg-white p-2 shadow md:w-60 dark:bg-grey ">
            <AddBatch add={add} setAdd={setAdd} />
            <ul>
              {calculatedIngredients.map((ingredient, index) => {
                if (ingredient.isHeading)
                  return (
                    <li key={index}>
                      <h3 className="text-2xl font-bold">{ingredient.text}</h3>
                    </li>
                  );
                return <Ingredient key={index} ingredient={ingredient} />;
              })}
            </ul>
          </div>
        )}
        {stepsOpen && (
          <StepContainer
            steps={recipe.steps}
            ingredients={calculatedIngredients}
          />
        )}
      </section>
    </>
  );
};

export default Details;
