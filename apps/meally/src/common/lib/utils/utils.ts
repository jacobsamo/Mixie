import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Fraction from "fraction.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const displayIngredient = (ingredient: IngredientType) =>
  `${ingredient.quantity} ${
    ingredient.amount && ingredient.amount.value == "not_set"
      ? ""
      : ingredient.amount?.label
  } ${
    ingredient.unit && ingredient.unit.value == "not_set"
      ? ""
      : ingredient.unit?.label.replace("item", "")
  } ${ingredient.title}`;

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

import { Amount, Step, type Ingredient as IngredientType } from "@db/types";
import { Metadata } from "next";
import Ingredient from "../../components/templates/RecipePage/ingredient/Ingredient";

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
  const newQuantity = split.length > 1 ? parseInt(split[0]) : null;
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
): IngredientType {
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
  url = "https://www.meally.com.au",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    authors: [
      {
        name: "meally",
        url: url,
      },
    ],
    openGraph: {
      type: "website",
      locale: "en_AU",
      title,
      description,
      images: {
        url: image || "/banner.png",
        alt: title,
      },
      url: url,
      siteName: "Meally",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${url}/favicon.ico`],
      creator: "@meally",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    manifest: `/manifest.json`,
    keywords: [
      "cooking",
      "recipes",
      "recipe",
      "food",
      "meals",
      "meal",
      "ingredients",
      "ingredient",
      "nutrition",
      "nutritional",
      "nutrients",
      "nutrient",
      "calories",
      "calorie",
      "diet",
    ],
  };
}
