"use client";
import { Info } from "@/src/server/db/types";
import React from "react";
import { CardSquare } from "../elements/Cards";
import { useSearchParams } from "next/navigation";
import type { IFuseOptions } from "fuse.js";
import dynamic from "next/dynamic";

interface RecipeCardsProps {
  recipes: Info[];
}

const RecipeCards = ({ recipes }: RecipeCardsProps) => {


  return (
    <section className="flex flex-wrap gap-2 p-3">
      {recipes.map((recipe) => {
        return <CardSquare key={recipe.id} recipe={recipe} />;
      })}
    </section>
  );
};

export default RecipeCards;
