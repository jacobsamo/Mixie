create extension if not exists "hypopg" with schema "extensions";

create extension if not exists "index_advisor" with schema "extensions";

create extension if not exists "vector" with schema "extensions";


create type "public"."allergens" as enum ('none', 'gluten', 'dairy', 'nuts', 'eggs', 'soya', 'fish', 'shellfish', 'sesame', 'celery', 'mustard', 'lupin', 'molluscs');

create type "public"."amount" as enum ('not_set', '1/8', '1/2', '1/3', '2/3', '1/4', '3/4');

create type "public"."averageTimeToCook" as enum ('not_set', 'less_than_15', '15_to_30', '30_to_45', '45_to_60', '60_to_90', '90_to_120', 'more_than_120');

create type "public"."blog_type" as enum ('blog', 'release', 'announcement', 'event');

create type "public"."diet" as enum ('none', 'vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'egg_free');

create type "public"."dietary" as enum ('none', 'vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'egg_free');

create type "public"."difficulty_level" as enum ('not_set', 'easy', 'medium', 'hard');

create type "public"."document_type" as enum ('privacy_policy', 'terms_of_service');

create type "public"."feedback_type" as enum ('feature', 'bug', 'other');

create type "public"."fonts" as enum ('default', 'open_dyslexic', 'monospace', 'serif', 'sans_serif');

create type "public"."loveCooking" as enum ('not_set', 'hate_it', 'dislike_it', 'neutral', 'like_it', 'love_it');

create type "public"."mealTime" as enum ('not_set', 'breakfast', 'lunch', 'dinner', 'snack', 'dessert');

create type "public"."recipe_creation_type" as enum ('title', 'image', 'link', 'upload');

create type "public"."sweet_savoury" as enum ('not_set', 'sweet', 'savoury', 'both');

create type "public"."theme" as enum ('system', 'light', 'dark');

create type "public"."unit" as enum ('not_set', 'grams', 'kg', 'cup', 'ml', 'litre', 'tsp', 'tbsp', 'pinch', 'item', 'handful', 'slice', 'piece', 'can', 'bunch', 'bottle');

create type "public"."user_role" as enum ('user', 'admin');

create table "public"."blog" (
    "blog_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "image_url" text,
    "content" text not null,
    "tags" text[],
    "blog_type" blog_type not null default 'blog'::blog_type,
    "author_id" uuid not null,
    "published" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "image_attributes" json,
    "slug" text not null
);


create table "public"."bookmark_link" (
    "bookmark_id" uuid not null,
    "recipe_id" uuid,
    "user_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "collection_id" uuid not null,
    "link_id" uuid not null default gen_random_uuid()
);


create table "public"."bookmarks" (
    "bookmark_id" uuid not null default gen_random_uuid(),
    "recipe_id" uuid,
    "user_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "notes" text,
    "tags" text[],
    "rating" smallint
);


create table "public"."collections" (
    "collection_id" uuid not null default gen_random_uuid(),
    "title" character varying(150) not null,
    "description" character varying(500),
    "user_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."documents" (
    "document_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "content" text not null,
    "document_type" document_type not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."feedback" (
    "feedback_id" uuid not null default gen_random_uuid(),
    "type" feedback_type not null default 'other'::feedback_type,
    "title" character varying(250) not null,
    "description" text not null,
    "page" text,
    "user_email" text not null,
    "user_id" uuid,
    "created_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."profiles" (
    "profile_id" uuid not null,
    "full_name" text,
    "profile_picture" text,
    "bio" text,
    "first_name" text,
    "last_name" text,
    "user_name" text,
    "email" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "user_role" user_role not null default 'user'::user_role
);


create table "public"."ratings" (
    "rating_id" uuid not null default gen_random_uuid(),
    "recipe_id" uuid,
    "user_id" uuid,
    "rating" smallint not null
);


create table "public"."recipe_versions" (
    "recipe_version_id" uuid not null default gen_random_uuid(),
    "recipe_id" uuid,
    "version" text not null,
    "changes" json not null,
    "updated_by" uuid,
    "updated_at" timestamp with time zone not null default timezone('utc'::text, now())
);


create table "public"."recipes" (
    "recipe_id" uuid not null default gen_random_uuid(),
    "id" text not null,
    "title" character varying(150) not null,
    "image_url" text,
    "image_attributes" json,
    "description" text,
    "notes" text,
    "nutrition" json,
    "suitable_for_diet" text,
    "version" text not null default '1.0'::text,
    "source" text,
    "total_time" integer,
    "prep_time" integer,
    "cook_time" integer,
    "yield" smallint,
    "steps" json,
    "ingredients" json,
    "rating" smallint default 0,
    "sweet_savoury" sweet_savoury not null default 'not_set'::sweet_savoury,
    "difficulty_level" difficulty_level not null default 'not_set'::difficulty_level,
    "public" boolean not null default false,
    "keywords" text[],
    "ingredients_list" text[],
    "created_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "created_by" uuid not null,
    "meal_time" json,
    "category" text[],
    "cuisine" text[],
    "recipe_creation_type" recipe_creation_type not null default 'title'::recipe_creation_type
);


alter table "public"."recipes" enable row level security;

CREATE UNIQUE INDEX blog_pkey ON public.blog USING btree (blog_id);

CREATE UNIQUE INDEX blog_slug_key ON public.blog USING btree (slug);

CREATE UNIQUE INDEX blog_title_key ON public.blog USING btree (title);

CREATE UNIQUE INDEX bookmark_link_pkey ON public.bookmark_link USING btree (link_id);

CREATE UNIQUE INDEX bookmarks_pkey ON public.bookmarks USING btree (bookmark_id);

CREATE UNIQUE INDEX collections_pkey ON public.collections USING btree (collection_id);

CREATE UNIQUE INDEX documents_pkey ON public.documents USING btree (document_id);

CREATE UNIQUE INDEX feedback_pkey ON public.feedback USING btree (feedback_id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (profile_id);

CREATE UNIQUE INDEX ratings_pkey ON public.ratings USING btree (rating_id);

CREATE UNIQUE INDEX recipe_versions_pkey ON public.recipe_versions USING btree (recipe_version_id);

CREATE INDEX recipes_created_by_idx ON public.recipes USING btree (created_by);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (recipe_id);

alter table "public"."blog" add constraint "blog_pkey" PRIMARY KEY using index "blog_pkey";

alter table "public"."bookmark_link" add constraint "bookmark_link_pkey" PRIMARY KEY using index "bookmark_link_pkey";

alter table "public"."bookmarks" add constraint "bookmarks_pkey" PRIMARY KEY using index "bookmarks_pkey";

alter table "public"."collections" add constraint "collections_pkey" PRIMARY KEY using index "collections_pkey";

alter table "public"."documents" add constraint "documents_pkey" PRIMARY KEY using index "documents_pkey";

alter table "public"."feedback" add constraint "feedback_pkey" PRIMARY KEY using index "feedback_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."ratings" add constraint "ratings_pkey" PRIMARY KEY using index "ratings_pkey";

alter table "public"."recipe_versions" add constraint "recipe_versions_pkey" PRIMARY KEY using index "recipe_versions_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."blog" add constraint "blog_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) not valid;

alter table "public"."blog" validate constraint "blog_author_id_fkey";

alter table "public"."blog" add constraint "blog_slug_key" UNIQUE using index "blog_slug_key";

alter table "public"."blog" add constraint "blog_title_key" UNIQUE using index "blog_title_key";

alter table "public"."bookmark_link" add constraint "bookmark_link_bookmark_id_fkey" FOREIGN KEY (bookmark_id) REFERENCES bookmarks(bookmark_id) not valid;

alter table "public"."bookmark_link" validate constraint "bookmark_link_bookmark_id_fkey";

alter table "public"."bookmark_link" add constraint "bookmark_link_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections(collection_id) not valid;

alter table "public"."bookmark_link" validate constraint "bookmark_link_collection_id_fkey";

alter table "public"."bookmark_link" add constraint "bookmark_link_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) not valid;

alter table "public"."bookmark_link" validate constraint "bookmark_link_recipe_id_fkey";

alter table "public"."bookmark_link" add constraint "bookmark_link_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."bookmark_link" validate constraint "bookmark_link_user_id_fkey";

alter table "public"."bookmarks" add constraint "bookmarks_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_recipe_id_fkey";

alter table "public"."bookmarks" add constraint "bookmarks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."bookmarks" validate constraint "bookmarks_user_id_fkey";

alter table "public"."bookmarks" add constraint "ratings_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."bookmarks" validate constraint "ratings_rating_check";

alter table "public"."collections" add constraint "collections_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."collections" validate constraint "collections_user_id_fkey";

alter table "public"."feedback" add constraint "feedback_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."feedback" validate constraint "feedback_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_profile_id_fkey";

alter table "public"."ratings" add constraint "ratings_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."ratings" validate constraint "ratings_rating_check";

alter table "public"."ratings" add constraint "ratings_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) not valid;

alter table "public"."ratings" validate constraint "ratings_recipe_id_fkey";

alter table "public"."ratings" add constraint "ratings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."ratings" validate constraint "ratings_user_id_fkey";

alter table "public"."recipe_versions" add constraint "recipe_versions_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) not valid;

alter table "public"."recipe_versions" validate constraint "recipe_versions_recipe_id_fkey";

alter table "public"."recipe_versions" add constraint "recipe_versions_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."recipe_versions" validate constraint "recipe_versions_updated_by_fkey";

alter table "public"."recipe_versions" add constraint "recipe_versions_version_check" CHECK ((version ~ '^[0-9]+\\.[0-9]+$'::text)) not valid;

alter table "public"."recipe_versions" validate constraint "recipe_versions_version_check";

alter table "public"."recipes" add constraint "recipes_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON UPDATE CASCADE not valid;

alter table "public"."recipes" validate constraint "recipes_created_by_fkey";

alter table "public"."recipes" add constraint "recipes_source_check" CHECK ((source ~ 'https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?'::text)) not valid;

alter table "public"."recipes" validate constraint "recipes_source_check";

alter table "public"."recipes" add constraint "recipes_version_check" CHECK ((version ~ '^([0-9]{1,2})\.[0-9]$'::text)) not valid;

alter table "public"."recipes" validate constraint "recipes_version_check";

set check_function_bodies = off;

create or replace view "public"."blog_view" as  SELECT b.blog_id,
    b.title,
    b.image_url,
    b.image_attributes,
    b.content,
    b.tags,
    b.blog_type,
    b.author_id,
    a.raw_user_meta_data AS author_meta,
    b.published,
    b.created_at,
    b.updated_at
   FROM (blog b
     LEFT JOIN auth.users a ON ((b.author_id = a.id)));


CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
$function$
;

grant delete on table "public"."blog" to "anon";

grant insert on table "public"."blog" to "anon";

grant references on table "public"."blog" to "anon";

grant select on table "public"."blog" to "anon";

grant trigger on table "public"."blog" to "anon";

grant truncate on table "public"."blog" to "anon";

grant update on table "public"."blog" to "anon";

grant delete on table "public"."blog" to "authenticated";

grant insert on table "public"."blog" to "authenticated";

grant references on table "public"."blog" to "authenticated";

grant select on table "public"."blog" to "authenticated";

grant trigger on table "public"."blog" to "authenticated";

grant truncate on table "public"."blog" to "authenticated";

grant update on table "public"."blog" to "authenticated";

grant delete on table "public"."blog" to "service_role";

grant insert on table "public"."blog" to "service_role";

grant references on table "public"."blog" to "service_role";

grant select on table "public"."blog" to "service_role";

grant trigger on table "public"."blog" to "service_role";

grant truncate on table "public"."blog" to "service_role";

grant update on table "public"."blog" to "service_role";

grant delete on table "public"."bookmark_link" to "anon";

grant insert on table "public"."bookmark_link" to "anon";

grant references on table "public"."bookmark_link" to "anon";

grant select on table "public"."bookmark_link" to "anon";

grant trigger on table "public"."bookmark_link" to "anon";

grant truncate on table "public"."bookmark_link" to "anon";

grant update on table "public"."bookmark_link" to "anon";

grant delete on table "public"."bookmark_link" to "authenticated";

grant insert on table "public"."bookmark_link" to "authenticated";

grant references on table "public"."bookmark_link" to "authenticated";

grant select on table "public"."bookmark_link" to "authenticated";

grant trigger on table "public"."bookmark_link" to "authenticated";

grant truncate on table "public"."bookmark_link" to "authenticated";

grant update on table "public"."bookmark_link" to "authenticated";

grant delete on table "public"."bookmark_link" to "service_role";

grant insert on table "public"."bookmark_link" to "service_role";

grant references on table "public"."bookmark_link" to "service_role";

grant select on table "public"."bookmark_link" to "service_role";

grant trigger on table "public"."bookmark_link" to "service_role";

grant truncate on table "public"."bookmark_link" to "service_role";

grant update on table "public"."bookmark_link" to "service_role";

grant delete on table "public"."bookmarks" to "anon";

grant insert on table "public"."bookmarks" to "anon";

grant references on table "public"."bookmarks" to "anon";

grant select on table "public"."bookmarks" to "anon";

grant trigger on table "public"."bookmarks" to "anon";

grant truncate on table "public"."bookmarks" to "anon";

grant update on table "public"."bookmarks" to "anon";

grant delete on table "public"."bookmarks" to "authenticated";

grant insert on table "public"."bookmarks" to "authenticated";

grant references on table "public"."bookmarks" to "authenticated";

grant select on table "public"."bookmarks" to "authenticated";

grant trigger on table "public"."bookmarks" to "authenticated";

grant truncate on table "public"."bookmarks" to "authenticated";

grant update on table "public"."bookmarks" to "authenticated";

grant delete on table "public"."bookmarks" to "service_role";

grant insert on table "public"."bookmarks" to "service_role";

grant references on table "public"."bookmarks" to "service_role";

grant select on table "public"."bookmarks" to "service_role";

grant trigger on table "public"."bookmarks" to "service_role";

grant truncate on table "public"."bookmarks" to "service_role";

grant update on table "public"."bookmarks" to "service_role";

grant delete on table "public"."collections" to "anon";

grant insert on table "public"."collections" to "anon";

grant references on table "public"."collections" to "anon";

grant select on table "public"."collections" to "anon";

grant trigger on table "public"."collections" to "anon";

grant truncate on table "public"."collections" to "anon";

grant update on table "public"."collections" to "anon";

grant delete on table "public"."collections" to "authenticated";

grant insert on table "public"."collections" to "authenticated";

grant references on table "public"."collections" to "authenticated";

grant select on table "public"."collections" to "authenticated";

grant trigger on table "public"."collections" to "authenticated";

grant truncate on table "public"."collections" to "authenticated";

grant update on table "public"."collections" to "authenticated";

grant delete on table "public"."collections" to "service_role";

grant insert on table "public"."collections" to "service_role";

grant references on table "public"."collections" to "service_role";

grant select on table "public"."collections" to "service_role";

grant trigger on table "public"."collections" to "service_role";

grant truncate on table "public"."collections" to "service_role";

grant update on table "public"."collections" to "service_role";

grant delete on table "public"."documents" to "anon";

grant insert on table "public"."documents" to "anon";

grant references on table "public"."documents" to "anon";

grant select on table "public"."documents" to "anon";

grant trigger on table "public"."documents" to "anon";

grant truncate on table "public"."documents" to "anon";

grant update on table "public"."documents" to "anon";

grant delete on table "public"."documents" to "authenticated";

grant insert on table "public"."documents" to "authenticated";

grant references on table "public"."documents" to "authenticated";

grant select on table "public"."documents" to "authenticated";

grant trigger on table "public"."documents" to "authenticated";

grant truncate on table "public"."documents" to "authenticated";

grant update on table "public"."documents" to "authenticated";

grant delete on table "public"."documents" to "service_role";

grant insert on table "public"."documents" to "service_role";

grant references on table "public"."documents" to "service_role";

grant select on table "public"."documents" to "service_role";

grant trigger on table "public"."documents" to "service_role";

grant truncate on table "public"."documents" to "service_role";

grant update on table "public"."documents" to "service_role";

grant delete on table "public"."feedback" to "anon";

grant insert on table "public"."feedback" to "anon";

grant references on table "public"."feedback" to "anon";

grant select on table "public"."feedback" to "anon";

grant trigger on table "public"."feedback" to "anon";

grant truncate on table "public"."feedback" to "anon";

grant update on table "public"."feedback" to "anon";

grant delete on table "public"."feedback" to "authenticated";

grant insert on table "public"."feedback" to "authenticated";

grant references on table "public"."feedback" to "authenticated";

grant select on table "public"."feedback" to "authenticated";

grant trigger on table "public"."feedback" to "authenticated";

grant truncate on table "public"."feedback" to "authenticated";

grant update on table "public"."feedback" to "authenticated";

grant delete on table "public"."feedback" to "service_role";

grant insert on table "public"."feedback" to "service_role";

grant references on table "public"."feedback" to "service_role";

grant select on table "public"."feedback" to "service_role";

grant trigger on table "public"."feedback" to "service_role";

grant truncate on table "public"."feedback" to "service_role";

grant update on table "public"."feedback" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."ratings" to "anon";

grant insert on table "public"."ratings" to "anon";

grant references on table "public"."ratings" to "anon";

grant select on table "public"."ratings" to "anon";

grant trigger on table "public"."ratings" to "anon";

grant truncate on table "public"."ratings" to "anon";

grant update on table "public"."ratings" to "anon";

grant delete on table "public"."ratings" to "authenticated";

grant insert on table "public"."ratings" to "authenticated";

grant references on table "public"."ratings" to "authenticated";

grant select on table "public"."ratings" to "authenticated";

grant trigger on table "public"."ratings" to "authenticated";

grant truncate on table "public"."ratings" to "authenticated";

grant update on table "public"."ratings" to "authenticated";

grant delete on table "public"."ratings" to "service_role";

grant insert on table "public"."ratings" to "service_role";

grant references on table "public"."ratings" to "service_role";

grant select on table "public"."ratings" to "service_role";

grant trigger on table "public"."ratings" to "service_role";

grant truncate on table "public"."ratings" to "service_role";

grant update on table "public"."ratings" to "service_role";

grant delete on table "public"."recipe_versions" to "anon";

grant insert on table "public"."recipe_versions" to "anon";

grant references on table "public"."recipe_versions" to "anon";

grant select on table "public"."recipe_versions" to "anon";

grant trigger on table "public"."recipe_versions" to "anon";

grant truncate on table "public"."recipe_versions" to "anon";

grant update on table "public"."recipe_versions" to "anon";

grant delete on table "public"."recipe_versions" to "authenticated";

grant insert on table "public"."recipe_versions" to "authenticated";

grant references on table "public"."recipe_versions" to "authenticated";

grant select on table "public"."recipe_versions" to "authenticated";

grant trigger on table "public"."recipe_versions" to "authenticated";

grant truncate on table "public"."recipe_versions" to "authenticated";

grant update on table "public"."recipe_versions" to "authenticated";

grant delete on table "public"."recipe_versions" to "service_role";

grant insert on table "public"."recipe_versions" to "service_role";

grant references on table "public"."recipe_versions" to "service_role";

grant select on table "public"."recipe_versions" to "service_role";

grant trigger on table "public"."recipe_versions" to "service_role";

grant truncate on table "public"."recipe_versions" to "service_role";

grant update on table "public"."recipe_versions" to "service_role";

grant delete on table "public"."recipes" to "anon";

grant insert on table "public"."recipes" to "anon";

grant references on table "public"."recipes" to "anon";

grant select on table "public"."recipes" to "anon";

grant trigger on table "public"."recipes" to "anon";

grant truncate on table "public"."recipes" to "anon";

grant update on table "public"."recipes" to "anon";

grant delete on table "public"."recipes" to "authenticated";

grant insert on table "public"."recipes" to "authenticated";

grant references on table "public"."recipes" to "authenticated";

grant select on table "public"."recipes" to "authenticated";

grant trigger on table "public"."recipes" to "authenticated";

grant truncate on table "public"."recipes" to "authenticated";

grant update on table "public"."recipes" to "authenticated";

grant delete on table "public"."recipes" to "service_role";

grant insert on table "public"."recipes" to "service_role";

grant references on table "public"."recipes" to "service_role";

grant select on table "public"."recipes" to "service_role";

grant trigger on table "public"."recipes" to "service_role";

grant truncate on table "public"."recipes" to "service_role";

grant update on table "public"."recipes" to "service_role";

create policy "Allow selecting non-public recipes created by the user."
on "public"."recipes"
as permissive
for all
to public
using (((( SELECT auth.uid() AS uid) = created_by) OR (public = true)));


create policy "Enable update for authenticated users"
on "public"."recipes"
as permissive
for update
to authenticated;


create policy "Restrict creation to user's own records."
on "public"."recipes"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = created_by));



