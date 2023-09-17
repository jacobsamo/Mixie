import { Amount, Ingredient } from "@/src/db/types";
import { parseSecondsToTime } from "../utils";
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

/*
"recipeIngredient": [
      "18.20 gm extra virgin olive oil",
      "2kg Whole Lamb Leg Roast",
      "2 tsp cracked black pepper",
      "3 rosemary sprigs",
      "8 garlic cloves, peeled",
      "250ml chicken stock",
      "600g baby potatoes, halved",
      "1 bunch Dutch carrots, trimmed",
      "Steamed greens, to serve"
    ], 
*/


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
export async function convertIngredients(ingredients: string[]): Promise<Ingredient[]> {
  const ingredientList: Ingredient[] = [];

  for (const ingredient of ingredients) {
    // Split the ingredient string into parts based on comma, semicolon, or hyphen
    // const parts = ingredient.split(" ");
    const parts = ingredient.split(/[,|\-|\s]/);
    // Initialize the default values for the Ingredient object
    let title = ingredient.trim();
    let unit: Ingredient["unit"] = "not_set";
    let amount: Ingredient["amount"] = "not_set";
    let quantity: Ingredient["quantity"] = null;
    

    // set quantity 
    const quantityMatch = ingredient.match(/[\d.]+/g);
    if (quantityMatch && quantity == null) {
      quantity = parseFloat(quantityMatch[0]);
      title = title.replace(quantityMatch[0], "");
    }

    // Check for unit and amount in the remaining parts
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i].trim();

      // Check for unit
      if (unit === "not_set") {
        units.forEach((unitObject: any) => {
          const key = Object.keys(unitObject)[0];
          const values = unitObject[key];
          if (values.includes(part.toLowerCase())) {
            unit = key as Ingredient["unit"];
            title = title.replace(parts[i], "");
          }
        });
      }

      // Check for amount
      if (amount === "not_set" || ["not_set", "tsp", "tbsp"].includes(unit)) {
        const amountMatch = part.match(/(1\/8|1\/2|1\/3|2\/3|1\/4|3\/4)/);
        if (amountMatch) {
          amount = amountMatch[0] as Ingredient["amount"];
          title = title.replace(parts[i], "");
          continue;
        }
      }

      // set quantity
    }

    // Create the Ingredient object and push it to the list
    const ingredientObject: Ingredient = {
      title: title.replace("  ", " ").trim(),
      isHeading: false, // Default value
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