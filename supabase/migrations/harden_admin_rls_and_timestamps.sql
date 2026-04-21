-- Centralize admin permission checks and keep updated_at fresh on writes.
-- Safe to run multiple times.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function public.is_admin_editor(can_delete_required boolean default false)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and (
        can_delete_required = false
        or can_delete = true
      )
  );
$$;

create or replace function public.can_edit_injuries()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and can_edit_injuries = true
  );
$$;

create or replace function public.can_edit_phases()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and can_edit_phases = true
  );
$$;

create or replace function public.can_edit_supplements()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and can_edit_supplements = true
  );
$$;

drop policy if exists "injuries_admin_insert" on public.injuries;
drop policy if exists "injuries_admin_update" on public.injuries;
drop policy if exists "injuries_admin_delete" on public.injuries;

create policy "injuries_admin_insert" on public.injuries
for insert to authenticated
with check (public.can_edit_injuries());

create policy "injuries_admin_update" on public.injuries
for update to authenticated
using (public.can_edit_injuries())
with check (public.can_edit_injuries());

create policy "injuries_admin_delete" on public.injuries
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "injury_phases_admin_insert" on public.injury_phases;
drop policy if exists "injury_phases_admin_update" on public.injury_phases;
drop policy if exists "injury_phases_admin_delete" on public.injury_phases;

create policy "injury_phases_admin_insert" on public.injury_phases
for insert to authenticated
with check (public.can_edit_phases());

create policy "injury_phases_admin_update" on public.injury_phases
for update to authenticated
using (public.can_edit_phases())
with check (public.can_edit_phases());

create policy "injury_phases_admin_delete" on public.injury_phases
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "supplements_admin_insert" on public.supplements;
drop policy if exists "supplements_admin_update" on public.supplements;
drop policy if exists "supplements_admin_delete" on public.supplements;

create policy "supplements_admin_insert" on public.supplements
for insert to authenticated
with check (public.can_edit_supplements());

create policy "supplements_admin_update" on public.supplements
for update to authenticated
using (public.can_edit_supplements())
with check (public.can_edit_supplements());

create policy "supplements_admin_delete" on public.supplements
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "meal_examples_admin_insert" on public.meal_examples;
drop policy if exists "meal_examples_admin_update" on public.meal_examples;
drop policy if exists "meal_examples_admin_delete" on public.meal_examples;

create policy "meal_examples_admin_insert" on public.meal_examples
for insert to authenticated
with check (public.is_admin_user());

create policy "meal_examples_admin_update" on public.meal_examples
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "meal_examples_admin_delete" on public.meal_examples
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "safety_notes_admin_insert" on public.safety_notes;
drop policy if exists "safety_notes_admin_update" on public.safety_notes;
drop policy if exists "safety_notes_admin_delete" on public.safety_notes;

create policy "safety_notes_admin_insert" on public.safety_notes
for insert to authenticated
with check (public.is_admin_user());

create policy "safety_notes_admin_update" on public.safety_notes
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "safety_notes_admin_delete" on public.safety_notes
for delete to authenticated
using (public.is_admin_editor(true));

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

drop trigger if exists set_updated_at_injuries on public.injuries;
create trigger set_updated_at_injuries
before update on public.injuries
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_injury_phases on public.injury_phases;
create trigger set_updated_at_injury_phases
before update on public.injury_phases
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_supplements on public.supplements;
create trigger set_updated_at_supplements
before update on public.supplements
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_meal_examples on public.meal_examples;
create trigger set_updated_at_meal_examples
before update on public.meal_examples
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_safety_notes on public.safety_notes;
create trigger set_updated_at_safety_notes
before update on public.safety_notes
for each row
execute function public.set_updated_at();

drop trigger if exists set_updated_at_admin_users on public.admin_users;
create trigger set_updated_at_admin_users
before update on public.admin_users
for each row
execute function public.set_updated_at();

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
