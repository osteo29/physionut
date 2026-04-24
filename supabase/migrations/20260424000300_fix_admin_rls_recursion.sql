-- Fix recursive admin_users RLS checks by moving permission checks into
-- SECURITY DEFINER helpers and re-pointing import-related policies to them.

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

drop policy if exists "admin_users_read" on public.admin_users;
drop policy if exists "admin_users_self_read" on public.admin_users;
drop policy if exists "admin_users_insert" on public.admin_users;
drop policy if exists "admin_users_bootstrap_insert" on public.admin_users;
drop policy if exists "admin_users_update" on public.admin_users;
drop policy if exists "admin_users_delete" on public.admin_users;

create policy "admin_users_read" on public.admin_users
for select to authenticated
using (public.is_admin_user());

create policy "admin_users_self_read" on public.admin_users
for select to authenticated
using (user_id = auth.uid());

create policy "admin_users_insert" on public.admin_users
for insert to authenticated
with check (public.is_admin_user());

create policy "admin_users_bootstrap_insert" on public.admin_users
for insert to authenticated
with check (
  lower(email) = lower(auth.jwt() ->> 'email')
  and lower(email) = lower('ahmed.reda.a.r.1234@gmail.com')
  and user_id = auth.uid()
  and role = 'admin'
);

create policy "admin_users_update" on public.admin_users
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin_users_delete" on public.admin_users
for delete to authenticated
using (public.is_admin_editor(true));

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

drop policy if exists "phase_goals_insert" on public.phase_goals;
drop policy if exists "phase_goals_update" on public.phase_goals;
drop policy if exists "phase_goals_delete" on public.phase_goals;

create policy "phase_goals_insert" on public.phase_goals
for insert to authenticated
with check (public.can_edit_phases());

create policy "phase_goals_update" on public.phase_goals
for update to authenticated
using (public.can_edit_phases())
with check (public.can_edit_phases());

create policy "phase_goals_delete" on public.phase_goals
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "phase_precautions_insert" on public.phase_precautions;
drop policy if exists "phase_precautions_update" on public.phase_precautions;
drop policy if exists "phase_precautions_delete" on public.phase_precautions;

create policy "phase_precautions_insert" on public.phase_precautions
for insert to authenticated
with check (public.can_edit_phases());

create policy "phase_precautions_update" on public.phase_precautions
for update to authenticated
using (public.can_edit_phases())
with check (public.can_edit_phases());

create policy "phase_precautions_delete" on public.phase_precautions
for delete to authenticated
using (public.is_admin_editor(true));

drop policy if exists "phase_exercises_insert" on public.phase_exercises;
drop policy if exists "phase_exercises_update" on public.phase_exercises;
drop policy if exists "phase_exercises_delete" on public.phase_exercises;

create policy "phase_exercises_insert" on public.phase_exercises
for insert to authenticated
with check (public.can_edit_phases());

create policy "phase_exercises_update" on public.phase_exercises
for update to authenticated
using (public.can_edit_phases())
with check (public.can_edit_phases());

create policy "phase_exercises_delete" on public.phase_exercises
for delete to authenticated
using (public.is_admin_editor(true));
