import { TrashIcon } from '@heroicons/react/24/outline';
import { index } from 'mathjs';
import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'ui';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';

/* 
====================================
          Interfaces
====================================
*/

interface IngredientProps {
  index: number;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

/* 
====================================
        Amount component
====================================
*/

const DisplayAmount = (props: any) => {
  const [amount, setAmount] = useState('');
  const [cup, setCup] = useState(0);

  useEffect(() => {
    if (units.includes(unit)) {
      if (unit === 'cup') {
        setAmount(`${cup} ${amount}`);
      } else if (unit === 'custom') {
        setAmount(amount);
      }
    }
  }, [cup]);

  useEffect(() => {
    props.handleChange(amount);
  }, [amount]);

  const unit = props.unit;

  if (units.includes(unit)) {
    if (unit === 'cup') {
      return (
        <>
          <input
            type="number"
            value={cup}
            onChange={(event: any) => setCup(event.target.value)}
          />
          <select
            value={amount}
            onChange={(event: any) => setAmount(event.target.value)}
          >
            <option value="1/4">1/4 cup</option>
            <option value="1/2">1/2 cup</option>
            <option value="3/4">3/4 cup</option>
            <option value="1">1 cup</option>
          </select>
        </>
      );
    } else if (unit === 'custom') {
      return (
        <input
          type="text"
          value={amount}
          onChange={(event: any) => setAmount(event.target.value)}
        />
      );
    }
  }

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  return (
    <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(event: any) => setAmount(event.target.value)}
    />
  );
};

/* 
====================================
          Ingredient
====================================
*/

const Ingredient = ({ index, handleChange, handleDelete }: IngredientProps) => {
  const [ingredientArray, setIngredientArray] = useState<string>('');
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<string>('gram');

  useEffect(() => {
    handleChange(index, ingredientArray);
  }, [ingredientArray]);

  useEffect(() => {
    setIngredientArray(`${ingredientItem} ${amount} ${unit}`);
    console.log(`${ingredientItem} ${amount} ${unit}`);
  }, [ingredientItem, amount, unit]);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        // value={recipe.recipeDescription}
        type="text"
        required
        placeholder="ingredient"
        name="ingredient"
        onChange={(event: any) => setIngredientItem(event.target.value)}
      />
      <DisplayAmount handleChange={() => setAmount} unit={unit} />
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

/* 
====================================
            Container
====================================
*/

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
