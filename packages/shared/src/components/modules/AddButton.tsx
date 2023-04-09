import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

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
 * 
 * @example
 * <AddButton 
 *    type="button" 
 *    onClick={() => handleClick()}
 *    name="Step"
 * >
 */
const AddButton = ({type, onClick, name}: AddButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex flex-row w-40 h-9 rounded-lg border-2 border-solid border-black dark:border-white justify-center items-center gap-3"
    >
      <PlusCircleIcon className="w-5 h-5" /> Add {name}
    </button>
  );
};

export { AddButton };
