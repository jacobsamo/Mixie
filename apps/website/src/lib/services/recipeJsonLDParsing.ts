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
 * Converts a time format string to minutes
 * @param {string} time - time format string e.g. `PT1H30M` or `30M`
 * @returns {number} - the time in minutes
 */
function convertTimeToMinutes(time: string): number {
  const hoursRegex = /(\d+)H/;
  const minutesRegex = /(\d+)M/;
  let totalMinutes = 0;

  const hoursMatch = time.match(hoursRegex);
  if (hoursMatch) {
    const hours = parseInt(hoursMatch[1]);
    totalMinutes += hours * 60;
  }

  const minutesMatch = time.match(minutesRegex);
  if (minutesMatch) {
    const minutes = parseInt(minutesMatch[1]);
    totalMinutes += minutes;
  }

  return totalMinutes;
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
