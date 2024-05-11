import { Button } from "../ui/button";
import { useStepper } from "../ui/stepper";

export function StepperFormActions() {
  const {
    prevStep,
    nextStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="flex w-full justify-end gap-2">
      <Button
        disabled={isDisabledStep}
        onClick={prevStep}
        size="sm"
        variant={isLastStep ? "outline" : "secondary"}
      >
        Prev
      </Button>
      {isLastStep ? (
        <>
          <Button size="sm" variant="secondary" onClick={resetSteps}>
            Save draft
          </Button>
          <Button size="sm" onClick={resetSteps}>
            Publish
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" onClick={nextStep}>
            {isOptionalStep ? "Skip" : "Next"}
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
