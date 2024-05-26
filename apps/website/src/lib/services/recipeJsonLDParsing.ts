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

/**
 * Metric units
 */
const units = {
  "tsp": ["tsp", "teaspoon", "teaspoons", "t", "tsps"],
  "tbsp": ["tbsp", "tablespoon", "tablespoons", "T", "tbsps"],
  "grams": ["grams", "gram", "g", "gm", "gs"],
  "kg": ["kg", "kgs", "kilogram", "kilograms"],
  "cup": ["cup", "cups", "c"],
  "ml": ["ml", "milliliter", "milliliters"],
  "litre": ["litre", "litres", "l"],
  "slice": ["slice", "slices"],
  "pinch": ["pinch", "pinches"],
  "item": ["item", "items"],
  "handful": ["handful", "handfuls"],
  "piece": ["piece", "pieces"],
  "can": ["can", "cans"],
  "bunch": ["bunch", "bunches"],
  "bottle": ["bottle", "bottles"], 
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
