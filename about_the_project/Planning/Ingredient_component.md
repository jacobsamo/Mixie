So the ingredient component needs a lot of reworking so it works with react hook form

orginal code:

```jsx
import { TrashIcon } from '@heroicons/react/24/outline';
import { index } from 'mathjs';
import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'shared';
import styles from './Form.module.scss';
import { units } from '@lib/service/data';
import { Control, UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';

/*
====================================
          Interfaces
====================================
*/

interface IngredientProps {
  index: number;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>
  // handleChange: (index: number, event: any) => void;
  handleDelete: (index: number) => void;
}

const Ingredient = ({
  index,
  setValue,
  getValues,
  // handleChange,
  handleDelete,
}: IngredientProps) => {
  const [ingredientArray, setIngredientArray] = useState<string>('');
  const [ingredientItem, setIngredientItem] = useState<string>('');
  const [unit, setUnit] = useState<string>('gram');
  const [amount, setAmount] = useState<string>('');
  const [cupSelect, setCupSelect] = useState<string>('');

  useEffect(() => {
    // handleChange(index, `${ingredientItem} | ${amount} ${cupSelect} | ${unit}`);
    setIngredientArray(`${ingredientItem} | ${amount} ${cupSelect} | ${unit}`);
  }, [ingredientItem, amount, cupSelect, unit]);

  useEffect(() => {
    if (getValues('ingredients')) {
      const parts = value.split('|').map((part) => part.trim());
      setIngredientArray(value);
      setIngredientItem(parts[0] || '');
      setAmount(parts[1]?.split(' ')[0] || '');
      setCupSelect(parts[1]?.split(' ')[1] || '');
      setUnit(parts[2] || '');
    }
  }, [value]);

  return (
    <section key={index} className={styles.ingredient}>
      <input
        value={ingredientItem}
        type="text"
        required
        placeholder="ingredient"
        name="ingredient"
        className="w-50 h-10 rounded-md p-2 text-step--3"
        onChange={(event: any) => setIngredientItem(event.target.value)}
      />
      <select
        name="unit"
        id="unit"
        className=""
        value={unit}
        onChange={(event: any) => setUnit(event.target.value)}
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
        value={amount}
        className="w-20 h-10 rounded-md p-2 text-step--4"
        onChange={(event: any) => setAmount(event.target.value)}
      />
      {['cup', 'tbsp', 'tsp'].includes(unit || value.split('|')[2]?.trim()) && (
        <>
          <select
            name="select_measure"
            id="select_measure"
            value={value.split('|')[1]?.trim().split(' ')[1] || cupSelect}
            onChange={(event: any) => setCupSelect(event.target.value)}
          >
            <option value=""></option>
            <option value="1/4">1/4 {unit}</option>
            <option value="1/2">1/3 {unit}</option>
            <option value="3/4">3/4 {unit}</option>
          </select>
        </>
      )}
      <button onClick={() => handleDelete(index)} type="button">
        <TrashIcon className="h-6 w-6" />
      </button>
    </section>
  );
};

export { Ingredient };
```
