alter table "public"."collections" add column "public" boolean not null default false;

set check_function_bodies = off;

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


