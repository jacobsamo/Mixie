"use client";
import React, { useEffect, useState } from "react";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div
        className="flew-row mx-auto flex w-full items-center justify-between gap-3 py-2"
        aria-label="Add a batch"
      >
        <p data-testid="title" className="text-step--2 font-bold">
          {add} {add > 1 ? "Batches" : "Batch"}
        </p>
        <div>
          <Button
            variant="outline"
            size="icon"
            type="button"
            aria-label="Remove a batch"
            className="size-8"
            onClick={minusBatch}
            disabled={add < 2}
          >
            <MinusIcon
              className={cn("size-9", {
                "text-foreground pointer-events-none bg-none opacity-20":
                  add < 2,
              })}
            />
            <span className="sr-only">Decrease</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            aria-label="Add a batch"
            className="size-8"
            onClick={addBatch}
          >
            <PlusIcon className="size-9" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBatch;
