import { ImageProps, Info } from "./recipe";

export interface Recipe {
  id: string;
  image: ImageProps;
  recipeName: string;
  keywords: string[];
  dietary: string[];
  sweet_savoury: string;
  info: Info;
}
