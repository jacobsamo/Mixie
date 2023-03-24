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

const Ingredient = ({
  index,
  value,
  handleChange,
  handleDelete,
}: IngredientProps) => {
  const [ingredientArray, setIngredientArray] = useState<string>('');
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [unit, setUnit] = useState<string>('gram');
  const [amount, setAmount] = useState<string>('');
  const [cupSelect, setCupSelect] = useState<string>('');

  useEffect(() => {
    handleChange(index, ingredientArray);
  }, [ingredientArray]);

  useEffect(() => {
    setIngredientArray(
      `${ingredientItem.trim()} | ${amount.trim()} | ${unit.trim()}`
    );
  }, [ingredientItem, amount, unit]);

  useEffect(() => {
    setAmount(`${amount.split(' ')[0] || ''} ${cupSelect}`);
  }, [cupSelect]);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        value={value.split('|')[0]?.trim() || ingredientItem}
        type="text"
        required
        placeholder="ingredient"
        name="ingredient"
        onChange={(event: any) => setIngredientItem(event.target.value)}
      />
      <select
        name="unit"
        id="unit"
        className=""
        value={value.split('|')[2]?.trim() || unit}
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
      <input
        type="number"
        placeholder="Amount"
        min={0}
        // value={amount.split(' ')[0] || amount}
        value={value.split('|')[1]?.trim().split(' ')[0] || amount}
        onChange={(event: any) => setAmount(event.target.value)}
      />
      {((unit || value.split('|')[1]?.trim().split(' ')[0]) == 'cup' ||
        (unit || value.split('|')[1]?.trim().split(' ')[0]) == 'tbsp' ||
        (unit || value.split('|')[1]?.trim().split(' ')[0]) == 'tsp') && (
        <select
          name="select"
          id="select"
          value={value.split('|')[1]?.trim().split(' ')[1] || cupSelect}
          onChange={(event: any) => setCupSelect(event?.target.value)}
        >
          <option value=" "></option>
          <option value="1/4">1/4 {unit}</option>
          <option value="1/2">1/2 {unit}</option>
          <option value="3/4">3/4 {unit}</option>
        </select>
      )}
      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
