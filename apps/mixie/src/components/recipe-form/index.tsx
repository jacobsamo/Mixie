"use client";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { ChefHat, Coffee, ShoppingBasket, Soup } from "lucide-react";
import { RecipeFormProvider } from "./recipe-form-provider";
import { Recipe } from "@/types";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";

const Info = dynamic(() => import("./steps/Info"), {
  loading: () => <Loading />,
});
const Ingredients = dynamic(() => import("./steps/ingredients"), {
  loading: () => <Loading />,
});
const Steps = dynamic(() => import("./steps/steps"), {
  loading: () => <Loading />,
});
const Details = dynamic(() => import("./steps/details"), {
  loading: () => <Loading />,
});

const steps = [
  { label: "Info", icon: ChefHat },
  { label: "Ingredients", icon: ShoppingBasket },
  { label: "Steps", icon: Soup },
  { label: "Details", icon: Coffee },
] satisfies StepItem[];

const DisplayForm = ({ activeStep }: { activeStep: StepItem }) => {
  switch (activeStep.label) {
    case "Info":
      return <Info />;
    case "Ingredients":
      return <Ingredients />;
    case "Steps":
      return <Steps />;
    case "Details":
      return <Details />;
    default:
      return null;
  }
};

export interface RecipeFormProps {
  recipe: Recipe;
}

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const searchParams = useSearchParams();
  const activeStep = searchParams.get("step") ?? "Info";

  const activeStepIndex = steps.findIndex((step) => step.label === activeStep);

  return (
    <div className="flex w-full flex-col gap-4 px-2 py-4">
      <RecipeFormProvider passedRecipe={recipe}>
        <Stepper
          initialStep={activeStepIndex}
          steps={steps}
          mobileBreakpoint="550px"
        >
          {steps.map((step, index) => (
            <Step key={step.label} {...step}>
              <div className="my-4 flex min-h-40 items-center justify-center overflow-auto rounded-md px-2 ">
                <DisplayForm activeStep={step} />
              </div>
            </Step>
          ))}
        </Stepper>
      </RecipeFormProvider>
    </div>
  );
}
