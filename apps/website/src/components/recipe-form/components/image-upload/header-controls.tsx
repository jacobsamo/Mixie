import { ChevronLeft, X } from "lucide-react";
import { type FC } from "react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface HeaderControlsProps {
  currentStepId: string | null;
  goToPreviousStep: () => void;
}

export const HeaderControls: FC<HeaderControlsProps> = ({
  currentStepId,
  goToPreviousStep,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Previous button */}
      {currentStepId != null && (
        <Button
          variant="ghost"
          className="absolute top-4 left-4 h-fit w-fit rounded-sm p-0 opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Return to previous step"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Back To Previous Step</span>
        </Button>
      )}

      {/* Close button */}
      <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </div>
  );
};
