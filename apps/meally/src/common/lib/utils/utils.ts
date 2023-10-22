import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Fraction from "fraction.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

import { Amount, Step, type Ingredient } from "@db/types";
import { Metadata } from "next";

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
 * Takes in seconds to parse and return a time string matching `/^(\d{1,2}[hms]\s?)+$/i`
 * @param {number} seconds - seconds to be parsed
 * @returns {string} - return a string matching `/^(\d{1,2}[hms]\s?)+$/i` as a time string
 */
export const parseSecondsToTime = (seconds: number): string => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
  const min = Math.floor((seconds % (60 * 60)) / 60);
  const sec = seconds % 60;

  const timeUnits: string[] = [];
  if (days > 0) {
    timeUnits.push(`${days}d`);
  }
  if (hours > 0) {
    timeUnits.push(`${hours}h`);
  }
  if (min > 0) {
    timeUnits.push(`${min}m`);
  }
  if (sec > 0) {
    timeUnits.push(`${sec}s`);
  }

  return timeUnits.join(" ");
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

  return parseSecondsToTime(totalTime);
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
  switch (ingredient.unit.value) {
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
        ingredient.amount.value || "not_set",
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

export function calculateAllIngredients(
  ingredients: Ingredient[],
  batchAmount: number
) {
  return ingredients.map((ingredient) =>
    calculateIngredient(ingredient, batchAmount)
  );
}

// meta data
export function constructMetadata({
  title = "Meally",
  description = "Meally is a community-driven recipe platform where home cooks and food enthusiasts can collaborate on unique and delicious recipes",
  image = "/favicon.ico",
  domain = "meally.com.au",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  domain?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_AU",
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@meally",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(domain),
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "white" },
      { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    manifest: `/manifest.json`,
  };
}
