import React, { useCallback, useState, useEffect } from 'react';
import { AddButton } from 'shared';
import { Step } from './Step';
import styles from './Form.module.scss';

const StepContainer = (props: any) => {
  const [stepArray, setStepArray] = useState<string[]>(['']);

  function handleAddClick() {
    setStepArray([...stepArray, '']);
  }

  function handleChange(index: number, event: any): void {
    setStepArray((prev) => {
      const newArray = [...prev];
      newArray[index] = event;
      return newArray;
    });
  }

  function handleDelete(index: number) {
    // write a function that deletes the step from the array
    console.log('Deleting step at index', index);
    console.log('Before deleting', stepArray);
    setStepArray(stepArray.filter((_, i) => i !== index));
    console.log('After deleting', stepArray);
  }

  useEffect(() => {
    props.handleArrayChange(props.name, stepArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepArray]);

  return (
    <article className={styles.method_container}>
      <div className={styles.step_container}>
        {stepArray.map((value, index) => {
          return (
            <Step
              index={index}
              value={value}
              handleChange={handleChange}
              handleDelete={handleDelete}
              key={index}
            />
          );
        })}
        <AddButton type="button" name="Step" onClick={() => handleAddClick()} />
      </div>
    </article>
  );
};

export { StepContainer };
