-- Apply the final non-recursive admin_users policies after removing the invalid baseline migration.

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function public.is_admin_editor(can_delete_required boolean default false)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and (
        can_delete_required = false
        or can_delete = true
      )
  );
$$;

drop policy if exists "admin_users_read" on public.admin_users;
drop policy if exists "admin_users_self_read" on public.admin_users;
drop policy if exists "admin_users_insert" on public.admin_users;
drop policy if exists "admin_users_bootstrap_insert" on public.admin_users;
drop policy if exists "admin_users_update" on public.admin_users;
drop policy if exists "admin_users_delete" on public.admin_users;

create policy "admin_users_read" on public.admin_users
for select to authenticated
using (public.is_admin_user());

create policy "admin_users_self_read" on public.admin_users
for select to authenticated
using (user_id = auth.uid());

create policy "admin_users_insert" on public.admin_users
for insert to authenticated
with check (public.is_admin_user());

create policy "admin_users_bootstrap_insert" on public.admin_users
for insert to authenticated
with check (
  lower(email) = lower(auth.jwt() ->> 'email')
  and lower(email) = lower('ahmed.reda.a.r.1234@gmail.com')
  and user_id = auth.uid()
  and role = 'admin'
);

create policy "admin_users_update" on public.admin_users
for update to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin_users_delete" on public.admin_users
for delete to authenticated
using (public.is_admin_editor(true));
