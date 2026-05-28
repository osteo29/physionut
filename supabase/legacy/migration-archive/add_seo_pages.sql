create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  title_en text not null,
  description_en text not null,
  title_ar text not null,
  description_ar text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.seo_pages enable row level security;

drop policy if exists "seo_pages_read" on public.seo_pages;
drop policy if exists "seo_pages_insert" on public.seo_pages;
drop policy if exists "seo_pages_update" on public.seo_pages;
drop policy if exists "seo_pages_delete" on public.seo_pages;

create policy "seo_pages_read" on public.seo_pages
for select
using (true);

create policy "seo_pages_insert" on public.seo_pages
for insert to authenticated
with check ((select count(1) from public.admin_users where user_id = auth.uid()) > 0);

create policy "seo_pages_update" on public.seo_pages
for update to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid()) > 0)
with check ((select count(1) from public.admin_users where user_id = auth.uid()) > 0);

create policy "seo_pages_delete" on public.seo_pages
for delete to authenticated
using ((select count(1) from public.admin_users where user_id = auth.uid()) > 0);

create index if not exists idx_seo_pages_page_key on public.seo_pages(page_key);
