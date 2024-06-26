import { matchIngredients } from "@/lib/utils";
import type { Ingredient, Step as TStep } from "@/types";

interface StepProps {
  index: number;
  step: TStep;
  ingredients: Ingredient[];
}

const Step = ({ index, step, ingredients }: StepProps) => {
  const matchedIngredients = matchIngredients(ingredients, step);

  return (
    <section className="relative flex w-96 flex-grow flex-col items-start gap-1 rounded-2xl p-4">
      <h2
        id={`step-${index + 1}`}
        className="font-Roboto text-step0 font-medium"
      >
        Step {index + 1}
      </h2>
      <p>{step.text}</p>
      <span>
        <p className="font-bold">Ingredients:</p>{" "}
        {matchedIngredients.map((ingredient) => ingredient.text).join(" | ")}
      </span>
    </section>
  );
};

export default Step;
