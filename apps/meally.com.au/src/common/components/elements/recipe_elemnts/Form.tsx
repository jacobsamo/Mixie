'use client';
import { Recipe, Info } from 'libs/types';
import React, { useEffect, useReducer, useState } from 'react';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import {} from 'ui'

const initialRecipeState: Recipe = {
  id: '',
  imageUrl: '',
  recipeName: '',
  recipeDescription: '',
  keywords: [],
  ingredients: [],
  dietary: [],
  Allergens: [],
  sweet_savoury: '',
  meallyTime: [],
  version: '',
  createdBy: '',
  createdAt: '',
  info: {
    total: 0,
    prep: 0,
    cook: 0,
    serves: 0,
    rating: 0,
  },
  steps: [],
  madeRecipe: 0,
  savedRecipe: 0,
};

function recipeReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.payload };
    case 'SET_IMAGE_URL':
      return { ...state, imageUrl: action.payload };
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
      return { ...state, meallyTime: action.payload };
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

const TextArea = () => {
  const [textareaValue, setTextareaValue] = useState('');
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e: any) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      setTags([...tags, textareaValue]);
      setTextareaValue('');
    }
  };

  const handleChange = (e: any) => {
    setTags(e.target.value.split(','));
  };

  return (
    <label>
      textarea
      <div className="relative resize-none w-10 h-3">
        <ul className="absolute left-0">
          {tags.map((tag, index) => (
            <li key={index}>
              {tag}
              <button
                onClick={() => {
                  setTags(tags.filter((_, i) => i !== index));
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </label>
  );
};

const Form = () => {
  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipeState);

  useEffect(() => {
    localStorageService.setLocal('recipe', recipe);
  }, [recipe]);

  function handleChange(event: any) {
    dispatch({
      type: 'SET_' + event.target.name.toUpperCase(),
      payload: event.target.value,
    });
  }

  async function setAdditionalInformation() {
    dispatch({ type: 'SET_ID', payload: recipe.recipeName });
    dispatch({ type: 'SET_CREATED_BY', payload: 'Meally' });
    dispatch({ type: 'SET_CREATED_AT', payload: new Date() });
    dispatch({
      type: 'SET_TOTAL',
      payload: parseInt(recipe.info.prep) + parseInt(recipe.info.cook),
    });
  }

  async function handleSubmit(event: any) {
    await event.preventDefault();
    await setAdditionalInformation();
    RecipeService.createRecipe(recipe);
  }

  return (
    <>
      <h1>Recipe Creation Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-1/2">
        <input
          value={recipe.recipeName}
          type="text"
          required
          placeholder="Recipe name"
          name="recipe_name"
          onChange={handleChange}
        />
        <TextArea />
        <select name="dietary" id="dietary" value={recipe.dietary} onChange={handleChange}>
          <option value="value">value</option>
        </select>
        <select name="allergens" id="allergens" value={recipe.allergens} onChange={handleChange}>
          <option value="value">value</option>
        </select>
        <select name="sweet_savoury" id="sweet_savoury" value={recipe.sweet_savoury} onChange={handleChange}>
          <option value="sweet">sweet</option>
          <option value="savoury">savoury</option>
        </select>
        <select name="meal_time" id="meal_time" value={recipe.meal_time} onChange={handleChange}> 
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <input
          value={recipe.info.prep}
          type="number"
          required
          placeholder="Prep Time"
          name="prep"
          onChange={handleChange}
        />
        <input
          value={recipe.info.cook}
          type="number"
          required
          placeholder="Cook TIme"
          name="cook"
          onChange={handleChange}
        />
        <input
          value={recipe.info.serves}
          type="number"
          required
          placeholder="Number of Serves"
          name="serves"
          min="0"
          onChange={handleChange}
        />
        <input
          value={recipe.imageUrl}
          type="file"
          name="img_url"
          onChange={handleChange}
        />
        <TextField
          value={recipe.recipeDescription}
          type="text"
          required
          placeholder="Recipe Description"
          name="recipe_description"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;