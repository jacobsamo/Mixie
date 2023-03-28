import React, { useState } from "react";


/**
 * A text input field
 * @param props
 * @returns jsx
 * @example
 * <InputField
 *  label="Name"
 *  name="name"
 *  id="name"
 *  type="text"
 *  value={name}
 *  onChange={handleChange}
 * />
 */
function InputField({ ...props }) {
  const [internalValue, setInternalValue] = useState("");

  function handleChange(event: any) {
    setInternalValue(event.target.value);
    props.onChange ? props.onChange(event) : null;
  }

  return (
    <>
      <label htmlFor={props.name || props.id}>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        id={props.name || props.id}
        value={props.value || internalValue}
        onChange={handleChange}
        {...props}
      />
    </>
  );
}

export { InputField };
