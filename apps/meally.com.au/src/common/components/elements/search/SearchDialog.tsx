import React, { useEffect, useState } from 'react';
import { Dialog } from 'shared';
import Fuse from 'fuse.js';
import { GetServerSideProps } from 'next';
import RecipeService from '@lib/service/RecipeService';
import { Recipe, SimplifiedRecipe } from 'libs/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { SearchCard } from '@components/modules/Cards';

interface SearchDialogProps {
  buttonType: 'searchBar' | 'searchIcon';
}

const SearchDialog = ({ buttonType }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [recipes, setRecipes] = useState<SimplifiedRecipe[]>([]);

  const [returnedRecipes, setReturnedRecipes] = useState<SimplifiedRecipe[]>(
    []
  );

  useEffect(() => {
    RecipeService.getAllRecipesAsSimplified().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  function searchRecipes(query: string) {
    const options: Fuse.IFuseOptions<SimplifiedRecipe> = {
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
          overlay: 'fixed inset-0 z-50 md:w-1/2 w-full mx-auto',
          backgroundColor: false,
        }}
      >
        <div className=" top-0 pt-0 flex flex-col mx-auto mt-16 w-full justify-center items-center gap-2">
          <input
            className="w-full h-10 rounded-md focus:border-transparent"
            placeholder="Search for recipes"
            type="text"
            onChange={(event) => searchRecipes(event.target.value)}
          />
          <ul>
            {returnedRecipes.map((recipe) => (
              <SearchCard as="li" recipe={recipe} />
            ))}
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
