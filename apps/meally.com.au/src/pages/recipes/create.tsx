import AuthDialog from '@components/elements/AuthDialog';
import RecipeFromLayout from '@components/templates/RecipeFormTemplate';
import React from 'react';
import { NextPage } from 'next';
import Custom404 from '@components/layouts/Custom404';
import useUser from 'src/common/hooks/useUser';
import { auth } from '@lib/config/firebase';


const Create: NextPage = () => {
  const user = useUser();

  return (
    <>
      <AuthDialog requiresAuth />
      {user ? (
        <RecipeFromLayout />
      ) : (
        <Custom404>
          You have to be logged in to access this page. click the signup button
          to log in
        </Custom404>
      )}
    </>
  );
};

export default Create;
