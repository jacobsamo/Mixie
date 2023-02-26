import { Info } from "./recipe";

export type Hit = {
  objectID: string;
  imgUrl: string;
  path: string;
  recipeName: string;
  ingredients: string[];
  keywords: string[];
  dietary: string[];
  info: Info;
  lastmodified: number;
};
