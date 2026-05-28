create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_name text not null default 'cms-media',
  storage_path text not null unique,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  file_size bigint not null check (file_size >= 0),
  width integer,
  height integer,
  alt_text text,
  folder text,
  uploaded_by uuid references auth.users (id) on delete set null,
  processing_status text not null default 'ready' check (processing_status in ('pending', 'processing', 'ready', 'failed')),
  variants jsonb,
  blur_placeholder text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.media_asset_usages (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.media_assets (id) on delete cascade,
  content_type text not null,
  content_key text not null,
  field_name text not null,
  lang text check (lang in ('en', 'ar')),
  usage_context jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists media_asset_usages_unique_reference_idx
  on public.media_asset_usages (asset_id, content_type, content_key, field_name, coalesce(lang, 'all'));

create index if not exists media_assets_folder_idx on public.media_assets (folder);
create index if not exists media_asset_usages_asset_id_idx on public.media_asset_usages (asset_id);

alter table public.media_assets enable row level security;
alter table public.media_asset_usages enable row level security;

create or replace function public.set_media_assets_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_media_assets_updated_at on public.media_assets;
create trigger set_media_assets_updated_at
before update on public.media_assets
for each row
execute function public.set_media_assets_updated_at();

create policy "content roles can read media assets"
on public.media_assets
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

create policy "content roles can manage media assets"
on public.media_assets
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
)
with check (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

create policy "content roles can read media usages"
on public.media_asset_usages
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

create policy "content roles can manage media usages"
on public.media_asset_usages
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
)
with check (
  exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "public can view cms media"
on storage.objects
for select
using (bucket_id = 'cms-media');

create policy "content roles can upload cms media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

create policy "content roles can update cms media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
)
with check (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);

create policy "content roles can delete cms media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'cms-media'
  and exists (
    select 1
    from public.admin_users admin_user
    where admin_user.user_id = auth.uid()
      and admin_user.role in ('admin', 'editor', 'writer')
  )
);
