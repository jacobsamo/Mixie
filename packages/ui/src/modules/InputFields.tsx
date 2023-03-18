import React, { useState } from "react";
import "../styles/InputFields.css";

function InputField(props: any) {
  const [value, setValue] = useState("");

  function handleChange(event: any) {
    setValue(event.target.value);
    props.onChange ? props.onChange(event) : null;
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
        className={props.className}
        min={props.min}
        minLength={props.minLength}
        max={props.max}
        maxLength={props.maxLength}
      />
    </label>
  );
}

export { InputField };
