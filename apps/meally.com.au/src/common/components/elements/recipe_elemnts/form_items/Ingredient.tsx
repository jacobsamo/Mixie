import { TrashIcon } from '@heroicons/react/24/outline';
import { index } from 'mathjs';
import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'ui';
import styles from './Form.module.scss';

interface IngredientProps {
  index: number;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, handleChange, handleDelete }: IngredientProps) => {
  const [bodyValue, setBodyValue] = useState<string[]>(['', '', '']);

  function internalChange(event: any) {
    const ingredient = '';
    setBodyValue((prev) => {
      const newArray = [...prev];
      newArray[0] = event.target.value;
      return newArray;
    });
  }

  useEffect(() => {
    const ingredient = `${bodyValue[0]} ${bodyValue[1]} ${bodyValue[2]}`;
    handleChange(index, ingredient);
  }, [bodyValue]);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        // value={recipe.recipeDescription}
        type="text"
        required
        placeholder="Recipe Description"
        name="recipe_description"
        onChange={internalChange}
      />
      <select name="amount" id="amount">
        <option value="1">1</option>
      </select>
      <select name="unit" id="unit">
        <option value="1">1</option>
      </select>
      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

const IngredientContainer = (props: any) => {
  const [ingredientArray, setIngredientArray] = useState<string[]>(['']);

  function handleAddClick() {
    setIngredientArray([...ingredientArray, '']);
  }

  function handleChange(index: number, event: any): void {
    setIngredientArray((prev) => {
      const newArray = [...prev];
      newArray[index] = event;
      return newArray;
    });
  }

  function handleDelete(index: number) {
    setIngredientArray(ingredientArray.filter((_, i) => i !== index));
  }

  useEffect(() => {
    props.handleArrayChange(props.name, ingredientArray);
  }, [ingredientArray]);

  return (
    <>
      <article>
        <section
          className={`${styles.recipeIngredients} flex flex-col w-[12.5rem] gap-3`}
        >
          {ingredientArray.map((step, index) => {
            return (
              <Ingredient
                index={index}
                handleChange={handleChange}
                handleDelete={handleDelete}
              />
            );
          })}
          <AddButton
            type="button"
            name="Ingredient"
            onClick={() => handleAddClick()}
          />
        </section>
      </article>
    </>
  );
};

export { Ingredient, IngredientContainer };
