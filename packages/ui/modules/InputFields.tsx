import React, { useEffect, useReducer, useState } from "react";
import "@styles/InputFields.scss";

function TextField(props: any) {
  const [value, setValue] = useState("");

  function handleChange(event: any) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <label>
      {props.label}
      <input
        type="text"
        name={props.name}
        id={props.name || props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        required={props.required}
        autoComplete={props.autoComplete}
        className="inputField textField"
      />
    </label>
  );
}

function NumberField(props: any) {
  const [value, setValue] = useState(0);

  function handleChange(event: any) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <label>
      {props.label}
      <input
        type="number"
        name={props.name}
        id={props.name || props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        required={props.required}
        autoComplete={props.autoComplete}
        className="inputField numberField"
      />
    </label>
  );
}

export { TextField, NumberField };
