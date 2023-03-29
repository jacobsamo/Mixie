import { ImageProps, Info } from "./recipe";

interface SimplifiedRecipe {
  id: string;
  image: ImageProps;
  recipeName: string;
  keywords: string[];
  dietary: string[];
  sweet_savoury: string;
  info: Info;
}

export type { SimplifiedRecipe };
