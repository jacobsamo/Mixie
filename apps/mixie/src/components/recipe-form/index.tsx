"use client";
import { Step, Stepper, type StepItem } from "@/components/ui/stepper";
import { ChefHat, Coffee, ShoppingBasket, Soup } from "lucide-react";
import Details from "./steps/details";
import Ingredients from "./steps/ingredients";
import Steps from "./steps/steps";
import { RecipeFormProvider } from "./recipe-form-provider";
import { Recipe } from "@/types";
import Info from "./steps/Info";
import Component from "./components/TestForm";

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
      // return <Info />;
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

export default function RecipeForm({recipe}: RecipeFormProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <RecipeFormProvider passedRecipe={recipe}>
        <Stepper initialStep={0} steps={steps}>
          {steps.map((step, index) => (
            <Step key={step.label} {...step}>
              <div className="my-4 flex min-h-40 overflow-auto items-center justify-center rounded-md border bg-secondary">
                <DisplayForm activeStep={step} />
              </div>
            </Step>
          ))}
        </Stepper>
      </RecipeFormProvider>
    </div>
  );
}
