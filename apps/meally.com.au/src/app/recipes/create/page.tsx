"use client";
import AuthDialog from '@components/elements/AuthDialog';
import RecipeFromLayout from '@components/templates/RecipeFormTemplate';
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { auth } from '@lib/config/firebase';
import Custom404 from '@components/layouts/Custom404';
import useUser from 'src/common/hooks/useUser';
import { useRouter, useParams } from 'next/navigation';
import { Recipe, SimplifiedRecipe } from 'libs/types';
import localStorageService from 'libs/utils/localStorageService';
import DraftRecipes from '@components/elements/DraftRecipes';

const Create: NextPage = () => {
  const { user } = useUser();
  const prams = useParams();


  return (
    <>
      {/* <AuthDialog requiresAuth />
      {user && query !== 'new' && <RecipeFromLayout recipeId={query} />}
      {user && !query && (
        <>
          <DraftRecipes />
        </>
      )}
      {!user && (
        <Custom404>You have to be logged in to create a recipe</Custom404>
      )} */}
      <h1>prams</h1>
    </>
  );
};

export default Create;
