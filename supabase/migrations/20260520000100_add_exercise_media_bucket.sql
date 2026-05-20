create table if not exists public.exercise_media (
  id uuid primary key default gen_random_uuid(),
  exercise_name text not null,
  region_slug text,
  thumbnail_path text,
  image_path text,
  source text not null default 'supabase' check (source in ('static', 'supabase')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (exercise_name, source)
);

alter table public.exercise_media enable row level security;

drop policy if exists "exercise_media_read" on public.exercise_media;
create policy "exercise_media_read"
on public.exercise_media
for select
using (true);

drop policy if exists "exercise_media_admin_write" on public.exercise_media;
create policy "exercise_media_admin_write"
on public.exercise_media
for all
to authenticated
using (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
)
with check (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
);

insert into storage.buckets (id, name, public)
values ('exercise-media', 'exercise-media', true)
on conflict (id) do nothing;

drop policy if exists "exercise_media_bucket_public_read" on storage.objects;
create policy "exercise_media_bucket_public_read"
on storage.objects
for select
using (bucket_id = 'exercise-media');

drop policy if exists "exercise_media_bucket_admin_write" on storage.objects;
create policy "exercise_media_bucket_admin_write"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'exercise-media'
  and (select count(1) from public.admin_users where user_id = auth.uid()) > 0
)
with check (
  bucket_id = 'exercise-media'
  and (select count(1) from public.admin_users where user_id = auth.uid()) > 0
);
