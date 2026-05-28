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
create policy "seo_pages_read" on public.seo_pages
for select
using (true);

create index if not exists idx_seo_pages_page_key on public.seo_pages(page_key);
