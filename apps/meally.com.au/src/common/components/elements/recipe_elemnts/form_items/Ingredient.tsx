import { TrashIcon } from '@heroicons/react/24/outline';
import { index } from 'mathjs';
import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'ui';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';

interface IngredientProps {
  index: number;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

const Ingredient = ({ index, handleChange, handleDelete }: IngredientProps) => {
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<string>('');

  function handleIngredientItemChange(event: any) {
    setIngredientItem(event.target.value);
  }

  function handleAmountChange(event: any) {
    setAmount(event.target.value);
  }

  function handleUnitChange(event: any) {
    setUnit(event.target.value);
  }

  useEffect(() => {
    const ingredient = `${ingredientItem} ${amount} ${unit}`;
    handleChange(index, ingredient);
  }, [ingredientItem, amount, unit]);


  
  const DisplayAmount = () => {
    switch (unit) {
      case 'gram' || 'kg' || 'ml' || 'item' || 'litre' || 'tsp' || 'tbsp':
        return (
          <>
            <input
              // value={recipe.recipeDescription}
              type="number"
              required
              placeholder="Recipe Description"
              name="recipe_description"
              onChange={handleAmountChange}
            />
          </>
        );
      case 'cup':
        return <></>;
      case 'pinch':
        return <></>;
      case 'custom':
        return (
          <>
            <input
              // value={recipe.recipeDescription}
              type="text"
              required
              placeholder="Recipe Description"
              name="recipe_description"
              onChange={handleAmountChange}
            />
          </>
        );
      default:
        return;
    }
    return (
      <div>Ingredient</div>
    )
  }
  
  
  return (
    <section key={index} className={styles.ingredient}>
      <input
        // value={recipe.recipeDescription}
        type="text"
        required
        placeholder="Recipe Description"
        name="recipe_description"
        onChange={handleIngredientItemChange}
      />
      <DisplayAmount />
      <select
        name="unit"
        id="unit"
        className=""
        value={unit}
        onChange={(event: any) => setUnit(event?.target.value)}
      >
        {units.map((unit) => {
          return <option value={unit}>{unit}</option>;
        })}
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
