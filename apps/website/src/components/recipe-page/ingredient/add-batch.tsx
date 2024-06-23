"use client";
import React, { useEffect, useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";

interface AddBatchProps {
  add: number;
  setAdd: React.Dispatch<React.SetStateAction<number>>;
}

const AddBatch = ({ add, setAdd }: AddBatchProps) => {
  useEffect(() => {
    add < 1 ? setAdd(1) : null;
  }, [add, setAdd]);

  function addBatch() {
    setAdd(add + 1);
  }
  function minusBatch() {
    setAdd(add - 1);
  }

  return (
    <>
      <div className="flew-row flex items-center py-2" aria-label="Add a batch">
        <button
          aria-label="Add a batch"
          data-testid="plus_button"
          onClick={addBatch}
        >
          <PlusCircleIcon className="h-9 w-9" />
        </button>
        <button
          data-testid="minus_button"
          aria-label="Remove a batch"
          onClick={minusBatch}
          disabled={add < 2}
        >
          <MinusCircleIcon
            className={`h-9 w-9 ${
              add < 2 ? "pointer-events-none bg-none text-foreground opacity-20" : ""
            }`}
          />
        </button>
        <p data-testid="title">
          {add} {add > 1 ? "Batches" : "Batch"}
        </p>
      </div>
    </>
  );
};

export default AddBatch;
