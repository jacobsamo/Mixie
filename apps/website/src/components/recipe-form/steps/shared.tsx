import { Button } from "@/components/ui/button";
import { useStepper } from "@/components/ui/stepper";
import { Loader2 } from "lucide-react";

interface StepperFormProps {
  isSubmitting?: boolean;
  isPublicSubmitting?: boolean;
  onPublish?: () => void;
  onSaveDraft?: () => void;
}

export function StepperFormActions({
  isSubmitting = false,
  isPublicSubmitting = false,
  onPublish,
  onSaveDraft,
}: StepperFormProps) {
  const { prevStep, isDisabledStep, isLastStep, isOptionalStep } = useStepper();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex w-full justify-end gap-2 pt-4">
      <Button
        disabled={isDisabledStep}
        onClick={() => {
          prevStep();
          scrollToTop();
        }}
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
            disabled={isSubmitting || isPublicSubmitting}
            form="recipe-form"
            size="sm"
            variant="secondary"
            type="submit"
            onClick={(e) => {
              onSaveDraft && onSaveDraft();
              scrollToTop();
            }}
          >
            Save draft
            {isSubmitting && !isPublicSubmitting && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button
            type="submit"
            form="recipe-form"
            aria-label="continue with creating the recipe"
            disabled={isSubmitting || isPublicSubmitting}
            size="sm"
            onClick={(e) => {
              onPublish && onPublish();
              scrollToTop();
            }}
          >
            Publish
            {isPublicSubmitting && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </>
      ) : (
        <>
          <Button
            type="submit"
            // form="recipe-form"
            aria-label="continue with creating the recipe"
            disabled={isSubmitting}
            size="sm"
            onClick={(e) => {
              scrollToTop();
            }}
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
