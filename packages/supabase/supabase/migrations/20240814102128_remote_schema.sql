CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Give users authenticated access to folder 1rpf4wn_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'recipe-images'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1rpf4wn_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'recipe-images'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Insert to public 1rpf4wn_0"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'recipe-images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



