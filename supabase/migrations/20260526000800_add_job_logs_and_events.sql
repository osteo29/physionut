create table if not exists public.operation_logs (
  id uuid primary key default gen_random_uuid(),
  operation_name text not null,
  status text not null check (status in ('started', 'completed', 'failed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  failed_at timestamptz,
  retry_count integer not null default 0,
  error_message text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.system_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_status text not null default 'pending' check (event_status in ('pending', 'processed', 'failed')),
  aggregate_type text,
  aggregate_key text,
  payload jsonb,
  emitted_at timestamptz not null default now(),
  processed_at timestamptz,
  error_message text
);

create index if not exists idx_operation_logs_operation_name_started_at
  on public.operation_logs (operation_name, started_at desc);

create index if not exists idx_operation_logs_status_started_at
  on public.operation_logs (status, started_at desc);

create index if not exists idx_system_events_event_name_emitted_at
  on public.system_events (event_name, emitted_at desc);

create index if not exists idx_system_events_event_status_emitted_at
  on public.system_events (event_status, emitted_at desc);

alter table public.operation_logs enable row level security;
alter table public.system_events enable row level security;

drop policy if exists "operation_logs_admin_read" on public.operation_logs;
drop policy if exists "operation_logs_admin_write" on public.operation_logs;
drop policy if exists "system_events_admin_read" on public.system_events;
drop policy if exists "system_events_admin_write" on public.system_events;

create policy "operation_logs_admin_read" on public.operation_logs
for select to authenticated
using (public.is_admin_user());

create policy "operation_logs_admin_write" on public.operation_logs
for all to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "system_events_admin_read" on public.system_events
for select to authenticated
using (public.is_admin_user());

create policy "system_events_admin_write" on public.system_events
for all to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());
