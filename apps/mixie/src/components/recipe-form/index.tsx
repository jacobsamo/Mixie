"use client";
import React from "react";
import {
  Step,
  Stepper,
  useStepper,
  type StepItem,
} from "@/components/ui/stepper";
import { Button } from "../ui/button";
import {
  Building,
  ChefHat,
  Coffee,
  Footprints,
  ShoppingBasket,
  Soup,
  Star,
  User,
} from "lucide-react";
import { StepperFormActions } from "./form-actions";
import Info from "./steps/info";
import Ingredients from "./steps/ingredients";
import Steps from "./steps/steps";
import Details from "./steps/details";

const steps = [
  { label: "Info", icon: ChefHat },
  { label: "Ingredients", icon: ShoppingBasket },
  { label: "Steps", icon: Soup },
  { label: "Details", icon: Coffee },
] satisfies StepItem[];



const DisplayForm = ({ activeStep }: { activeStep: StepItem }) => {
  switch (activeStep.label) {
    case "Info":
      return <Info  />;
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

export default function RecipeForm() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((step, index) => (
          <Step key={step.label} {...step}>
            <div className="my-4 flex min-h-40 items-center justify-center rounded-md border bg-secondary text-primary">
              <DisplayForm activeStep={step} />
            </div>
            <StepperFormActions />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
