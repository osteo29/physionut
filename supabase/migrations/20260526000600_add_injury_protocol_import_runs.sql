create table if not exists public.injury_protocol_import_runs (
  id uuid primary key default gen_random_uuid(),
  source_name text,
  raw_text text not null,
  parsed_count int not null default 0,
  matched_count int not null default 0,
  unmatched_count int not null default 0,
  imported_slugs text[] not null default '{}',
  unmatched_titles text[] not null default '{}',
  status text not null default 'preview' check (status in ('preview', 'imported', 'failed')),
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.injury_protocol_import_runs enable row level security;

create index if not exists idx_injury_protocol_import_runs_created_at on public.injury_protocol_import_runs(created_at desc);
create index if not exists idx_injury_protocol_import_runs_status on public.injury_protocol_import_runs(status);
