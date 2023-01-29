'use client';
import { Recipe, Info } from 'libs/types';
import Image from 'next/image';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import localStorageService from 'libs/utils/localStorage';
import RecipeService from '@lib/service/RecipeService';
import { dietaryRequirements, initialRecipeState } from '@lib/service/data';
import styles from './Form.module.scss';
import { InputField, AddButton, Dialog } from 'ui';
import { XMarkIcon } from '@heroicons/react/24/outline';

function recipeReducer(state: any, action: any) {
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

const Ingredient = (props: any) => {
  return (
    <div className="flex flex-row items-center py-1 gap-1">
      <input type="checkbox" />
    </div>
  );
};

const Step = (props: any) => {
  const [bodyValue, setBodyValue] = useState('');

  function handleChange(event: any) {
    setBodyValue(event.target.value);
    props.handleChange(props.index, event.target.value);
  }

  return (
    <section
      key={props.index}
      className="relative flex flex-col items-start p-3 rounded-md h-fit w-96 flex-grow bg-white text-black dark:bg-gray-700 dark:text-black"
    >
      <h1 className="font-medium font-Roboto text-sm">Step {1}</h1>
      <label>
        <textarea
          name="step_body"
          id="step_body"
          onChange={handleChange}
          value={bodyValue}
        />
      </label>
      <button onClick={() => props.handleDelete(props.index)}>delete</button>
    </section>
  );
};

const StepContainer = (props: any) => {
  const [stepArray, setStepArray] = useState<string[]>([]);

  function handleAddClick() {
    setStepArray([...stepArray, '']);
  }

  function handleChange(index: number, event: any): void {
    console.log('index: ', index);
    console.log('event: ', event);
    setStepArray((prev) => {
      const newArray = [...prev];
      newArray[index] = event;
      return newArray;
    });
  }

  function handleDelete(index: number) {
    setStepArray(stepArray.filter((_, i) => i !== index));
  }

  useEffect(() => {
    props.handleArrayChange(props.name, stepArray);
  }, [stepArray]);

  return (
    <article className={styles.method_container}>
      <div className={styles.step_container}>
        {stepArray.map((step, index) => {
          return (
            <Step
              index={index}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          );
        })}
        <AddButton type="button" name="Step" />
      </div>
    </article>
  );
};

const IngredientContainer = (props: any) => {
  return <></>;
};

const TextArea = (props: any) => {
  const [textareaValue, setTextareaValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === ',' || e.key === 'Enter') {
        e.preventDefault();
        setTags([...tags, textareaValue]);
        setTextareaValue('');
      }
    },
    [textareaValue, tags]
  );

  useEffect(() => {
    props.onTagsChange(props.name, tags);
  }, [tags]);

  return (
    <label className={styles.textarea_container}>
      {props.label}
      <textarea
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.textarea}
        name={props.name}
        placeholder={props.placeholder}
      />
      <div className={styles.textarea_tags}>
        {tags.map((tag, index) => (
          <span key={index}>
            {tag}
            <button
              onClick={() => {
                setTags(tags.filter((_, i) => i !== index));
              }}
              type="button"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </span>
        ))}
      </div>
    </label>
  );
};

const ImageFile = (props: any) => {
  interface imgProps {
    imgUrl: string;
    imgAlt: string;
  }
  const [img, setImg] = useState<imgProps[]>([]);
  const [imgUrl, setImgUrl] = useState('');
  const [imgAlt, setImgAlt] = useState('');
  const [open, setOpen] = useState(false);

  function handleSave() {
    setImg([{ imgUrl, imgAlt }]);
    setOpen(false);
  }

  const ImageUploadDialog = () => {
    return (
      <>
        <Dialog
          open={open}
          setOpen={setOpen}
          className="flex justify-center items-center w-full h-full"
        >
          <div className="flex flex-col gap-2 bg-dark_grey p-20 rounded-md">
            <InputField
              value={imgUrl}
              type="text"
              required
              placeholder="Image url"
              name="imgUrl"
              onChange={(e: any) => setImgUrl(e.target.value)}
            />
            <InputField
              value={imgAlt}
              type="text"
              placeholder="Image description e.g chocolate brownies"
              name="imgAlt"
              onChange={(e: any) => setImgAlt(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        </Dialog>
      </>
    );
  };

  const RecipeImage = () => {
    return (
      <>
        {img.map((img, index) => (
          <Image
            src={img?.imgUrl || ''}
            alt={img?.imgAlt || ''}
            width={800}
            height={600}
            priority
          />
        ))}
      </>
    );
  };

  return (
    <div className={styles.fileInput}>
      <AddButton
        type="button"
        name="Image"
        onClick={() => {
          setOpen(true);
        }}
      />
      <ImageUploadDialog />
    </div>
  );
};

/* 
  =========================================
              FORM COMPONENT
  =========================================
*/

const Form = () => {
  const [recipe, dispatch] = useReducer(recipeReducer, initialRecipeState);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  function handleChange(event: any) {
    dispatch({
      type: 'SET_' + event.target.name.toUpperCase(),
      payload: event.target.value,
    });
  }

  const handleArrayChange = (name: string, payload: string[]) => {
    dispatch({ type: 'SET_' + name.toUpperCase(), payload: payload });
  };

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
    await RecipeService.createRecipe(recipe);
    console.log(recipe);
  }

  useEffect(() => {
    localStorageService.setLocal('recipe', recipe);
  }, [recipe]);

  useEffect(() => {
    if (recipe.recipeName !== '') {
      setAdditionalInformation();
    }
  }, [recipe.recipeName, recipe.info.prep, recipe.info.cook]);

  return (
    <>
      <h1>Recipe Creation Form</h1>
      <form onSubmit={handleSubmit} className={styles.recipeForm}>
        <InputField
          value={recipe.recipeName}
          type="text"
          required
          placeholder="Recipe name"
          name="recipe_name"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.prep}
          type="number"
          required
          placeholder="Prep Time"
          name="prep"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.cook}
          type="number"
          required
          placeholder="Cook TIme"
          name="cook"
          min="0"
          onChange={handleChange}
        />
        <InputField
          value={recipe.info.serves}
          type="number"
          required
          placeholder="Number of Serves"
          name="serves"
          min="0"
          onChange={handleChange}
        />
        <label className="flex flex-col">
          Dietary requirements
          <select
            name="dietary"
            id="dietary"
            value={recipe.dietary}
            onChange={handleChange}
          >
            {dietaryRequirements.map((dietaryRequirement) => (
              <option
                value={dietaryRequirement}
                key={dietaryRequirement.length * Math.random()}
              >
                {dietaryRequirement}
              </option>
            ))}
          </select>
        </label>
        <TextArea
          name="allergens"
          label="contains:"
          onTagsChange={handleArrayChange}
          placeholder="E.g gluten, dairy, nuts"
        />
        <select
          name="sweet_savoury"
          id="sweet_savoury"
          value={recipe.sweet_savoury}
          onChange={handleChange}
        >
          <option value="sweet">sweet</option>
          <option value="savoury">savoury</option>
          <option value="both">both sweet and savoury</option>
        </select>

        <ImageFile />
        <InputField
          value={recipe.recipeDescription}
          type="text"
          required
          placeholder="Recipe Description"
          name="recipe_description"
          onChange={handleChange}
        />
        <select
          name="meal_time"
          id="meal_time"
          value={recipe.meal_time}
          onChange={handleChange}
        >
          <option value="breakfast">breakfast</option>
          <option value="lunch">lunch</option>
          <option value="dinner">dinner</option>
          <option value="snack">snack</option>
        </select>
        <TextArea
          name="keywords"
          label="keywords:"
          onTagsChange={handleArrayChange}
        />

        <span className="w-full h-[0.125rem] my-2 mb-4 dark:bg-white bg-dark_grey rounded-md "></span>

        <article className={styles.IngredientMethodContainer}>
          <section
            className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3`}
          >
            <Ingredient />
            <AddButton type="button" name="Ingredient" />
          </section>
        </article>

        <StepContainer handleArrayChange={handleArrayChange} name="steps" />
        <IngredientContainer handleArrayChange={handleArrayChange} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
