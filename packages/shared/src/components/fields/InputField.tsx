import React, { ReactElement } from "react";
import InnerLabel from "./InnerLabel";
import { useInputField } from "../../hooks/useInputField";

interface InputFieldProps {
  inputId: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string | number | readonly string[];
  valueChanged?: (value: string) => void;
  maxLength?: number;
  required?: boolean;
}

function InputFieldComponent(
  {
    inputId,
    name,
    label,
    placeholder,
    type,
    value,
    valueChanged,
    maxLength,
    required,
    ...props
  }: InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
): ReactElement {
  const {
    inputRef,
    focused,
    hasInput,
    onFocus,
    onBlur,
    onInput,
    focusInput,
    setInput,
  } = useInputField<HTMLInputElement>(value, valueChanged);

  return (
    <div ref={ref} className="flex flex-col">
      {(focused || hasInput) && <InnerLabel label={label} inputId={inputId} />}
      <input
        type={type || "text"}
        name={name}
        id={inputId}
        value={value as string}
        placeholder={placeholder || label}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        {...props}
      />
    </div>
  );
}

export const InputField = React.forwardRef(InputFieldComponent);
