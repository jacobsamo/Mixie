"use client";
import { Recipe } from "@/types";
import { createContext, useContext, useState } from "react";

// Define the type for the context value
export type RecipeContextValue = {
  recipe: Recipe;
  viewMode?: "page" | "preview";
};

// Create a context to hold the state
const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

// Custom hook to access the context
export const useRecipeContext = (): RecipeContextValue => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};

export interface RecipeProviderProps {
  children: React.ReactNode;
  recipe: Recipe;
  viewMode?: "page" | "preview";
}

// Context provider component
export const RecipeProvider = ({
  children,
  recipe,
  viewMode = "page",
}: RecipeProviderProps) => {
  // Render the provider with context value and children
  return (
    <RecipeContext.Provider value={{ recipe, viewMode }}>
      {children}
    </RecipeContext.Provider>
  );
};
