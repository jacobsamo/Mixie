alter table "public"."recipes" drop constraint "recipes_source_check";

alter table "public"."recipes" add constraint "recipes_source_check" CHECK ((source ~ 'https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?'::text)) not valid;

alter table "public"."recipes" validate constraint "recipes_source_check";


