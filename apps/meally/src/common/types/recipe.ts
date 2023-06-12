// you might ask why are we do we have this type here instead of just using the prisma type? \
// well, the reason is that we want to have a type that is not tied to the prisma schema, this allows us to join other things together so that the frontend has what it needs and is easy to use a developer

export type Recipe = {
    uid: string;
    id: string;
    image: ImageProps;
    title: string;
    recipeDescription: string;
    notes?: string;
    info: Info;
    ingredients: Ingredient[];
    steps: Step[];
    keywords: { value: string }[];
    dietary: SelectValue[];
    allergens: SelectValue[];
    sweet_savoury: SelectValue;
    mealTime: SelectValue;
    version: string;
    createdAt: Date;
    lastUpdated: Date;
    createdBy: string;
    lastUpdatedBy: string;
    user: User;
  
    madeRecipe: number;
    savedRecipe: number;
  
    team?: string;
    isPublic: boolean;
    isPublished: boolean;
    isDraft: boolean;
    isFavorite: boolean;
    isLiked: boolean;
    isBookMarked: boolean;
    isShared: boolean;
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
    isHeading?: boolean;
    title?: string;
    unit?: Unit;
    quantity?: number;
    amount?: Measurement;
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
  
  export type User = {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    accounts: Account[];
    sessions: Session[];
    recipes: Recipe[];
  };
  
  export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  };
  
  export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
  };
  
  export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
  };
  