import RecipeService from '@lib/service/RecipeService';
import type { NextPage } from 'next'
import { Head } from 'next/document';
import React, { useState, useEffect } from 'react';

export async function getStaticPaths() {
    const recipes = await RecipeService.getAllRecipes();
    
    const paths = recipes.map((recipe) => {
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
    JSON.parse(JSON.stringify(recipe))
    return {
        props: {
            recipe
        },
    };
}



export default function Recipe({}) {
    return (
        <>
            <h1>Recipe</h1>
        </>
    )
}