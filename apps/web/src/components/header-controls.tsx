import { ChevronLeft, X } from "lucide-react";
import { type FC } from "react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface HeaderControlsProps {
  currentStepId: string | null;
  goToPreviousStep: () => void;
  closeModal?: () => void;
}

export const HeaderControls: FC<HeaderControlsProps> = ({
  currentStepId,
  goToPreviousStep,
  closeModal,
}) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      {/* Previous button */}
      {currentStepId != null && (
        <Button
          variant="link"
          className="text-muted-foreground absolute left-4 top-4 h-fit w-fit rounded-sm p-0"
          aria-label="Return to previous step"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-6 w-6" /> Back
          <span className="sr-only">Back To Previous Step</span>
        </Button>
      )}

      {/* Close button */}
      <DialogClose
        onClick={() => (closeModal ? closeModal() : undefined)}
        className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </div>
  );
};
