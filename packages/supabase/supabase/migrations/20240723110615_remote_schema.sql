drop view if exists "public"."bookmarks_view";

alter table "public"."recipes" alter column "suitable_for_diet" set data type text using "suitable_for_diet"::text;

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



