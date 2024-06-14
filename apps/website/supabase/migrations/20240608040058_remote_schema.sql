create extension if not exists "hypopg" with schema "extensions";

create extension if not exists "index_advisor" with schema "extensions";

create extension if not exists "vector" with schema "extensions";


drop view if exists "public"."bookmarks_view";

alter table "public"."recipes" alter column "created_by" set data type uuid using "created_by"::uuid;

alter table "public"."recipes" enable row level security;

alter table "public"."recipes" add constraint "recipes_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON UPDATE CASCADE not valid;

alter table "public"."recipes" validate constraint "recipes_created_by_fkey";

create or replace view "public"."bookmarks_view" as  SELECT b.bookmark_id,
    b.recipe_id,
    b.user_id,
    b.created_at,
    b.notes,
    b.tags,
    b.rating,
    json_agg(r.*) AS recipes,
    json_agg(c.collection_id) AS collections
   FROM (((bookmark_link bl
     LEFT JOIN collections c ON ((bl.collection_id = c.collection_id)))
     LEFT JOIN recipes r ON ((bl.recipe_id = r.recipe_id)))
     LEFT JOIN bookmarks b ON ((bl.bookmark_id = b.bookmark_id)))
  GROUP BY b.bookmark_id, r.recipe_id, c.collection_id;


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



