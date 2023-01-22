import React from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

interface addButtonProps {
  name: string;
  onClick?: () => void;
}

const AddButton = ({ name, onClick }: addButtonProps) => {
  return (
    <button onClick={onClick}>
      <PlayCircleIcon className="w-5 h-5" /> Add {name}
    </button>
  );
};

export  {AddButton};
