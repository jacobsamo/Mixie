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
    let input;
    if (units.includes(unit)) {
      if (unit === 'cup') {
        return (
          <select>
            <option value="1/4">1/4 cup</option>
            <option value="1/2">1/2 cup</option>
            <option value="3/4">3/4 cup</option>
            <option value="1">1 cup</option>
          </select>
        );
      } else if (unit === 'custom') {
        return (
          <input type="text" value={amount} onChange={handleAmountChange} />
        );
      }
    }

    return (
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />
    );
  };

  return (
    <section key={index} className={styles.ingredient}>
      <input
        // value={recipe.recipeDescription}
        type="text"
        required
        placeholder="ingredient"
        name="ingredient"
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
        {units.map((unit, index) => {
          return (
            <option value={unit} key={index}>
              {unit}
            </option>
          );
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
                key={index}
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
