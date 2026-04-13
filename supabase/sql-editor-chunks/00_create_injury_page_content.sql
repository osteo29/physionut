create table if not exists public.injury_page_content (
  id uuid primary key default gen_random_uuid(),
  injury_id uuid not null references public.injuries(id) on delete cascade,
  intro_en text,
  intro_ar text,
  symptoms_en text[] default '{}',
  symptoms_ar text[] default '{}',
  rehab_notes_en text[] default '{}',
  rehab_notes_ar text[] default '{}',
  nutrition_notes_en text[] default '{}',
  nutrition_notes_ar text[] default '{}',
  faq_items jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(injury_id)
);

alter table public.injury_page_content enable row level security;

drop policy if exists "injury_page_content_read" on public.injury_page_content;
create policy "injury_page_content_read" on public.injury_page_content for select using (true);

drop policy if exists "injury_page_content_admin_insert" on public.injury_page_content;
drop policy if exists "injury_page_content_admin_update" on public.injury_page_content;
drop policy if exists "injury_page_content_admin_delete" on public.injury_page_content;

create policy "injury_page_content_admin_insert" on public.injury_page_content
for insert to authenticated
with check (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
);

create policy "injury_page_content_admin_update" on public.injury_page_content
for update to authenticated
using (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
)
with check (
  (select count(1) from public.admin_users where user_id = auth.uid()) > 0
);

create policy "injury_page_content_admin_delete" on public.injury_page_content
for delete to authenticated
using (
  (select count(1) from public.admin_users where user_id = auth.uid() and can_delete = true) > 0
);

create index if not exists idx_injury_page_content_injury_id on public.injury_page_content(injury_id);
