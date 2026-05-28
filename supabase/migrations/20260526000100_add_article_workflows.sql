create table if not exists public.article_workflows (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('en', 'ar')),
  slug text not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'General',
  date date not null,
  icon text not null default 'BookOpen',
  image text,
  tags text[] not null default '{}',
  image_alt text,
  seo_title text,
  seo_description text,
  og_image text,
  canonical_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lang, slug)
);

create table if not exists public.article_revisions (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.article_workflows(id) on delete cascade,
  lang text not null check (lang in ('en', 'ar')),
  slug text not null,
  revision_number integer not null,
  status text not null check (status in ('draft', 'published', 'scheduled')),
  change_note text,
  payload jsonb not null,
  saved_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (workflow_id, revision_number)
);

create index if not exists idx_article_workflows_lang_status
  on public.article_workflows (lang, status, updated_at desc);

create index if not exists idx_article_revisions_workflow_created_at
  on public.article_revisions (workflow_id, created_at desc);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.article_workflows to authenticated;
grant select, insert on public.article_revisions to authenticated;

alter table public.article_workflows enable row level security;
alter table public.article_revisions enable row level security;

drop policy if exists "article_workflows_read" on public.article_workflows;
create policy "article_workflows_read"
on public.article_workflows
for select
to authenticated
using (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor', 'writer')
  ) > 0
);

drop policy if exists "article_workflows_write" on public.article_workflows;
create policy "article_workflows_write"
on public.article_workflows
for all
to authenticated
using (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor', 'writer')
  ) > 0
)
with check (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor', 'writer')
  ) > 0
);

drop policy if exists "article_revisions_read" on public.article_revisions;
create policy "article_revisions_read"
on public.article_revisions
for select
to authenticated
using (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor', 'writer')
  ) > 0
);

drop policy if exists "article_revisions_insert" on public.article_revisions;
create policy "article_revisions_insert"
on public.article_revisions
for insert
to authenticated
with check (
  (
    select count(1)
    from public.admin_users
    where user_id = auth.uid()
      and lower(role) in ('admin', 'editor', 'writer')
  ) > 0
);
