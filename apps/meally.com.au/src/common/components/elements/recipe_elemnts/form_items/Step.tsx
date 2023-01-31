import React, { useCallback, useState, useEffect } from 'react';
import { AddButton } from 'ui';
import styles from './Form.module.scss';

const Step = (props: any) => {
  const [bodyValue, setBodyValue] = useState('');

  function handleChange(event: any) {
    setBodyValue(event.target.value);
    props.handleChange(props.index, event.target.value);
  }

  return (
    <section
      key={props.index}
      className="relative flex flex-col items-start p-3 rounded-md h-fit w-96 flex-grow bg-white text-black dark:bg-gray-700 dark:text-black"
    >
      <h1 className="font-medium font-Roboto text-sm">Step {1}</h1>
      <label>
        <textarea
          name="step_body"
          id="step_body"
          onChange={handleChange}
          value={bodyValue}
        />
      </label>
      <button onClick={() => props.handleDelete(props.index)}>delete</button>
    </section>
  );
};



export { Step };
