import { Timestamp } from 'firebase/firestore';

export type Recipe = {
  id: string;
  imageUrl: string;
  recipeName: string;
  recipeDescription: string;
  keywords: string[];
  ingredients: Array<string[]>;
  dietary: string[];
  Allergens: string[];
  version: number;
  createdBy: string;
  createdAt: Timestamp | string;
  info: Info;
  steps: Step[];
  madeRecipe: number;
  savedRecipe: number;
};

export type Info = {
  total?: string;
  prep: string;
  cook: string;
  serves?: string;
  rating?: number;
};

export type Step = {
  number: number;
  body: string;
};
