create type recipe_creation_type as enum ('title', 'image', 'link', 'upload');

alter table recipes
add column recipe_creation_type recipe_creation_type not null default 'title';