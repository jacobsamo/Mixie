import React, { useEffect, useState } from 'react';
import { Dialog } from 'shared';
import Fuse from 'fuse.js';
import { GetServerSideProps } from 'next';
import RecipeService from '@lib/service/RecipeService';
import { Recipe } from 'libs/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface SearchDialogProps {
  buttonType: 'searchBar' | 'searchIcon';
}

const SearchDialog = ({ buttonType }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [returnedRecipes, setReturnedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    RecipeService.getAllRecipes().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  function searchRecipes(query: string) {
    const options: Fuse.IFuseOptions<Recipe> = {
      includeScore: true,
      keys: ['recipeName', 'recipeDescription', 'keywords'],
    };
    const fuse = new Fuse(recipes, options);
    const result = fuse.search(query);

    setReturnedRecipes(result.map((item) => item.item));
  }
  return (
    <div>
      {buttonType === 'searchBar' && (
        <button
          onClick={() => setOpen(!open)}
          // style={{ width: '28rem', height: '2.8rem' }}
          className="dark:bg-dark_grey dark:text-white p-1 pr-5 min-w-max max-w-[28rem] h-[2.8rem] resize bg-white shadow-searchBarShadow relative flex items-center rounded-xl"
        >
          <MagnifyingGlassIcon className="h-5 w-5 ml-5" />
          <span className="m-1">Search by keyword, ingredient or recipes</span>
        </button>
      )}
      {buttonType === 'searchIcon' && (
        <button onClick={() => setOpen(!open)}>
          <MagnifyingGlassIcon className="h-8 w-8" />
        </button>
      )}
      <Dialog
        isOpen={open}
        setOpen={() => setOpen(false)}
        closeOnEscape={true}
        closeOnOutsideClick={true}
        classNames={{
          container:
            'flex flex-col justify-center items-center gap-2 sticky w-max h-max',
        }}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <input
            className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Search for recipes"
            type="text"
            onChange={(event) => searchRecipes(event.target.value)}
          />
        </div>
        <ul>
          {returnedRecipes.map((recipe) => (
            <li className="flex flex-row rounded-md bg-grey">
              <Image
                src={recipe.image.imgUrl}
                alt={recipe.image.imgAlt}
                width={100}
                height={100}
                className="w-24 h-24 rounded-lg"
              />
              <div>
                <h1>{recipe.recipeName}</h1>
                <div className="flex flex-row flex-wrap gap-1 w-full">
                  {returnedRecipes.map((recipe, index) => {
                    return (
                      <p
                        key={index}
                        className="text-center w-fit h-fit p-1 rounded-lg text-step--4 bg-yellow opacity-80 text-black"
                      >
                        {recipe.keywords[index].value}
                      </p>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
