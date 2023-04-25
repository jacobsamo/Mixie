import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  photoURL: string;
  displayName: string;
  userName: string;
  bio?: string;
  email: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  TimeZone?: Timestamp;
  preferences?: UserPreferences;
  settings?: UserSettings;
  socials?: UserSocials;
  createdAt: Timestamp;
  lastUpdated?: Date;
}

export interface UserSettings {
  Notifications: boolean;
  Email: boolean;
  SMS: boolean;
  Push: boolean;
}

export enum Theme {
  LIGHT = "Light",
  DARK = "Dark",
  SYSTEM = "System",
}

export enum Font {
  DEFAULT = "Default",
  SANS_SERIF = "sans-serif",
  SERIF = "serif",
  MONOSPACE = "monospace",
  OPEN_DYSLEXIC = "open dyslexic",
}

export enum Diet {
  KETO = "Keto",
  PALEO = "Paleo",
  GLUTEN_FREE = "Gluten-free",
  DAIRY_FREE = "Dairy-free",
  VEGAN = "Vegan",
  VEGETARIAN = "Vegetarian",
  OTHER = "Other",
}

export enum Allergies {
  GLUTEN_FREE = "Gluten Free",
  DAIRY_FREE = "Dairy Free",
  NUT_FREE = "Nut Free",
  OTHER = "Other",
}

export interface UserPreferences {
  theme: Theme;
  font: Font;
  CookingSkill?: string[];
  Allergies?: Allergies[];
  Diet?: Diet[]; //items a user is on a diet for e.g vegan, keto, etc
  IngredientSubstitutions?: IngredientSubstitutions[]; // items a user wants to substitute for other items
  loveCooking?: string[]; // items a user loves to cook e.g easy meals, desserts, etc
  AverageCookingTime?: number; // average cooking time in minutes
  budget?: number; // budget in dollars or an average at least
  Timezone?: string; // Timezone e.g America/New_York
  measurement?: " metric" | "imperial";
  // GuaranteedIngredients: string[];
}

interface IngredientSubstitutions {
  Ingredient: string;
  Substitution: string;
}

/**
 * Socials for a user
 * @param {string} Facebook - Facebook URL or username
 * @param {string} Instagram - Instagram URL or username
 * @param {string} Twitter - Twitter URL or username
 * @param {string} Pinterest - Pinterest URL or username
 * @param {string} YouTube - YouTube URL or username
 * @param {string} Website - Website URL
 */
export interface UserSocials {
  Facebook: string;
  Instagram: string;
  Twitter: string;
  Pinterest: string;
  YouTube: string;
  Website: string;
}
