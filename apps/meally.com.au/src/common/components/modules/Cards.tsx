import React from 'react';
import Image from 'next/image';
import type { ImageProps, SimplifiedRecipe } from 'libs/types';
import { HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import UserService from '@lib/service/UserService';

function addBookMark(recipe: SimplifiedRecipe) {
  UserService.createBookMark({ ...recipe, collection: 'default' });
}

interface CardProps {
  recipe: SimplifiedRecipe;
}

const CardSquare = ({ recipe }: CardProps) => {
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-58 rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${recipe.id}`} className="text-center text-step--2">
        {recipe.recipeName}
      </Link>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{recipe.totalCookTime}</h3>
        <button onClick={() => addBookMark(recipe)}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={recipe.image.imgUrl}
        alt={recipe.image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

const CardRectangleSmall = ({ recipe }: CardProps) => {
  return (
    <div className="relative flex p-2 items-center justify-between flex-col h-58 w-46 rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${recipe.id}`} className="text-center text-step--2">
        {recipe.recipeName}
      </Link>
      <div className="flex flex-row w-full justify-between ">
        <h3 className="w-fit whitespace-nowrap">{recipe.totalCookTime}</h3>
        <button onClick={() => addBookMark(recipe)}>
          <HeartIcon className="w-8 h-8 cursor-pointer" />
          {/* Change width and height on different component types */}
        </button>
      </div>
      <Image
        src={recipe.image.imgUrl}
        alt={recipe.image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

const CardRectangle = ({ recipe }: CardProps) => {
  return (
    <div className="relative flex flex-col p-2 items-center justify-between  h-64 w-[43.75rem] resize rounded-xl text-black dark:text-white">
      <Link href={`/recipes/${recipe.id}`} className="text-center text-step1">
        {recipe.recipeName}
      </Link>
      <button
        onClick={() => addBookMark(recipe)}
        className="absolute right-2 bottom-2"
      >
        <HeartIcon className="w-8 h-8 cursor-pointer" />
        {/* Change width and height on different component types */}
      </button>
      <Image
        src={recipe.image.imgUrl}
        alt={recipe.image.imgAlt}
        fill
        priority
        className="rounded-xl object-cover h-58 w-46 -z-20"
      />
    </div>
  );
};

export { CardRectangleSmall, CardRectangle, CardSquare };
