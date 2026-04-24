Supabase hardening plan

What I prepared
- Added [harden_admin_rls_and_timestamps.sql](/D:/gpa calc/physio/physionut-main/supabase/migrations/harden_admin_rls_and_timestamps.sql)
- This migration centralizes admin checks into SQL helper functions.
- It refreshes the admin-facing RLS policies to reduce repeated inline subqueries.
- It adds `updated_at` triggers to the main content tables so timestamps stay correct automatically.

Why this helps
- Easier to maintain and audit the permission model.
- Safer future changes because admin logic is defined in one place.
- Better operational visibility because `updated_at` becomes trustworthy across edits/imports.

Current remote-access status
- The local project is linked to Supabase.
- Frontend connectivity is configured.
- Direct admin CLI access was not confirmed from this session because `supabase projects list` timed out.

Recommended next command once CLI auth is confirmed
- `npx supabase db push`

Tables covered by the hardening migration
- `injuries`
- `injury_phases`
- `supplements`
- `meal_examples`
- `safety_notes`
- `admin_users`
- `injury_page_content`
- `injury_protocol_import_runs`
- `seo_pages`
