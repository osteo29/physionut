-- Fix permissions for injury admin import and public injury page content access.
-- Ensure ONLY ahmed.reda.a.r.1234@gmail.com is an admin.
-- Run this in Supabase SQL Editor.

-- Grant basic table access
grant usage on schema public to anon, authenticated;

grant select on table public.injuries to anon, authenticated;
grant select on table public.injury_phases to anon, authenticated;
grant select on table public.supplements to anon, authenticated;
grant select on table public.meal_examples to anon, authenticated;
grant select on table public.safety_notes to anon, authenticated;
grant select on table public.injury_page_content to anon, authenticated;

grant select, insert, update, delete on table public.injuries to authenticated;
grant select, insert, update, delete on table public.injury_phases to authenticated;
grant select, insert, update, delete on table public.supplements to authenticated;
grant select, insert, update, delete on table public.meal_examples to authenticated;
grant select, insert, update, delete on table public.safety_notes to authenticated;
grant select, insert, update, delete on table public.injury_page_content to authenticated;
grant select, insert, update, delete on table public.admin_users to authenticated;
grant select, insert, update on table public.injury_protocol_import_runs to authenticated;

-- Ensure the designated user is the ONLY admin.
-- We insert or update the admin role for the specific email.
insert into public.admin_users (
  user_id,
  email,
  full_name,
  role,
  can_edit_injuries,
  can_edit_phases,
  can_edit_supplements,
  can_delete
)
select
  id,
  email,
  coalesce(raw_user_meta_data ->> 'full_name', split_part(email, '@', 1)),
  'admin',
  true,
  true,
  true,
  true
from auth.users
where lower(email) = lower('ahmed.reda.a.r.1234@gmail.com')
on conflict (email) do update
set
  user_id = excluded.user_id,
  full_name = excluded.full_name,
  role = 'admin',
  can_edit_injuries = true,
  can_edit_phases = true,
  can_edit_supplements = true,
  can_delete = true,
  updated_at = now();

-- Ensure NO ONE ELSE is an admin (Optional extra safety)
-- This deletes any admin that is NOT the specified email.
delete from public.admin_users where lower(email) != lower('ahmed.reda.a.r.1234@gmail.com');
