import { useEffect, useState } from 'react';
import { AddButton, InputField } from 'ui';
import styles from './Form.module.scss';
import { Ingredient } from './Ingredient';

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
    const newArray = ingredientArray.filter((_, i) => i !== index);
    setIngredientArray(newArray);
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
          {ingredientArray.map((value, index) => {
            return (
              <Ingredient
                index={index}
                value={value}
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

export { IngredientContainer };
