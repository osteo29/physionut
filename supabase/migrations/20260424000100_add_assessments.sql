create extension if not exists "pgcrypto";

alter table if exists public.assessments
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

alter table if exists public.assessments
  alter column name drop not null;

alter table if exists public.assessments
  alter column email drop not null;

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  email text,
  calculator_type text not null,
  value_label text not null,
  value_numeric double precision,
  value_unit text,
  lang text not null check (lang in ('en', 'ar')),
  note text
);

create index if not exists idx_assessments_user_created_at
  on public.assessments (user_id, created_at desc);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.assessments to authenticated;

alter table public.assessments enable row level security;

drop policy if exists "Allow anonymous assessment inserts" on public.assessments;
drop policy if exists "Allow anonymous assessment reads by email" on public.assessments;
drop policy if exists "Allow anonymous assessment updates" on public.assessments;
drop policy if exists "Allow anonymous assessment deletes" on public.assessments;
drop policy if exists "Allow assessment inserts" on public.assessments;
drop policy if exists "Allow assessment reads" on public.assessments;
drop policy if exists "Allow assessment updates" on public.assessments;
drop policy if exists "Allow assessment deletes" on public.assessments;
drop policy if exists "Enable insert for all users" on public.assessments;
drop policy if exists "Enable read for authenticated users only" on public.assessments;
drop policy if exists "Users can insert own assessments" on public.assessments;
drop policy if exists "Users can read own assessments" on public.assessments;
drop policy if exists "Users can update own assessments" on public.assessments;
drop policy if exists "Users can delete own assessments" on public.assessments;

create policy "Users can insert own assessments"
on public.assessments
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read own assessments"
on public.assessments
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update own assessments"
on public.assessments
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own assessments"
on public.assessments
for delete
to authenticated
using (auth.uid() = user_id);
