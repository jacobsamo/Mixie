import React from 'react';
import Details from './Details';
import Info from './Info';
import StarRating from './StarRating';
import type { NewRecipe, Recipe } from '@/src/db/types';
import Image from 'next/image';
import { recipeFormSchema } from '@/src/db/zodSchemas';
import * as z from 'zod';

interface RecipePageComponentProps {
  recipe: Recipe | NewRecipe | z.infer<typeof recipeFormSchema>;
}

// TODO: user `next-seo` for ld+json for the recipe schema
const RecipePageComponent = ({ recipe }: RecipePageComponentProps) => {
  return (
    <main className="flex flex-col items-start  lg:ml-[20%] mb-14">
      <div className="flex flex-wrap gap-4 items-center">
        <h1 className="text-step2 font-semibold text-center">{recipe.title}</h1>
        <StarRating rating={recipe.info?.rating || 0} />
      </div>
      <Info info={recipe.info} />
      <div>
        <Image
          src={recipe?.imgUrl || '/images/placeholder.png'}
          alt={recipe.imgAlt || recipe.title || 'recipe image'}
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
      <Details
        ingredients={recipe.ingredients || []}
        steps={recipe.steps || []}
      />
    </main>
  );
};

export default RecipePageComponent;
