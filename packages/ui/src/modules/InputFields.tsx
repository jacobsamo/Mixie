import React, { useEffect, useReducer, useState } from "react";
import "@styles/InputFields.css";

function InputField(props: any) {
  const [value, setValue] = useState("");

  function handleChange(event: any) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <label>
      {props.label}
      <input
        type={props.type || "text"}
        name={props.name}
        id={props.name || props.id}
        placeholder={props.placeholder}
        value={props.value}
        aria-required={props.required}
        onChange={handleChange}
        required={props.required}
        autoComplete={props.autoComplete}
        className={`input-field`}
      />
    </label>
  );
}

export { InputField };
