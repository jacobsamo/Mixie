import type { Ingredient } from "@/src/db/types";
import React from "react";
import { Checkbox } from "@components/ui/checkbox";

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  return (
    <div className="flex flex-row items-center gap-3 py-1">
      {/*TODO:change the style of this checkbox */}
      <input
        type="checkbox"
        id="checkbox"
        className="h-4 w-4 rounded-xl border-white checked:text-white"
        aria-label={`Check off Ingredient, ${ingredient.title}`}
      />
      <h3 className="">
        {ingredient.quantity}{" "}
        {ingredient.amount == "not_set" ? null : ingredient.amount}{" "}
        {ingredient.unit == "not_set" ? null : ingredient.unit}{" "}
        {ingredient.title}{" "}
      </h3>
    </div>
  );
};

export default Ingredient;
