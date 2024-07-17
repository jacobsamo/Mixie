import React from "react";
import { Button } from "./button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface NumberInputProps {
  value: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
  minusDisabled?: boolean;
  plusDisabled?: boolean;
}

const NumberInput = ({
  value,
  onMinusClick,
  onPlusClick,
  minusDisabled = false,
  plusDisabled = false,
}: NumberInputProps) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={onMinusClick}
        disabled={minusDisabled}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="font-bold text-5xl tracking-tighter">{value}</div>
        {/* <div className="text-[0.70rem] text-muted-foreground uppercase">
          Calories/day
        </div> */}
      </div>
      <Button
        variant="outline"
        size="icon"
        type="button"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={onPlusClick}
        disabled={plusDisabled}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};

export default NumberInput;
