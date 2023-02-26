import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeCard } from "../../ui/src/modules/RecipeCard";
import { Recipe } from "libs/types";

describe("RecipeCard", () => {
  it("renders a card", async () => {
    const mockRecipe = {
      id: "1",
      imageUrl:
        "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      recipeDescription:
        "A delicious meal that is easy to make and tastes great.",
      recipeName: "Spaghetti Bolognese",
    };
    render(
      <RecipeCard
        id={mockRecipe.id}
        imageUrl={mockRecipe.imageUrl}
        recipeDescription={mockRecipe.recipeDescription}
        recipeName={mockRecipe.recipeName}
      />
    );
    expect(screen.getByText(mockRecipe.recipeName)).toBeInTheDocument();
  });
});
