import RecipeService from '@lib/service/RecipeService';
import {server} from '@lib/config/index';
import {Recipe} from '@lib/types/recipe';
import type { NextPage } from 'next'
import { Head } from 'next/document';
import React, { useState, useEffect } from 'react';
interface Props {
    recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {
    return (
        <>
            <h1>Recipe</h1>
            <h1>{recipe.recipeName}</h1>
        </>
    )
}


export async function getStaticPaths() {
    const recipes = await RecipeService.getAllRecipes()
    const paths = recipes.map((recipe: any) => {
        return { params: { id: recipe.id.toString() } };
    });

    return {
        paths,
        fallback: false, 
    };
}

export async function getStaticProps(context: any) {
    const recipe = await RecipeService.getRecipe(context.params.id);
    if (!recipe || !Object.keys(recipe).length) {
        return {
            redirect: {
                permanent: false,
                destination: "/404",
            },
        };
    }
    return {
        props: {
            recipe
        },
    };
}



