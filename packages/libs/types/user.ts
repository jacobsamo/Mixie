import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  photoURL: string;
  createdAt: Timestamp;
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
}

export interface UserSettings {
  Notifications: boolean;
  Email: boolean;
  SMS: boolean;
  Push: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"; 
  font: "default" | "sans-serif" | "serif" | "monospace" | "open dyslexic";
  CookingSkill?: string[];
  Allergies?: string[];
  Diet?: string[]; //items a user is on a diet for e.g vegan, keto, etc
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
