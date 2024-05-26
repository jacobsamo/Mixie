// import  Ingredient from "@/components/templates/RecipePage/ingredient/Ingredient";
import { Amount, Step, type Ingredient } from "@/types";
import Fraction from "fraction.js";
import * as fuzzball from "fuzzball";

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
 * Takes in a cup unit e.g cup, tsp, tbsp and return it. as we have to calculate fractions
 * @param {Ingredient["quantity"]} quantity
 * @param {Amount} amount
 * @param {number} batchAmount
 * @returns { quantity: Ingredient["quantity"]; amount: Amount } calculated cup units
 */
function calculateCupUnits(amount: Amount, batchAmount: number): {} {
  const fr = amount.split("/");

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
  if (ingredient.isHeading) return ingredient;

  //TODO: rewrite the caluclation logic

  return ingredient;
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
