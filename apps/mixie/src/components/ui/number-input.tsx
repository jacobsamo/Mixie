import React from "react";
import { Button } from "./button";
import { MinusIcon, PlusIcon } from "lucide-react";

const NumberInput = () => {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => onClick(-10)}
        disabled={goal <= 200}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="text-5xl font-bold tracking-tighter">{goal}</div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">
          Calories/day
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => onClick(10)}
        disabled={goal >= 400}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};

export default NumberInput;
