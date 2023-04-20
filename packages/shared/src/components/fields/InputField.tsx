import React, { ReactElement } from "react";
import InnerLabel from "./InnerLabel";
import { useInputField } from "../../hooks/useInputField";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
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
    id,
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
    <div
      ref={ref}
      className="flex flex-col focus:outline-1 flex-1 items-start max-w-full rounded-md p-1 text-step--2 dark:bg-dark_grey bg-white shadow-buttonGithub"
    >
      {(focused || hasInput) && (
        <InnerLabel label={label} inputId={id} className="text-step--3" />
      )}
      <input
        type={type || "text"}
        name={name}
        id={id}
        value={value as string}
        // defaultValue={value as string}
        placeholder={focused || hasInput ? "" : placeholder}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        className="w-full dark:bg-dark_grey bg-white"
        {...props}
      />
    </div>
  );
}

export const InputField = React.forwardRef(InputFieldComponent);
