import { ImageProps } from "./recipe";
import { Timestamp } from "firebase/firestore";

export interface SimplifiedRecipe {
  id: string;
  image: ImageProps;
  recipeName: string;
  keywords: string[];
  dietary: string[];
  sweet_savoury: string;
  createdBy: string;
  createdAt: string | Timestamp;
  info: {total: number, rating: number};
}
