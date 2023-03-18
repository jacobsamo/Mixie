import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { dietaryRequirements, initialRecipeState } from '@lib/service/data';

class RecipeForm {
  recipeReducer(state: any, action: any) {
    switch (action.type) {
      case 'SET_ID':
        return { ...state, id: action.payload };
      case 'SET_IMAGE_URL':
        return { ...state, image: { ...state.image, imgUrl: action.payload } };
      case 'SET_IMAGE_ALT':
        return { ...state, image: { ...state.image, imgAlt: action.payload } };
      case 'SET_RECIPE_NAME':
        return { ...state, recipeName: action.payload };
      case 'SET_RECIPE_DESCRIPTION':
        return { ...state, recipeDescription: action.payload };
      case 'SET_KEYWORDS':
        return { ...state, keywords: action.payload };
      case 'SET_INGREDIENTS':
        return { ...state, ingredients: action.payload };
      case 'SET_DIETARY':
        return { ...state, dietary: action.payload };
      case 'SET_ALLERGENS':
        return { ...state, Allergens: action.payload };
      case 'SET_SWEET_SAVOURY':
        return { ...state, sweet_savoury: action.payload };
      case 'SET_MEAL_TIME':
        return { ...state, mealTime: action.payload };
      case 'SET_VERSION':
        return { ...state, version: action.payload };
      case 'SET_CREATED_BY':
        return { ...state, createdBy: action.payload };
      case 'SET_CREATED_AT':
        return { ...state, createdAt: action.payload };
      case 'SET_TOTAL':
        return { ...state, info: { ...state.info, total: action.payload } };
      case 'SET_PREP':
        return { ...state, info: { ...state.info, prep: action.payload } };
      case 'SET_COOK':
        return { ...state, info: { ...state.info, cook: action.payload } };
      case 'SET_SERVES':
        return { ...state, info: { ...state.info, serves: action.payload } };
      case 'SET_RATING':
        return { ...state, info: { ...state.info, rating: action.payload } };
      case 'SET_STEPS':
        return { ...state, steps: action.payload };
      case 'SET_MADE_RECIPE':
        return { ...state, madeRecipe: action.payload };
      case 'SET_SAVED_RECIPE':
        return { ...state, savedRecipe: action.payload };
      default:
        throw new Error();
    }
  }
}

export default new RecipeForm();
