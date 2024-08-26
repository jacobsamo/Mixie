create view bookmarks_with_recipes as
select
  b.bookmark_id,
  b.notes,
  b.tags,
  b.rating,
  b.user_id,
  r.recipe_id,
  r.id,
  r.title,
  r.image_url,
  r.image_attributes,
  r.total_time,
  r.keywords
from bookmarks as b
  left join recipes as r on b.recipe_id = r.recipe_id