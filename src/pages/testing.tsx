import { NextPage } from 'next/types';
import React, { useState } from 'react';

import RecipeService from "../common/shared/libs/service/RecipeService";

const Testing: NextPage = () => {
  const [recipeData, setRecipeData] = useState([]);

  const testData = {
    id: 'testDoc',
    imageUrl: 'https://img.taste.com.au/gOpVgvz8/taste/2016/11/classic-chewy-brownie-102727-1.jpeg',
    recipeName: 'Chocolate fudge Brownies',
    info: {
        total: '30min',
        prep: '10min',
        cook: '20min',
        serves: '6',
        rating: 4,
    },
    ingredients: ['flour', 'vinila essene', 'co co powder'],
    steps: [
        {
            number: 1,
            body: 'Preheat Oven to 180 degrees and grease a tray line with baking paper '
        },
        {
            number: 2,
            body: 'Melt butter'
        }
    ],
    createdAt: Date.now().toString(),
    createdBy: 'Jacob Samorowski',
  }

  const onSendData = async () => {
    const data = await RecipeService.createRecipe(testData);
  };
  const getData = async () => {
    const recipes = await RecipeService.getAllRecipes()
    // setRecipeData([recipes, ...recipeData]);
  };

    const Recipes = () => {
        if (recipeData.length === 0) {
            return <h1>Loading...</h1>
        }
        if (recipeData.length !== 0) {
            return <>
                <ul>
                    {recipeData.map(recipe => <li>{recipe}</li>)}
                </ul>
            </>
        }
        else {
            return <></>
        }
    }

  return (
    <>
      <button onClick={onSendData}>Send data</button>
      <button onClick={getData}>Get data</button>
      <Recipes />
    </>
  );
};

export default Testing;
