DO $$ BEGIN
 CREATE TYPE "allergens" AS ENUM('none', 'gluten', 'dairy', 'nuts', 'eggs', 'soya', 'fish', 'shellfish', 'sesame', 'celery', 'mustard', 'lupin', 'molluscs');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "amount" AS ENUM('not_set', '1/8', '1/2', '1/3', '2/3', '1/4', '3/4');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "averageTimeToCook" AS ENUM('not_set', 'less_than_15', '15_to_30', '30_to_45', '45_to_60', '60_to_90', '90_to_120', 'more_than_120');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "diet" AS ENUM('none', 'vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'egg_free');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "dietary" AS ENUM('none', 'vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'egg_free');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "difficulty_level" AS ENUM('not_set', 'easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "fonts" AS ENUM('default', 'open_dyslexic', 'monospace', 'serif', 'sans_serif');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "loveCooking" AS ENUM('not_set', 'hate_it', 'dislike_it', 'neutral', 'like_it', 'love_it');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "mealTime" AS ENUM('not_set', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sweet_savoury" AS ENUM('not_set', 'sweet', 'savoury', 'both');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "theme" AS ENUM('system', 'light', 'dark');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "unit" AS ENUM('not_set', 'grams', 'kg', 'cup', 'ml', 'litre', 'tsp', 'tbsp', 'pinch', 'item', 'handful', 'slice', 'piece', 'can', 'bunch', 'bottle');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;


--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks" (
	"uid" char(36) PRIMARY KEY NOT NULL,
	"recipeId" char(36) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"collections" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collections" (
	"uid" char(36) PRIMARY KEY NOT NULL,
	"title" varchar(191) NOT NULL,
	"description" text,
	"userId" varchar(191) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ratings" (
	"recipeId" char(36) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"rating" smallint DEFAULT 0 NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"uid" char(36) PRIMARY KEY NOT NULL,
	"id" varchar(191) NOT NULL,
	"title" varchar(191) NOT NULL,
	"imageUrl" text,
	"imageAttributes" json,
	"description" text,
	"notes" text,
	"steps" json,
	"ingredients" json,
	"version" double precision DEFAULT 1,
	"source" varchar(191),
	"total" varchar(191),
	"prep" varchar(191),
	"cook" varchar(191),
	"serves" smallint,
	"rating" smallint DEFAULT 0,
	"dietary" json,
	"allergens" json,
	"mealTime" json,
	"sweet_savoury" "sweet_savoury" DEFAULT 'not_set',
	"difficulty_level" "difficulty_level" DEFAULT 'not_set',
	"isPublic" boolean DEFAULT false NOT NULL,
	"keywords" json,
	"ingredientsList" json,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_versions" (
	"uid" char(36) PRIMARY KEY NOT NULL,
	"recipeId" char(36) NOT NULL,
	"changes" json NOT NULL,
	"version" double precision DEFAULT 1.1 NOT NULL,
	"lastUpdated" timestamp DEFAULT now() NOT NULL,
	"lastUpdatedBy" varchar(191) NOT NULL
);
