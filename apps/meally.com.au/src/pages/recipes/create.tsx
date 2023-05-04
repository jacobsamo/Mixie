import AuthDialog from '@components/elements/AuthDialog';
import RecipeFromLayout from '@components/templates/RecipeFormTemplate';
import React from 'react';
import { NextPage } from 'next';
import { auth } from '@lib/config/firebase';
import Custom404 from '@components/layouts/Custom404';

const Create: NextPage = () => {
  return (
    <>
      <AuthDialog requiresAuth />
      {auth.currentUser && <RecipeFromLayout />}
      {!auth.currentUser && (
        <Custom404>You have to be logged in to create a recipe</Custom404>
      )}
    </>
  );
};

export default Create;
