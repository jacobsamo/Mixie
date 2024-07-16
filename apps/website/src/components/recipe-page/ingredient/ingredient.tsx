"use client";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/types";
import { CheckCircleIcon, Circle } from "lucide-react";
import React from "react";
import { useRecipeContext } from "../recipe-provider";

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = ({ ingredient }: IngredientProps) => {
  const { viewMode } = useRecipeContext();
  const [checked, setChecked] = React.useState(false);

  return (
    <li>
      <button
        className={cn("mb-4 flex space-x-1", {
          "cursor-default": viewMode === "preview",
        })}
        id={`ingredient-${ingredient.text}`}
        aria-label={`Check off Ingredient, ${ingredient.text}`}
        onClick={() => {
          if (viewMode === "page") setChecked(!checked);
        }}
        role="checkbox"
        data-checked={checked}
        type="button"
        aria-checked={checked}
      >
        {viewMode === "page" &&
          (checked ? (
            <CheckCircleIcon className="shrink-0 text-yellow" />
          ) : (
            <Circle className="shrink-0" />
          ))}
        <h3
          className={cn("text-left text-wrap", {
            "line-through opacity-60 text-left": checked,
          })}
        >
          {ingredient.text}
        </h3>
      </button>
    </li>
  );
};

export default Ingredient;
