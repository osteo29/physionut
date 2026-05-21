create table if not exists public.homepage_settings (
  id uuid primary key default gen_random_uuid(),
  lang text not null unique check (lang in ('en', 'ar')),
  hero_badge text,
  hero_title text not null,
  hero_description text,
  hero_cta_label text,
  hero_cta_href text,
  featured_post_slugs text[] not null default '{}',
  section_order text[] not null default '{"injuries","articles","exercises","calculators"}',
  banner_title text,
  banner_body text,
  banner_cta_label text,
  banner_cta_href text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant usage on schema public to anon, authenticated;
grant select on table public.homepage_settings to anon, authenticated;
grant select, insert, update, delete on table public.homepage_settings to authenticated;

alter table public.homepage_settings enable row level security;

drop policy if exists "homepage_settings_read" on public.homepage_settings;
create policy "homepage_settings_read"
on public.homepage_settings
for select
using (true);

drop policy if exists "homepage_settings_write" on public.homepage_settings;
create policy "homepage_settings_write"
on public.homepage_settings
for all
to authenticated
using (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor')
  ) > 0
)
with check (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor')
  ) > 0
);
