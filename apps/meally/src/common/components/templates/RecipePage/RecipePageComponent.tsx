import React from 'react';
import Details from './Details';
import Info from './Info';
import StarRating from './StarRating';
import { Recipe } from '@/src/common/types/recipe';
import Image from 'next/image';

interface RecipePageComponentProps {
  recipe: Recipe;
}

const RecipePageComponent = ({ recipe }: RecipePageComponentProps) => {
  return (
    <main className="flex flex-col items-start  lg:ml-[20%] mb-14">
      <div className="flex flex-wrap gap-4 items-center">
        <h1 className="text-step2 font-semibold text-center">{recipe.title}</h1>
        <StarRating rating={recipe.info.rating} />
      </div>
      <Info info={recipe.info} title={recipe.title} />
      <div>
        <Image
          src={recipe.image.imgUrl}
          alt={recipe.image.imgAlt || recipe.title || 'recipe image'}
          width={800}
          height={600}
          className="rounded-xl aspect-video object-cover"
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
      <span className="w-full md:w-[800px] h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md " />
      <Details ingredients={recipe.ingredients} steps={recipe.steps} />
    </main>
  );
};

export default RecipePageComponent;
