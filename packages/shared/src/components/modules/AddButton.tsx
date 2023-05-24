import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "../buttons/Button";

interface AddButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  name: string;
}
/**
 * AddButton for anything where you can add something
 * @param {string} type - type of button "button" | "submit" | "reset" | undefined
 * @param {function} onClick - what the button does when clicked
 * @param {string} onClick - Title after Add
 * @returns {JSX.Element} - AddButton component
 *
 * @example
 * <AddButton
 *    type="button"
 *    onClick={() => handleClick()}
 *    name="Step"
 * >
 */
const AddButton = ({ type, onClick, name }: AddButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className="flex flex-row items-center gap-2 h-9 text-step--2 mt-3 border rounded-xl"
    >
      <PlusCircleIcon className="w-5 h-5" /> Add {name}
    </Button>
  );
};

export { AddButton };
