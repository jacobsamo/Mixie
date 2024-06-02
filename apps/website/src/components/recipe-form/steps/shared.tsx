import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { Loader2 } from "lucide-react";

interface StepperFormProps {
  isSubmitting?: boolean;
}

export function StepperFormActions({ isSubmitting = false }: StepperFormProps) {
  const { prevStep, isDisabledStep, isLastStep, isOptionalStep } = useStepper();

  return (
    <div className="flex w-full justify-end gap-2 pt-4">
      <Button
        disabled={isDisabledStep}
        onClick={prevStep}
        size="sm"
        type="button"
        variant={isLastStep ? "outline" : "secondary"}
      >
        Back
      </Button>
      {isLastStep ? (
        <>
          <Button
            aria-label="continue with creating the recipe"
            disabled={isSubmitting}
            size="sm"
            variant="secondary"
            type="submit"
          >
            Save draft
            {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
          <Button
            type="submit"
            aria-label="continue with creating the recipe"
            disabled={isSubmitting}
            size="sm"
          >
            Publish
            {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </>
      ) : (
        <>
          <Button
            type="submit"
            aria-label="continue with creating the recipe"
            disabled={isSubmitting}
            size="sm"
          >
            {isOptionalStep ? "Skip" : "Next"}
            {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </>
      )}
    </div>
  );
}

export function StepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
