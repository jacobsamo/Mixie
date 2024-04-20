-- create enums
create type feedback_type as enum ('feature', 'bug', 'other');

-- create type sweet_savoury as enum ('sweet', 'savoury', 'both', 'not_set');

-- create type difficulty_level as enum ('easy', 'medium', 'hard', 'not_set');

-- create tables
create table recipes (
    recipe_id uuid primary key default gen_random_uuid(),
    id text not null, 
    title varchar(150) not null,
	image_url text,
	image_attributes json, 
	description text,
	notes text,
    nutrition json,
    cuisine uuid,
    category uuid,
    suitable_for_diet uuid,
	version text CHECK (version ~ '^[0-9]+\\.[0-9]+$'::text) not null default '1.0',
	source text CHECK (version ~ 'https?:\/\/([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$'::text),
	total_time varchar(191),
	prep_time varchar(191),
	cook_time varchar(191),
	yield smallint,
    steps json,
	ingredients json,
	rating smallint default 0,
	sweet_savoury sweet_savoury not null default 'not_set',
	difficulty_level difficulty_level not null default 'not_set',
	public boolean default false NOT NULL,
	keywords text[],
	ingredients_list text[],
	created_at timestamp with time zone default timezone('utc'::text, now()) not null,
	create_by varchar(191) NOT NULL
);

create table recipe_versions (
    recipe_version_id uuid primary key default gen_random_uuid(),
    recipe_id uuid references recipes(recipe_id),
    version text CHECK (version ~ '^[0-9]+\\.[0-9]+$'::text) not null,
    changes json not null,
    updated_by uuid references auth.users(id),
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);


create table ratings (
    rating_id uuid primary key default gen_random_uuid(),
    recipe_id uuid references recipes(recipe_id),
    user_id uuid references auth.users(id),
    rating smallint CHECK (rating BETWEEN 1 AND 5) not null
);


create table feedback (
    feedback_id uuid primary key default gen_random_uuid(),
    type feedback_type not null default 'other',
    title varchar(250) not null,
    description text not null,
    page text,
    user_email text not null,
    user_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- bookmarks, collections, groups
create table collections (
    collection_id uuid primary key default gen_random_uuid(),
    title varchar(150) not null,
    description varchar(500),
    user_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


create table bookmark_link (
    bookmark_id uuid primary key default gen_random_uuid(),
    recipe_id uuid references recipes(recipe_id),
    user_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table bookmarks (
    bookmark_id uuid primary key default gen_random_uuid(),
    recipe_id uuid references recipes(recipe_id),
    user_id uuid references auth.users(id),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);