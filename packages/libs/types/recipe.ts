import { Timestamp } from "firebase/firestore";

// Generated by https://quicktype.io
// honestly quicktype extension in vscode is great if your not sure of the json objects types

export type Recipe = {
  id: string;
  image: ImageProps;
  recipeName: string;
  recipeDescription: string;
  notes?: string;
  info: Info;
  ingredients: Ingredient[];
  steps: Step[];
  keywords: string[];
  dietary: SelectValue[];
  allergens: SelectValue[];
  sweet_savoury: SelectValue;
  mealTime: SelectValue;
  version: string;
  createdBy: UserInfo;
  createdAt: Timestamp;
  lastUpdated: Timestamp;
  lastUpdatedBy: UserInfo;
  madeRecipe: number;
  savedRecipe: number;
};

export type SelectValue = {
  value: string;
  label: string;
};

export type Info = {
  total: string;
  prep: string;
  cook: string;
  serves: number | undefined;
  rating?: RatingScale;
};

export type RatingScale = 0 | 1 | 2 | 3 | 4 | 5;

export type Rating = {
  rating: RatingScale;
  user: {
    uid: string;
    displayName: string;
  };
};

export type Step = {
  step_body: string;
};

export type Ingredient = {
  ingredient?: string;
  unit?: Unit;
  quantity?: number;
  measurement?: Measurement;
  heading?: string;
};

export type Measurement = "" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4";

export type Unit =
  | "grams"
  | "kg"
  | "cup"
  | "ml"
  | "litre"
  | "tsp"
  | "tbsp"
  | "pinch"
  | "item";

export type ImageProps = {
  imgUrl: string;
  imgAlt: string;
};

export type UserInfo = {
  uid: string | undefined;
  displayName: string | null | undefined;
  userName: string;
  email?: string | null | undefined;
  phoneNumber?: string | null | undefined;
};
