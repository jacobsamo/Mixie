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
    console.log(event);
  }

  function handleDelete(index: number) {
    // write a function that deletes the step from the array
    console.log("Deleting step at index", index);
    console.log("Before deleting", ingredientArray);
    setIngredientArray(ingredientArray.filter((_, i) => i !== index));
    console.log("After deleting", ingredientArray);
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
        <button type='button' onClick={() => console.log(ingredientArray)} >Get ingrtiedent data</button>
      </article>
    </>
  );
};

export { IngredientContainer };
