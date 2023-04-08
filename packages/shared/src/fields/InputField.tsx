import React, { useState } from "react";
import InnerLabel from "./InnerLabel";

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
    <div>
      {(focused || hasInput) && (
        <InnerLabel label={props.label} inputId={props.name || props.id} />
      )}
      <input
        type={props.type || "text"}
        name={props.name}
        id={props.name || props.id}
        value={props.value || internalValue}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

export { InputField };
