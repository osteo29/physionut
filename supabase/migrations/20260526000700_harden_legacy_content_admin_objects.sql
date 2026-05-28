create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop policy if exists "injury_page_content_admin_insert" on public.injury_page_content;
drop policy if exists "injury_page_content_admin_update" on public.injury_page_content;
drop policy if exists "injury_page_content_admin_delete" on public.injury_page_content;

create policy "injury_page_content_admin_insert" on public.injury_page_content
for insert to authenticated
with check (public.is_admin_user());

create policy "injury_page_content_admin_update" on public.injury_page_content
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "injury_page_content_admin_delete" on public.injury_page_content
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "injury_protocol_import_runs_read" on public.injury_protocol_import_runs;
drop policy if exists "injury_protocol_import_runs_insert" on public.injury_protocol_import_runs;
drop policy if exists "injury_protocol_import_runs_update" on public.injury_protocol_import_runs;

create policy "injury_protocol_import_runs_read" on public.injury_protocol_import_runs
for select to authenticated
using (public.is_admin_user());

create policy "injury_protocol_import_runs_insert" on public.injury_protocol_import_runs
for insert to authenticated
with check (public.is_admin_user());

create policy "injury_protocol_import_runs_update" on public.injury_protocol_import_runs
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

drop policy if exists "seo_pages_insert" on public.seo_pages;
drop policy if exists "seo_pages_update" on public.seo_pages;
drop policy if exists "seo_pages_delete" on public.seo_pages;

create policy "seo_pages_insert" on public.seo_pages
for insert to authenticated
with check (public.is_admin_user());

create policy "seo_pages_update" on public.seo_pages
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "seo_pages_delete" on public.seo_pages
for delete to authenticated
using (public.is_admin_editor(true));

drop trigger if exists set_updated_at_injury_page_content on public.injury_page_content;
create trigger set_updated_at_injury_page_content
before update on public.injury_page_content
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_injury_protocol_import_runs on public.injury_protocol_import_runs;
create trigger set_updated_at_injury_protocol_import_runs
before update on public.injury_protocol_import_runs
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_seo_pages on public.seo_pages;
create trigger set_updated_at_seo_pages
before update on public.seo_pages
for each row
execute function public.set_updated_at();
