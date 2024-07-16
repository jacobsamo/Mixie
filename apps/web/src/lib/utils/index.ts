import { clsx, type ClassValue } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
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
 * recipe_id('Chicken Tikka Masala') // 'chicken-tikka-masala'
 */
export function recipeId(title: string): string {
  return title
    .replace(/\s{2,}/, " ")
    .trim()
    .replace(/\s/g, "-")
    .toLowerCase();
}

/**
 * creates a new url from a pathname and params
 * @param {string} pathname
 * @param {URLSearchParams | ReadonlyURLSearchParams} params
 * @returns {string}
 */
export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
