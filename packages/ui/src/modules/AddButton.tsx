import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const AddButton = (props: any) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className="flex flex-row w-40 h-9 rounded-lg border-2 border-solid border-black dark:border-white justify-center items-center gap-3"
    >
      <PlusCircleIcon className="w-5 h-5" /> Add {props.name}
    </button>
  );
};

export { AddButton };
