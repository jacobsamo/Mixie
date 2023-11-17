// import Ingredient from "@components/templates/RecipePage/ingredient/Ingredient";
import { Amount, Step, type Ingredient } from "@db/types";
import Fraction from "fraction.js";

/**
 * Turns an ingredient into a string that can be displayed
 * @param {Ingredient} ingredient the ingredient to be return
 * @returns {string} returns the ingredient as a string`
 */
export const displayIngredient = (ingredient: Ingredient) =>
  `${ingredient.quantity ?? ""} ${
    ingredient.amount &&
    (ingredient.amount.value == "not_set" || !ingredient.amount)
      ? ""
      : ingredient.amount?.label
  } ${
    ingredient.unit && (!ingredient.unit || ingredient.unit.value == "not_set")
      ? ""
      : ingredient.unit?.label.replace("item", "")
  } ${ingredient.title}`;

/**
 * Takes in a step to search for any ingredients that might be in the step,
 * @param {Step} step the step
 * @param {Ingredient} ingredients ingredients to search through
 * @returns {Ingredient[]} found ingredients
 */
export function matchIngredients(step: Step, ingredients: Ingredient[]) {
  const stepWords = step.step_body.toLowerCase().split(/\s+/);

  const matchedIngredients = ingredients
    .filter((ingredient, index, arr) => {
      if (ingredient.isHeading || !ingredient.title) {
        return false;
      }

      const ingredientWords = ingredient.title.toLowerCase().split(/\s+/);

      // Check if any ingredient word is a substring of any step word
      return ingredientWords.some((ingredientWord) =>
        stepWords.some((stepWord) => stepWord.toLowerCase() === ingredientWord)
      );
    })
    .filter((ingredient, index, arr) => {
      // Filter out duplicate ingredients
      return arr.findIndex((i) => i.title === ingredient.title) === index;
    });

  const uniqueMatchedIngredients = matchedIngredients.filter(
    (ingredient, index) => {
      const ingredientWords = ingredient.title.toLowerCase().split(/\s+/); // Split ingredient title into words

      // Check if any ingredient word is a substring of any step word
      return !ingredientWords.some((ingredientWord) =>
        matchedIngredients
          .slice(index + 1)
          .some((matchedIngredient) =>
            matchedIngredient.title
              .toLowerCase()
              .includes(ingredientWord.toLowerCase())
          )
      );
    }
  );

  return uniqueMatchedIngredients;
}

/**
 * Takes in a cup unit e.g cup, tsp, tbsp and return it. as we have to calculate fractions
 * @param {Ingredient["quantity"]} quantity
 * @param {Amount} amount
 * @param {number} batchAmount
 * @returns { quantity: Ingredient["quantity"]; amount: Amount } calculated cup units
 */
function calculateCupUnits(
  quantity: Ingredient["quantity"],
  amount: Amount,
  batchAmount: number
): { quantity: Ingredient["quantity"]; amount: Amount } {
  const fr = amount.split("/");

  if (fr.length <= 1) {
    return {
      quantity: quantity,
      amount: amount,
    };
  }

  const value = (Number(fr[0]) / Number(fr[1])) * batchAmount;
  const fraction = new Fraction(value).toFraction(true);
  const split = fraction.split(" ");
  const newQuantity = split.length > 1 ? parseInt(split[0]) : null;
  const newMeasurement =
    split.length > 1 ? (split[1] as Amount) : (split[0] as Amount);

  return {
    quantity: newQuantity,
    amount: newMeasurement,
  };
}

/**
 * Will calculate the new values of the ingredient based on the number of batches
 * @param {Ingredient} ingredient - the ingredient
 * @param {number} batchAmount - the number of batches to calculate
 * @returns {Ingredient} a calculated ingredients
 */
export function calculateIngredient(
  ingredient: Ingredient,
  batchAmount: number
): Ingredient {
  const q = ingredient.quantity || 0;
  if (ingredient.isHeading) return ingredient;

  switch (ingredient.unit?.value) {
    case "grams":
      const gramQuantity = q * batchAmount;
      return {
        ...ingredient,
        quantity: gramQuantity >= 1000 ? gramQuantity / 1000 : gramQuantity,
        unit: {
          value: gramQuantity >= 1000 ? "kg" : "grams",
          label: gramQuantity >= 1000 ? "kg" : "grams",
        },
      };
    case "kg":
      return {
        ...ingredient,
        quantity: q * batchAmount,
      };
    case "cup":
    case "tsp":
    case "tbsp":
      const multipliedQuantity = q * batchAmount;
      const { quantity, amount } = calculateCupUnits(
        multipliedQuantity,
        ingredient.amount?.value ?? "not_set",
        batchAmount
      );
      return {
        ...ingredient,
        quantity: quantity,
        amount: {
          value: amount,
          label: amount,
        },
      };
    case "ml":
      const mlQuantity = q * batchAmount;
      return {
        ...ingredient,
        quantity: mlQuantity >= 1000 ? mlQuantity / 1000 : mlQuantity,
        unit: {
          value: mlQuantity >= 1000 ? "litre" : "ml",
          label: mlQuantity >= 1000 ? "litre" : "ml",
        },
      };
    case "litre":
      return {
        ...ingredient,
        quantity: q * batchAmount,
      };
    case "pinch":
    case "item":
      return {
        ...ingredient,
        quantity: q * batchAmount,
      };
    default:
      return ingredient;
  }
}

/**
 * Loops over each ingredient and returns the new ingredient array with the calculated values
 * @param {Ingredient[]} ingredients
 * @param {number} batchAmount
 * @returns {Ingredient[]} a list of calculated ingredients
 */
export function calculateAllIngredients(
  ingredients: Ingredient[],
  batchAmount: number
) {
  return ingredients.map((ingredient) =>
    calculateIngredient(ingredient, batchAmount)
  );
}
