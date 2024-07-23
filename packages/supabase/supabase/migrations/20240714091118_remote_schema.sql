
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "pg_database_owner";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";

CREATE TYPE "public"."allergens" AS ENUM (
    'none',
    'gluten',
    'dairy',
    'nuts',
    'eggs',
    'soya',
    'fish',
    'shellfish',
    'sesame',
    'celery',
    'mustard',
    'lupin',
    'molluscs'
);

ALTER TYPE "public"."allergens" OWNER TO "postgres";

CREATE TYPE "public"."amount" AS ENUM (
    'not_set',
    '1/8',
    '1/2',
    '1/3',
    '2/3',
    '1/4',
    '3/4'
);

ALTER TYPE "public"."amount" OWNER TO "postgres";

CREATE TYPE "public"."averageTimeToCook" AS ENUM (
    'not_set',
    'less_than_15',
    '15_to_30',
    '30_to_45',
    '45_to_60',
    '60_to_90',
    '90_to_120',
    'more_than_120'
);

ALTER TYPE "public"."averageTimeToCook" OWNER TO "postgres";

CREATE TYPE "public"."blog_type" AS ENUM (
    'blog',
    'release',
    'announcement',
    'event'
);

ALTER TYPE "public"."blog_type" OWNER TO "postgres";

CREATE TYPE "public"."diet" AS ENUM (
    'none',
    'vegetarian',
    'vegan',
    'pescatarian',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'egg_free'
);

ALTER TYPE "public"."diet" OWNER TO "postgres";

CREATE TYPE "public"."dietary" AS ENUM (
    'none',
    'vegetarian',
    'vegan',
    'pescatarian',
    'gluten_free',
    'dairy_free',
    'nut_free',
    'egg_free'
);

ALTER TYPE "public"."dietary" OWNER TO "postgres";

CREATE TYPE "public"."difficulty_level" AS ENUM (
    'not_set',
    'easy',
    'medium',
    'hard'
);

ALTER TYPE "public"."difficulty_level" OWNER TO "postgres";

CREATE TYPE "public"."document_type" AS ENUM (
    'privacy_policy',
    'terms_of_service'
);

ALTER TYPE "public"."document_type" OWNER TO "postgres";

CREATE TYPE "public"."feedback_type" AS ENUM (
    'feature',
    'bug',
    'other'
);

ALTER TYPE "public"."feedback_type" OWNER TO "postgres";

CREATE TYPE "public"."fonts" AS ENUM (
    'default',
    'open_dyslexic',
    'monospace',
    'serif',
    'sans_serif'
);

ALTER TYPE "public"."fonts" OWNER TO "postgres";

CREATE TYPE "public"."loveCooking" AS ENUM (
    'not_set',
    'hate_it',
    'dislike_it',
    'neutral',
    'like_it',
    'love_it'
);

ALTER TYPE "public"."loveCooking" OWNER TO "postgres";

CREATE TYPE "public"."mealTime" AS ENUM (
    'not_set',
    'breakfast',
    'lunch',
    'dinner',
    'snack',
    'dessert'
);

ALTER TYPE "public"."mealTime" OWNER TO "postgres";

CREATE TYPE "public"."recipe_creation_type" AS ENUM (
    'title',
    'image',
    'link',
    'upload'
);

ALTER TYPE "public"."recipe_creation_type" OWNER TO "postgres";

CREATE TYPE "public"."sweet_savoury" AS ENUM (
    'not_set',
    'sweet',
    'savoury',
    'both'
);

ALTER TYPE "public"."sweet_savoury" OWNER TO "postgres";

CREATE TYPE "public"."theme" AS ENUM (
    'system',
    'light',
    'dark'
);

ALTER TYPE "public"."theme" OWNER TO "postgres";

CREATE TYPE "public"."unit" AS ENUM (
    'not_set',
    'grams',
    'kg',
    'cup',
    'ml',
    'litre',
    'tsp',
    'tbsp',
    'pinch',
    'item',
    'handful',
    'slice',
    'piece',
    'can',
    'bunch',
    'bottle'
);

ALTER TYPE "public"."unit" OWNER TO "postgres";

CREATE TYPE "public"."user_role" AS ENUM (
    'user',
    'admin'
);

ALTER TYPE "public"."user_role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (profile_id, full_name, profile_picture, bio, first_name, last_name, user_name, email)
  values (
        new.id,
        new.raw_user_meta_data ->> 'full_name',
        new.raw_user_meta_data ->> 'picture',
        null,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        null,
        new.email
    );
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."blog" (
    "blog_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "image_url" "text",
    "content" "text" NOT NULL,
    "tags" "text"[],
    "blog_type" "public"."blog_type" DEFAULT 'blog'::"public"."blog_type" NOT NULL,
    "author_id" "uuid" NOT NULL,
    "published" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "image_attributes" "json",
    "slug" "text" NOT NULL
);

ALTER TABLE "public"."blog" OWNER TO "postgres";

COMMENT ON COLUMN "public"."blog"."slug" IS 'Link of the blog default is title.replace(" ", "-")';

CREATE OR REPLACE VIEW "public"."blog_view" AS
 SELECT "b"."blog_id",
    "b"."title",
    "b"."image_url",
    "b"."image_attributes",
    "b"."content",
    "b"."tags",
    "b"."blog_type",
    "b"."author_id",
    "a"."raw_user_meta_data" AS "author_meta",
    "b"."published",
    "b"."created_at",
    "b"."updated_at"
   FROM ("public"."blog" "b"
     LEFT JOIN "auth"."users" "a" ON (("b"."author_id" = "a"."id")));

ALTER TABLE "public"."blog_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."bookmark_link" (
    "bookmark_id" "uuid" NOT NULL,
    "recipe_id" "uuid",
    "user_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "collection_id" "uuid" NOT NULL,
    "link_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."bookmark_link" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."bookmarks" (
    "bookmark_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipe_id" "uuid",
    "user_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "notes" "text",
    "tags" "text"[],
    "rating" smallint,
    CONSTRAINT "ratings_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);

ALTER TABLE "public"."bookmarks" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."bookmarks_view" AS
SELECT
    NULL::"uuid" AS "bookmark_id",
    NULL::"uuid" AS "recipe_id",
    NULL::"uuid" AS "user_id",
    NULL::timestamp with time zone AS "created_at",
    NULL::"text" AS "notes",
    NULL::"text"[] AS "tags",
    NULL::smallint AS "rating",
    NULL::"json" AS "recipes",
    NULL::"json" AS "collections";

ALTER TABLE "public"."bookmarks_view" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."collections" (
    "collection_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" character varying(150) NOT NULL,
    "description" character varying(500),
    "user_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);

ALTER TABLE "public"."collections" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."documents" (
    "document_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "document_type" "public"."document_type" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."documents" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."feedback" (
    "feedback_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "type" "public"."feedback_type" DEFAULT 'other'::"public"."feedback_type" NOT NULL,
    "title" character varying(250) NOT NULL,
    "description" "text" NOT NULL,
    "page" "text",
    "user_email" "text" NOT NULL,
    "user_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);

ALTER TABLE "public"."feedback" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "profile_id" "uuid" NOT NULL,
    "full_name" "text",
    "profile_picture" "text",
    "bio" "text",
    "first_name" "text",
    "last_name" "text",
    "user_name" "text",
    "email" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_role" "public"."user_role" DEFAULT 'user'::"public"."user_role" NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."ratings" (
    "rating_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipe_id" "uuid",
    "user_id" "uuid",
    "rating" smallint NOT NULL,
    CONSTRAINT "ratings_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);

ALTER TABLE "public"."ratings" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."recipe_versions" (
    "recipe_version_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recipe_id" "uuid",
    "version" "text" NOT NULL,
    "changes" "json" NOT NULL,
    "updated_by" "uuid",
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "recipe_versions_version_check" CHECK (("version" ~ '^[0-9]+\\.[0-9]+$'::"text"))
);

ALTER TABLE "public"."recipe_versions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."recipes" (
    "recipe_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "id" "text" NOT NULL,
    "title" character varying(150) NOT NULL,
    "image_url" "text",
    "image_attributes" "json",
    "description" "text",
    "notes" "text",
    "nutrition" "json",
    "suitable_for_diet" "uuid",
    "version" "text" DEFAULT '1.0'::"text" NOT NULL,
    "source" "text",
    "total_time" integer,
    "prep_time" integer,
    "cook_time" integer,
    "yield" smallint,
    "steps" "json",
    "ingredients" "json",
    "rating" smallint DEFAULT 0,
    "sweet_savoury" "public"."sweet_savoury" DEFAULT 'not_set'::"public"."sweet_savoury" NOT NULL,
    "difficulty_level" "public"."difficulty_level" DEFAULT 'not_set'::"public"."difficulty_level" NOT NULL,
    "public" boolean DEFAULT false NOT NULL,
    "keywords" "text"[],
    "ingredients_list" "text"[],
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "created_by" "uuid" NOT NULL,
    "meal_time" "json",
    "category" "text"[],
    "cuisine" "text"[],
    "recipe_creation_type" "public"."recipe_creation_type" DEFAULT 'title'::"public"."recipe_creation_type" NOT NULL,
    CONSTRAINT "recipes_source_check" CHECK (("source" ~ 'https?:\/\/([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$'::"text")),
    CONSTRAINT "recipes_version_check" CHECK (("version" ~ '^([0-9]{1,2})\.[0-9]$'::"text"))
);

ALTER TABLE "public"."recipes" OWNER TO "postgres";

ALTER TABLE ONLY "public"."blog"
    ADD CONSTRAINT "blog_pkey" PRIMARY KEY ("blog_id");

ALTER TABLE ONLY "public"."blog"
    ADD CONSTRAINT "blog_slug_key" UNIQUE ("slug");

ALTER TABLE ONLY "public"."blog"
    ADD CONSTRAINT "blog_title_key" UNIQUE ("title");

ALTER TABLE ONLY "public"."bookmark_link"
    ADD CONSTRAINT "bookmark_link_pkey" PRIMARY KEY ("link_id");

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("bookmark_id");

ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("collection_id");

ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("document_id");

ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("profile_id");

ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_pkey" PRIMARY KEY ("rating_id");

ALTER TABLE ONLY "public"."recipe_versions"
    ADD CONSTRAINT "recipe_versions_pkey" PRIMARY KEY ("recipe_version_id");

ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_pkey" PRIMARY KEY ("recipe_id");

CREATE INDEX "recipes_created_by_idx" ON "public"."recipes" USING "btree" ("created_by");

CREATE OR REPLACE VIEW "public"."bookmarks_view" AS
 SELECT "b"."bookmark_id",
    "b"."recipe_id",
    "b"."user_id",
    "b"."created_at",
    "b"."notes",
    "b"."tags",
    "b"."rating",
    "json_agg"("r".*) AS "recipes",
    "json_agg"("c"."collection_id") AS "collections"
   FROM ((("public"."bookmark_link" "bl"
     LEFT JOIN "public"."collections" "c" ON (("bl"."collection_id" = "c"."collection_id")))
     LEFT JOIN "public"."recipes" "r" ON (("bl"."recipe_id" = "r"."recipe_id")))
     LEFT JOIN "public"."bookmarks" "b" ON (("bl"."bookmark_id" = "b"."bookmark_id")))
  GROUP BY "b"."bookmark_id", "r"."recipe_id", "c"."collection_id";

ALTER TABLE ONLY "public"."blog"
    ADD CONSTRAINT "blog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."bookmark_link"
    ADD CONSTRAINT "bookmark_link_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("bookmark_id");

ALTER TABLE ONLY "public"."bookmark_link"
    ADD CONSTRAINT "bookmark_link_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("collection_id");

ALTER TABLE ONLY "public"."bookmark_link"
    ADD CONSTRAINT "bookmark_link_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("recipe_id");

ALTER TABLE ONLY "public"."bookmark_link"
    ADD CONSTRAINT "bookmark_link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("recipe_id");

ALTER TABLE ONLY "public"."bookmarks"
    ADD CONSTRAINT "bookmarks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."feedback"
    ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("recipe_id");

ALTER TABLE ONLY "public"."ratings"
    ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."recipe_versions"
    ADD CONSTRAINT "recipe_versions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("recipe_id");

ALTER TABLE ONLY "public"."recipe_versions"
    ADD CONSTRAINT "recipe_versions_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."recipes"
    ADD CONSTRAINT "recipes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE;

CREATE POLICY "Allow selecting non-public recipes created by the user." ON "public"."recipes" USING (((( SELECT "auth"."uid"() AS "uid") = "created_by") OR ("public" = true)));

CREATE POLICY "Enable update for authenticated users" ON "public"."recipes" FOR UPDATE TO "authenticated";

CREATE POLICY "Restrict creation to user's own records." ON "public"."recipes" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "created_by"));

ALTER TABLE "public"."recipes" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."blog" TO "anon";
GRANT ALL ON TABLE "public"."blog" TO "authenticated";
GRANT ALL ON TABLE "public"."blog" TO "service_role";

GRANT ALL ON TABLE "public"."blog_view" TO "anon";
GRANT ALL ON TABLE "public"."blog_view" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_view" TO "service_role";

GRANT ALL ON TABLE "public"."bookmark_link" TO "anon";
GRANT ALL ON TABLE "public"."bookmark_link" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmark_link" TO "service_role";

GRANT ALL ON TABLE "public"."bookmarks" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks" TO "service_role";

GRANT ALL ON TABLE "public"."bookmarks_view" TO "anon";
GRANT ALL ON TABLE "public"."bookmarks_view" TO "authenticated";
GRANT ALL ON TABLE "public"."bookmarks_view" TO "service_role";

GRANT ALL ON TABLE "public"."collections" TO "anon";
GRANT ALL ON TABLE "public"."collections" TO "authenticated";
GRANT ALL ON TABLE "public"."collections" TO "service_role";

GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";

GRANT ALL ON TABLE "public"."feedback" TO "anon";
GRANT ALL ON TABLE "public"."feedback" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."ratings" TO "anon";
GRANT ALL ON TABLE "public"."ratings" TO "authenticated";
GRANT ALL ON TABLE "public"."ratings" TO "service_role";

GRANT ALL ON TABLE "public"."recipe_versions" TO "anon";
GRANT ALL ON TABLE "public"."recipe_versions" TO "authenticated";
GRANT ALL ON TABLE "public"."recipe_versions" TO "service_role";

GRANT ALL ON TABLE "public"."recipes" TO "anon";
GRANT ALL ON TABLE "public"."recipes" TO "authenticated";
GRANT ALL ON TABLE "public"."recipes" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
