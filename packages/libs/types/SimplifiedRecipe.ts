import { ImageProps } from "./recipe";
import { Timestamp } from "firebase/firestore";

/**
 * @description A simplified version of the recipe that is used for Bookmarks and tracking history
 */
export interface SimplifiedRecipe {
  /**
   * @description The id of the recipe usually the same as the recipeName but in lowercase and with spaces replaced with hyphens
   * @example "chocolate-cake"
   */
  id: string;
  /**
   * @description The image and description for the recipe
   * @example {image: {url: "https://www.example.com/image.jpg", alt: "A picture of a recipe"}, description: "A description of the recipe"}
   */
  image: ImageProps;
  /**
   * @description The name of the recipe
   * @example "Chocolate Cake"
   */
  recipeName: string;
  /**
   * @description The keywords that are used to search for the recipe
   */
  keywords: string[];
  /**
   * @description The time it takes to prepare and cook the recipe represented as a string like: 1h 30m
   */
  totalCookTime: string;
  /**
   * @description The last time the recipe was viewed or saved depends wether it was saved a bookmark or saved as history
   */
  lastViewed: Timestamp;
  /**
   * @description privacy is used to determine whether the recipe is public or private
   * either "public" or "private"
   */
  privacy: "public" | "private";
}

export type { SimplifiedRecipe };
