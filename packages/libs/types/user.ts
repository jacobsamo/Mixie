import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  photoURL: string;
  createdAt: Timestamp;
  displayName: string;
  userName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  TimeZone?: Timestamp;
  preferences?: UserPreferences;
  socials?: UserSocials;
}

export interface UserPreferences {
  Allergies: string[];
  Diet: string[];
  Intolerances: string[];
  CookingSkill: string[];
  GuaranteedIngredients: string[];
  IngredientSubstitutions: IngredientSubstitutions[];
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
