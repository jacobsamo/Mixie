import { Recipe } from "@/types";
import { createContext, useContext, useState } from "react";

// Define the type for the context value
export type RecipeContextValue = {
  recipe: Recipe | null;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
};

// Create a context to hold the state
const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

// Custom hook to access the context
export const useRecipeContext = (): RecipeContextValue => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

export interface RecipeProviderProps {
  children: React.ReactNode;
  passedRecipe: Recipe | null;
}

// Context provider component
export const RecipeFormProvider = ({ children, passedRecipe }: RecipeProviderProps) => {
  const [recipe, setRecipe] = useState<Recipe | null>(passedRecipe);

  // Context value
  const contextValue: RecipeContextValue = {
    recipe,
    setRecipe,
  };

  // Render the provider with context value and children
  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};
