import type { NextPage } from 'next'
import { Head } from 'next/document';
import React, { useState, useEffect } from 'react';
import styles from '@styles/RecipePage.module.scss';
import RecipeService from '@lib/service/RecipeService';

export async function getStaticProps() {
  const recipes = await RecipeService.getAllRecipes();
  return {
    props: {
      recipes: recipes,
    },
  };
}

const RecipesPages: NextPage = ({recipes}: any) => {
  console.log(recipes);
  return (
    <>
      <h1>Recipes page</h1>
    </>
  )
}

export default RecipesPages