import React, { useCallback, useState, useEffect } from 'react';
import { AddButton } from 'ui';
import { Step } from './Step';
import styles from './Form.module.scss';

const StepContainer = (props: any) => {
  const [stepArray, setStepArray] = useState<string[]>([]);

  function handleAddClick() {
    console.log('fired')
    setStepArray([...stepArray, '']);
  }

  function handleChange(index: number, event: any): void {
    console.log('index: ', index);
    console.log('event: ', event);
    setStepArray((prev) => {
      const newArray = [...prev];
      newArray[index] = event;
      return newArray;
    });
  }

  function handleDelete(index: number) {
    setStepArray(stepArray.filter((_, i) => i !== index));
  }

  useEffect(() => {
    props.handleArrayChange(props.name, stepArray);
  }, [stepArray]);

  return (
    <article>
      <div>
        {stepArray.map((step, index) => {
          return (
            <Step
              index={index}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          );
        })}
        <AddButton type="button" name="Step" onClick={() => handleAddClick()} />
      </div>
    </article>
  );
};

// className={styles.method_container}
//className={styles.step_container}

export { StepContainer };