import { Recipe, SimplifiedRecipe } from 'libs/types';
import localStorageService from 'libs/utils/localStorageService';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'shared/src/components/buttons/Button';

const DraftRecipes = () => {
  const [recipes, setRecipes] = useState([] as SimplifiedRecipe[]);
  const router = useRouter();

  function allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }

    return values;
  }

  async function getDraftRecipes() {
    const draftRecipes: SimplifiedRecipe[] = [];
    const keys = allStorage();
    const recipeKeys = keys.filter((key: any) => key.startsWith('recipe-'));
    recipeKeys.forEach(async (key: any) => {
      const recipe = await localStorageService.readLocal<Recipe>(key);
      if (recipe) {
        draftRecipes.push({
          id: recipe.id,
          recipeName: recipe?.recipeName,
          image: recipe?.image,
          keywords: recipe?.keywords,
          lastViewed: recipe?.lastViewed,
          privacy: 'public',
          totalCookTime: recipe?.info?.total,
        });
      }
    });
    return draftRecipes;
  }

  useEffect(() => {
    getDraftRecipes().then((draftRecipes) => setRecipes(draftRecipes));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-auto mt-5 p-2 rounded-md w-1/2 dark:shadow-none dark:bg-dark_grey bg-white shadow-main ">
      {!recipes && <p>No draft recipes</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h1>{recipe.recipeName}</h1>
          <p>{recipe.totalCookTime}</p>
        </div>
      ))}
      <Button
        onClick={() => router.push('?recipe=new&view=form')}
        className="mt-48"
      >
        Create
      </Button>
    </div>
  );
};

export default DraftRecipes;
