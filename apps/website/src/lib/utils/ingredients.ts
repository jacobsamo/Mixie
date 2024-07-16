// import  Ingredient from "@/components/templates/RecipePage/ingredient/Ingredient";
import { Amount, Step, type Ingredient } from "@/types";
import Fraction from "fraction.js";
import * as fuzzball from "fuzzball";

export const units: { [key: string]: string[] } = {
  tsp: ["tsp", "teaspoon", "teaspoons", "t", "tsps"],
  tbsp: ["tbsp", "tablespoon", "tablespoons", "T", "tbsps"],
  grams: ["grams", "gram", "g", "gm", "gs"],
  kg: ["kg", "kgs", "kilogram", "kilograms"],
  cup: ["cup", "cups", "c"],
  ml: ["ml", "milliliter", "milliliters"],
  litre: ["litre", "litres", "l"],
};

const findUnitMatch = (ingredient: string) => {
  return ingredient.match(/(\d+(?:\s\d+\/\d+|\/\d+)?)(?:\s*([a-zA-Z]+))?/i);
};

/**
 * Removes all non word letters e.g , . / ( )
 * @param {string} str string to input
 * @returns {string}
 */
const normalizeString = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .toLowerCase();

/**
 * Takes in a step to search for any ingredients that might be in the step,
 * @param {Step} step the step
 * @param {Ingredient} ingredients ingredients to search through
 * @returns {Ingredient[]} found ingredients
 */
export function matchIngredients(ingredients: Ingredient[], step: Step) {
  const stepWords = normalizeString(step.text).split(/\s+/);

  const found: Ingredient[] = [];

  ingredients.forEach((passed, index, arr) => {
    let text = passed.text;

    const unitMatch = findUnitMatch(text);
    if (unitMatch) text = text.replace(unitMatch[0], "");
    if (passed.isHeading || !text) return;
    // get rid of any unwanted characters
    const ingredient = normalizeString(text);
    // remove not word characters and split into parts
    const ingredientArr = normalizeString(text).split(/\s+|\,/);

    // loop over each word
    stepWords.forEach((step_word, word_index, word_arr) => {
      if (ingredientArr.length == 1 && ingredient == step_word) {
        found.push(passed);
        return;
      }

      // if the ingredient arr includes the word continue
      if (ingredientArr.includes(step_word)) {
        /*
        Find the index of the word, get the length of the ingredient 
        get a certain number of chacters before and after, 
        get rid of spaces
        */
        const newString = stepWords
          .slice(word_index, word_index + ingredientArr.length)
          .join("");

        const ratio = fuzzball.ratio(newString, ingredient);

        if (ratio >= 50) found.push(passed);
        return;
      }
      return;
    });
  });

  return found.filter((v, i, a) => a.findIndex((t) => t.text == v.text) == i);
}

/**
 * Takes in a fraction or whole number as a string and multiplies it by batchAmount,
 * returning the result as a formatted fraction.
 * @param {string} amount - The amount string representing a fraction or whole number.
 * @param {number} batchAmount - The amount to multiply by.
 * @returns {string} - The formatted result as a fraction.
 */
function calculateFractionalUnit(amount: string, batchAmount: number): string {
  const amountTrimmed = amount.trim();

  // Check if the amount is a mixed number (e.g., "2 2/3")
  if (amountTrimmed.includes(" ")) {
    const parts = amountTrimmed.split(" ");
    const wholeNumber = Number(parts[0]);
    const fractionPart = parts[1];
    const [numerator, denominator] = fractionPart.split("/").map(Number);

    // Calculate the value as a mixed number
    const totalValue = wholeNumber + numerator / denominator;
    const multipliedValue = totalValue * batchAmount;

    // Return the formatted fraction
    return new Fraction(multipliedValue).toFraction(true);
  } else if (amountTrimmed.includes("/")) {
    // Handle normal fractions (e.g., "1/2")
    const [numerator, denominator] = amountTrimmed.split("/").map(Number);
    const multipliedValue = (numerator / denominator) * batchAmount;
    return new Fraction(multipliedValue).toFraction(true);
  } else {
    // Handle simple whole numbers (e.g., "3")
    const value = parseInt(amountTrimmed, 10) * batchAmount;
    return new Fraction(value).toFraction(true);
  }
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
  if (ingredient.isHeading) return ingredient;

  // will match the first digit in a string and the value after it
  const match = findUnitMatch(ingredient.text);

  if (!match) return ingredient;

  const [fullMatch, amount, unit] = match;
  const unitKey = Object.keys(units).find((key) =>
    units[key].includes(unit?.toLowerCase())
  );

  let newAmount = amount;
  switch (unitKey) {
    case "tsp":
    case "tbsp":
    case "cup":
      newAmount = `${calculateFractionalUnit(amount, batchAmount)} ${unitKey}`;
      break;
    case "grams":
      const gramQuantity = Number(amount) * batchAmount;
      newAmount = `${
        gramQuantity >= 1000 ? gramQuantity / 1000 : gramQuantity
      } ${gramQuantity >= 1000 ? "kg" : "grams"}`;
      break;
    case "ml":
      const mlQuantity = Number(amount) * batchAmount;
      newAmount = `${mlQuantity >= 1000 ? mlQuantity / 1000 : mlQuantity} ${
        mlQuantity >= 1000 ? "litre" : "ml"
      }`;
      break;
    default:
      const isFraction = amount.includes("/");
      if (isFraction) {
        newAmount = `${calculateFractionalUnit(amount, batchAmount)} ${unit}`;
        break;
      }
      newAmount = `${Number(amount) * batchAmount} ${unit}`;
      break;
  }

  return {
    isHeading: false,
    text: ingredient.text.replace(fullMatch, newAmount),
  };
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
