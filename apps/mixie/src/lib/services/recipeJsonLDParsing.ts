import { parseSecondsToTime } from "@/lib/utils";
import { Ingredient } from "@/types";
import * as cheerio from "cheerio";

/**
 * Parses the time from the recipe jsonld
 * @param {string} time - time string e.g `PT1H30M`
 * @returns {string} - return a string matching `/^(\d{1,2}[hms]\s?)+$/i` as a time string
 */
export function splitTime(time: string): string {
  const string = time.replace("PT", "").replace("M", "");
  return parseSecondsToTime(parseInt(string) * 60);
}

const units: any = [
  { tsp: ["tsp", "teaspoon", "teaspoons", "t", "tsps"] },
  { tbsp: ["tbsp", "tablespoon", "tablespoons", "T", "tbsps"] },
  { grams: ["grams", "gram", "g", "gm", "gs"] },
  { kg: ["kg", "kgs", "kilogram", "kilograms"] },
  { cup: ["cup", "cups", "c"] },
  { ml: ["ml", "milliliter", "milliliters"] },
  { litre: ["litre", "litres", "l"] },
  { slice: ["slice", "slices"] },
  { pinch: ["pinch", "pinches"] },
  { item: ["item", "items"] },
  { handful: ["handful", "handfuls"] },
  { piece: ["piece", "pieces"] },
  { can: ["can", "cans"] },
  { bunch: ["bunch", "bunches"] },
  { bottle: ["bottle", "bottles"] },
];

/**
 * Parses the ingredients from the recipe jsonld
 * @param {string[]} ingredients - ingredients array
 * @returns {Ingredient[]} - return an array of Ingredient objects
 */
export function convertIngredients(ingredients: string[]): Ingredient[] {
  const ingredientList: Ingredient[] = [];

  for (const ingredient of ingredients) {
    const cleanedIngredient = ingredient.replace(/[\(|/)]/gi, "").trim();
    const parts = cleanedIngredient.split(/[\,|\-|\s]+/g);

    let title = cleanedIngredient;
    let unit: Ingredient["unit"] = {
      value: "not_set",
      label: "not_set",
    };
    let amount: Ingredient["amount"] = {
      value: "not_set",
      label: "not_set",
    };
    let quantity: number | null = null;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      const digits = part.match(/[\d.]+/g);

      if (digits) {
        const letterMatch = part.toLowerCase().match(/[a-z]/gi) || "";
        const findNextTo = parts[i + 1].toLowerCase().trim();

        let match = "";

        units.forEach((unitObject: any) => {
          const key = Object.keys(unitObject)[0];
          const values = unitObject[key];

          if (values.includes(letterMatch[0]) || values.includes(findNextTo)) {
            unit = {
              value: key,
              label: key,
            } as Ingredient["unit"];

            values.forEach((value: string) => {
              const m = value == letterMatch[0] || value == findNextTo;

              if (m) match = value;
            });

            return;
          }
        });

        quantity = parseInt(digits[0]);

        title = cleanedIngredient
          .replace(match, "")
          .replace(digits[0].toString(), "")
          .trim();
      }

      if (
        (amount?.value === "not_set" ||
          ["cup", "tsp", "tbsp"].includes(unit.value)) &&
        !isNaN(quantity as number)
      ) {
        const amountMatch = part.match(/(1\/8|1\/2|1\/3|2\/3|1\/4|3\/4)/);
        if (amountMatch) {
          amount = {
            value: amountMatch[0],
            label: amountMatch[0],
          } as Ingredient["amount"];
          title = title.replace(parts[i], "").trim();
          continue;
        }
      }
    }

    const newTitle =
      title.charAt(0).toUpperCase() +
      title.replace(/\s\s+/g, " ").slice(1).trim();

    const ingredientObject: Ingredient = {
      title: newTitle,
      isHeading: false,
      unit,
      amount,
      quantity,
    };

    ingredientList.push(ingredientObject);
  }

  return ingredientList;
}

export const getRecipeJsonLd = async (link: string) => {
  let recipe: any;
  const data = await fetch(link).then((x) => x.text());
  const $ = cheerio.load(data);

  // Get all tags with type application/ld+json
  const tags = $('script[type="application/ld+json"]');

  // Iterate over each tag and check if it contains a recipe
  tags.each((i, el) => {
    const jsonLdObject = JSON.parse($(el).html() || "");
    // console.log("parsedData: ", jsonLdObject);

    if (jsonLdObject) {
      if (Array.isArray(jsonLdObject)) {
        // Handle case 2: Array of recipes
        recipe = jsonLdObject.find(
          (item) =>
            item["@type"] === "Recipe" || item["@type"].includes("Recipe")
        );
      } else if (
        jsonLdObject["@context"] === "https://schema.org" &&
        jsonLdObject["@type"] === "Recipe"
      ) {
        // Handle case 1: Single recipe object
        recipe = jsonLdObject;
      } else if (jsonLdObject["@graph"]) {
        recipe = jsonLdObject["@graph"].find(
          (item: any) =>
            item["@type"] === "Recipe" || item["@type"].includes("Recipe")
        );
      }
    }

    // If a recipe is found, break out of the loop
    if (recipe) {
      return false;
    }

    return false;
  });

  return recipe;
};
