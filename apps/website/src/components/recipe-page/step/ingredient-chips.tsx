import { matchIngredients } from "@/lib/utils";
import { Ingredient, Step } from "@/types";

interface IngredientChipsProps {
  step: Step;
  ingredients: Ingredient[];
}

const IngredientChips = ({ step, ingredients }: IngredientChipsProps) => {
  const uniqueMatchedIngredients = matchIngredients(ingredients, step);

  return (
    <div className="flex flex-wrap gap-1">
      {uniqueMatchedIngredients.map((ingredient, index) => (
        <p
          key={index}
          className="h-fit w-fit rounded-lg bg-yellow p-1 text-center text-step--4 text-black opacity-80"
        >
          {ingredient.text}
        </p>
      ))}
    </div>
  );
};

export default IngredientChips;
