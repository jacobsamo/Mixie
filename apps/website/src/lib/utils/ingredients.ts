// import  Ingredient from "@/components/templates/RecipePage/ingredient/Ingredient";
import { Amount, Step, type Ingredient } from "@/types";
import Fraction from "fraction.js";
import * as fuzzball from "fuzzball";

export const units = {
  tsp: ["tsp", "teaspoon", "teaspoons", "t", "tsps"],
  tbsp: ["tbsp", "tablespoon", "tablespoons", "T", "tbsps"],
  grams: ["grams", "gram", "g", "gm", "gs"],
  kg: ["kg", "kgs", "kilogram", "kilograms"],
  cup: ["cup", "cups", "c"],
  ml: ["ml", "milliliter", "milliliters"],
  litre: ["litre", "litres", "l"],
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
    if (passed.isHeading || !passed.text) return;
    // get rid of any unwanted characters
    const ingredient = normalizeString(passed.text);
    // remove not word characters and split into parts
    const ingredientArr = normalizeString(passed.text).split(/\s+|\,/);

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
        get a certain number of chacters before asnd after, 
        get rid of spaces
        */
        const newString = stepWords
          .slice(word_index, word_index + ingredientArr.length)
          .join("");

        const ratio = fuzzball.ratio(newString, ingredient);

        if (ratio >= 45) found.push(passed);
      }
    });
  });

  return found.filter((v, i, a) => a.findIndex((t) => t.text === v.text) === i);
}

/**
 * Takes in fraction and a times amount and returns a new fraction
 * @param {string} amount
 * @param {number} batchAmount
 */
function calculateFractionalUnit(amount: string, batchAmount: number): string {
  const [numerator, denominator] = amount.split("/").map(Number);
  const value = denominator
    ? (numerator / denominator) * batchAmount
    : numerator * batchAmount;
  return new Fraction(value).toFraction(true);
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
  const match = ingredient.text.match(/(\d+(?:\/\d+)?)(?:\s*([a-zA-Z]+))?/i);
  if (!match) return ingredient;

  const [fullMatch, amount, unit] = match;
  const unitKey = Object.keys(units).find((key) =>
    units[key].includes(unit.toLowerCase())
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
