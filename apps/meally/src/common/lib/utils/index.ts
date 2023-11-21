import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// export from other files
export * from "./ingredients";
export * from "./metadata";
export * from "./time";


/**
 * @param {ClassValue[]} inputs
 * @returns {string}
 */
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
