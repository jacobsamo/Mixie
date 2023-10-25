"use client";
import type { Ingredient } from "@db/types";
import React from "react";
import { CheckCircleIcon, Circle } from "lucide-react";

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <li>
      <button
        className="mb-4 flex space-x-1"
        id={`ingredient-${ingredient.title}`}
        aria-label={`Check off Ingredient, ${ingredient.title}`}
        onClick={() => setChecked(!checked)}
        role="checkbox"
        data-checked={checked}
        type="button"
        aria-checked={checked}
      >
        {checked ? (
          <CheckCircleIcon className="shrink-0 text-yellow" />
        ) : (
          <Circle className="shrink-0" />
        )}
        <h3 className={checked ? "line-through opacity-60" : ""}>
          {ingredient.quantity}{" "}
          {ingredient.amount.value == "not_set"
            ? null
            : ingredient.amount.label}{" "}
          {ingredient.unit.value == "not_set"
            ? null
            : ingredient.unit.label.replace("item", "")}{" "}
          {ingredient.title}{" "}
        </h3>
      </button>
    </li>
  );
};

export default Ingredient;
