create extension if not exists "pgcrypto";

create table if not exists public.assessment_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  calculator_type text not null,
  lang text not null check (lang in ('en', 'ar')),
  result_summary text not null
);

alter table public.assessment_leads enable row level security;

create policy "Allow anonymous lead inserts"
on public.assessment_leads
for insert
to anon
with check (true);
