# Supabase Workspace Guide

This folder is the active home for the project's database work.

## What belongs here

- `schema.sql`
  Current schema snapshot for reference only.
- `migrations/`
  The official source of truth for all database changes going forward.
- `seed_injury_library.sql`
  Canonical generated seed file for the injury library dataset.
- `sample-data.sql`
  Small optional sample data for local or manual testing.
- `legacy/`
  Archived bootstrap SQL, hardening notes, and chunked SQL-editor compatibility files.
- `test-rls.sql`
  Small verification script for RLS behavior.
- `generated_protocol_updates.sql`
  Generated output file for protocol-related updates.

## Current source-of-truth rules

1. Rebuild or evolve the database through `supabase/migrations/`.
2. Start from `supabase/migrations/20260424_000000_baseline_schema.sql` for the current baseline.
3. Apply `supabase/migrations/20260424_add_assessments.sql` for the `assessments` table path that used to live outside migrations.
4. Treat `supabase/seed_injury_library.sql` as the canonical generated seed file.
5. Treat everything under `supabase/legacy/` as archive-only compatibility material.
6. Do not treat `supabase/.temp/` as versioned project logic.

## Notes

- Older non-timestamped migrations are still kept because they reflect production history.
- The `database/` folder is not the active database workspace.
- Future migrations should stay timestamped so ordering stays obvious.
