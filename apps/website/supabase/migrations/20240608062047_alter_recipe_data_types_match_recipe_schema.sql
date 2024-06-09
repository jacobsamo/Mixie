alter table recipes
drop column category,
drop column cuisine;

alter table recipes
add column category text[],
add column cuisine text[];
