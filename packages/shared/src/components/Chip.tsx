import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ChipProps {
  fields: any;
  handleRemove?: (index: number) => void;
}

const Chip = ({ fields, handleRemove = () => {} }: ChipProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 w-72">
      {fields.map((field: any, index: any) => (
        <span
          key={index}
          className="flex justify-center items-center w-fit h-6 p-2 rounded-lg text-step--2 gap-1 dark:text-white dark:bg-dark_grey text-black bg-white "
        >
          {field.value}
          {handleRemove ? (
            <button onClick={() => handleRemove(index)} type="button">
              <XMarkIcon className="w-5 h-5" />
            </button>
          ) : (
            <></>
          )}
        </span>
      ))}
    </div>
  );
};

export { Chip };
