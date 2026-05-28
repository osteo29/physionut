-- Fix permissions for injury admin import and public injury page content access.
-- Run this in Supabase SQL Editor.

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

-- After running the grants above, add your signed-in admin user to public.admin_users.
-- Replace the email below with the same email you use in the admin panel.
-- If a row already exists for that email, this will upgrade it safely.

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
where lower(email) = lower('REPLACE_WITH_YOUR_ADMIN_EMAIL')
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
