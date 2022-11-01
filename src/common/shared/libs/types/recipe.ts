import { Timestamp } from "firebase/firestore";

export type Recipe = {
    id: string;
    imageUrl?: string;
    recipeName: string;
    recipeDescription: string;
    info: Info,
    ingredients: string[];
    steps: Step[];
    madeRecipe: number;
    savedRecipe: number;
    createdAt: Timestamp | string;
    createdBy: string;
}

export type Info = {
    total?: string;
    prep: string;
    cook: string;
    serves?: string;
    rating?: number;
}

export type Step = {
    number: number;
    body: string;
}