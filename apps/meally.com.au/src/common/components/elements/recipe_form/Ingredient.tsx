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
  value: string;
  handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

interface DisplayAmountProps {
  unit: string;
  handleChange: (data: any) => void;
}

/* 
====================================
        Amount component
====================================
*/

const DisplayAmount = ({ unit, handleChange }: DisplayAmountProps) => {
  const [amount, setAmount] = useState<string>('');
  const [cupSelect, setCupSelect] = useState<string>('1/4');
  const [cupAmount, setCupAmount] = useState(undefined);

  useEffect(() => {
    if (units.includes(unit)) {
      if (unit == 'cup') {
        if (cupAmount! <= 0) {
          setAmount(cupSelect);
        }
        if (cupAmount! > 0) {
          setAmount(`${cupAmount} ${cupSelect}`);
        }
      }
    }
  }, [cupAmount, cupSelect]);

  function handleCupChange(event: any) {
    if (units.includes(unit)) {
      if (unit === 'cup') {
        if (event.target.name === 'amount') {
          setCupAmount(event.target.value);
        } else if (event.target.name === 'select') {
          setCupSelect(event.target.value);
        }
      }
    }
  }

  useEffect(() => {
    handleChange(amount);
  }, [amount]);

  if (units.includes(unit)) {
    if (unit === 'cup') {
      return (
        <>
          <input
            type="number"
            value={cupAmount || ''}
            onChange={handleCupChange}
            name="amount"
            min={0}
          />
          <select value={cupSelect} onChange={handleCupChange} name="select">
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

const Ingredient = ({
  index,
  value,
  handleChange,
  handleDelete,
}: IngredientProps) => {
  const [ingredientArray, setIngredientArray] = useState<string>('');
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<string>('gram');

  useEffect(() => {
    handleChange(index, ingredientArray);
  }, [ingredientArray]);

  useEffect(() => {
    setIngredientArray(`${ingredientItem} ${amount} ${unit}`);
  }, [ingredientItem, amount, unit]);

  function handleAmountChange(data: any) {
    setAmount(data);
  }

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
      <DisplayAmount handleChange={handleAmountChange} unit={unit} />
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



export { Ingredient };
