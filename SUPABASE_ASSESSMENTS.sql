create extension if not exists "pgcrypto";

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  calculator_type text not null,
  value_label text not null,
  value_numeric double precision,
  value_unit text,
  lang text not null check (lang in ('en', 'ar')),
  note text
);

create index if not exists idx_assessments_email_created_at
  on public.assessments (email, created_at desc);

alter table public.assessments enable row level security;

drop policy if exists "Allow anonymous assessment inserts" on public.assessments;
drop policy if exists "Allow anonymous assessment reads by email" on public.assessments;
drop policy if exists "Allow anonymous assessment updates" on public.assessments;
drop policy if exists "Allow anonymous assessment deletes" on public.assessments;

create policy "Allow anonymous assessment inserts"
on public.assessments
for insert
to anon
with check (true);

create policy "Allow anonymous assessment reads by email"
on public.assessments
for select
to anon
using (true);

create policy "Allow anonymous assessment updates"
on public.assessments
for update
to anon
using (true)
with check (true);

create policy "Allow anonymous assessment deletes"
on public.assessments
for delete
to anon
using (true);
