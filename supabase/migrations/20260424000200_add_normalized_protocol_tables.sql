create table if not exists public.phase_goals (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.injury_phases(id) on delete cascade,
  order_index int not null default 0,
  text_en text not null,
  text_ar text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phase_precautions (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.injury_phases(id) on delete cascade,
  order_index int not null default 0,
  text_en text not null,
  text_ar text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.phase_exercises (
  id uuid primary key default gen_random_uuid(),
  phase_id uuid not null references public.injury_phases(id) on delete cascade,
  order_index int not null default 0,
  name_en text not null,
  name_ar text not null default '',
  prescription_en text,
  prescription_ar text,
  sets text,
  reps text,
  rest text,
  cue_en text,
  cue_ar text,
  notes_en text,
  notes_ar text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_phase_goals_phase_id on public.phase_goals(phase_id, order_index);
create index if not exists idx_phase_precautions_phase_id on public.phase_precautions(phase_id, order_index);
create index if not exists idx_phase_exercises_phase_id on public.phase_exercises(phase_id, order_index);

alter table public.phase_goals enable row level security;
alter table public.phase_precautions enable row level security;
alter table public.phase_exercises enable row level security;

grant select on table public.phase_goals to anon, authenticated;
grant select on table public.phase_precautions to anon, authenticated;
grant select on table public.phase_exercises to anon, authenticated;

grant select, insert, update, delete on table public.phase_goals to authenticated;
grant select, insert, update, delete on table public.phase_precautions to authenticated;
grant select, insert, update, delete on table public.phase_exercises to authenticated;

drop policy if exists "phase_goals_read" on public.phase_goals;
drop policy if exists "phase_goals_insert" on public.phase_goals;
drop policy if exists "phase_goals_update" on public.phase_goals;
drop policy if exists "phase_goals_delete" on public.phase_goals;

drop policy if exists "phase_precautions_read" on public.phase_precautions;
drop policy if exists "phase_precautions_insert" on public.phase_precautions;
drop policy if exists "phase_precautions_update" on public.phase_precautions;
drop policy if exists "phase_precautions_delete" on public.phase_precautions;

drop policy if exists "phase_exercises_read" on public.phase_exercises;
drop policy if exists "phase_exercises_insert" on public.phase_exercises;
drop policy if exists "phase_exercises_update" on public.phase_exercises;
drop policy if exists "phase_exercises_delete" on public.phase_exercises;

create policy "phase_goals_read" on public.phase_goals
for select
using (true);

create policy "phase_goals_insert" on public.phase_goals
for insert to authenticated
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_goals_update" on public.phase_goals
for update to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0)
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_goals_delete" on public.phase_goals
for delete to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_delete = true) > 0);

create policy "phase_precautions_read" on public.phase_precautions
for select
using (true);

create policy "phase_precautions_insert" on public.phase_precautions
for insert to authenticated
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_precautions_update" on public.phase_precautions
for update to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0)
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_precautions_delete" on public.phase_precautions
for delete to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_delete = true) > 0);

create policy "phase_exercises_read" on public.phase_exercises
for select
using (true);

create policy "phase_exercises_insert" on public.phase_exercises
for insert to authenticated
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_exercises_update" on public.phase_exercises
for update to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0)
with check ((select count(1) from public.admin_users where user_id = auth.uid() and can_edit_phases = true) > 0);

create policy "phase_exercises_delete" on public.phase_exercises
for delete to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid() and can_delete = true) > 0);
