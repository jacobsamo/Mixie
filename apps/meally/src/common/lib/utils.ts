import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Fraction from "fraction.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a recipe title to a recipe id
 * @param {string} title The title of the recipe
 * @return {string} The id of the recipe
 *
 * @example
 * recipeId('Chicken Tikka Masala') // 'chicken-tikka-masala'
 */
export function recipeId(title: string): string {
  return title.replace(/\s/g, "-").toLowerCase();
}

import { Amount, type Ingredient } from "@/src/db/types";

/**
 * Takes in a time string matching `/^(\d{1,2}[hms]\s?)+$/i` and returns the total time in seconds
 * @param {RegExpMatchArray} timeString - time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @returns {number} total time in seconds
 */
const parseTimeToSeconds = (timeString: RegExpMatchArray) => {
  const time = timeString[0].split(" ");

  const timeMap = time.map((time): number | undefined => {
    if (time.includes("h")) {
      return parseInt(time) * 60 * 60;
    } else if (time.includes("m")) {
      return parseInt(time) * 60;
    } else if (time.includes("s")) {
      return parseInt(time);
    }
  });
  // return the sum of total seconds
  return timeMap.reduce((acc, curr) => acc! + curr!, 0);
};

/**
 * Takes in a prep and cook time string and returns the total time in the same format
 * @param {string} prep - prep time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @param {string} cook - cook time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @returns {string} total time in the same format
 */
export async function calculateTotalTime(prep: string, cook: string) {
  const matchRegex = /^(\d{1,2}[hms]\s?)+$/i;

  const prepT = prep.match(matchRegex);
  const cookT = cook.match(matchRegex);

  if (!prepT || !cookT) {
    throw new Error("Invalid time string format");
  }

  const prepTime = parseTimeToSeconds(prepT);
  const cookTime = parseTimeToSeconds(cookT);

  const totalTime = prepTime! + cookTime!;

  const days = Math.floor(totalTime / (24 * 60 * 60));
  const hours = Math.floor((totalTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalTime % (60 * 60)) / 60);
  const seconds = totalTime % 60;

  const timeUnits: string[] = [];
  if (days > 0) {
    timeUnits.push(`${days}d`);
  }
  if (hours > 0) {
    timeUnits.push(`${hours}h`);
  }
  if (minutes > 0) {
    timeUnits.push(`${minutes}m`);
  }
  if (seconds > 0) {
    timeUnits.push(`${seconds}s`);
  }

  return timeUnits.join(" ");
}

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
  const newQuantity = split.length > 1 ? parseInt(split[0]) : undefined;
  const newMeasurement =
    split.length > 1 ? (split[1] as Amount) : (split[0] as Amount);

  return {
    quantity: newQuantity,
    amount: newMeasurement,
  };
}

export function calculateIngredient(
  ingredient: Ingredient,
  batchAmount: number
): Ingredient {
  const q = ingredient.quantity || 0;
  switch (ingredient.unit) {
    case "grams":
      const gramQuantity = q * batchAmount;
      return {
        ...ingredient,
        quantity: gramQuantity >= 1000 ? gramQuantity / 1000 : gramQuantity,
        unit: gramQuantity >= 1000 ? "kg" : "grams",
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
        ingredient.amount || "not_set",
        batchAmount
      );
      return {
        ...ingredient,
        quantity: quantity,
        amount: amount,
      };
    case "ml":
      const mlQuantity = q * batchAmount;
      return {
        ...ingredient,
        quantity: mlQuantity >= 1000 ? mlQuantity / 1000 : mlQuantity,
        unit: mlQuantity >= 1000 ? "litre" : "ml",
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

export function calculateAllIngredients(
  ingredients: Ingredient[],
  batchAmount: number
) {
  return ingredients.map((ingredient) =>
    calculateIngredient(ingredient, batchAmount)
  );
}
