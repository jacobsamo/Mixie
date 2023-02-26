import React from "react";
import type { Recipe } from "libs/types";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";

interface recipeCardProps {
  id: string;
  imageUrl: string;
  recipeName: string;
  recipeDescription: string;
}

const RecipeCard = ({
  id,
  imageUrl,
  recipeName,
  recipeDescription,
}: recipeCardProps) => {
  return (
    <div
      key={id}
      className="relative w-46 h-58 dark:bg-grey bg-white rounded-xl cursor-pointer text-blue2"
    >
      <Image
        width={180}
        height={135}
        src={imageUrl}
        alt={recipeName}
        className="width-[180px] height-[135px] rounded-[12px 12px 0 0] absolute"
      />
      <h1 className="dark:text-white text-black text-sm font-Roboto font-bold absolute left-2 top-36">
        {recipeName}
      </h1>
      <h1 className="dark:text-white text-black absolute bottom-1 left-3">
        {id}
      </h1>
      <HeartIcon
        className="dark:text-white text-black cursor-pointer absolute bottom-1 right-1 w-6 h-6"
        onClick={() => console.log("heart icon clicked")}
      />
    </div>
  );
};

export { RecipeCard };
