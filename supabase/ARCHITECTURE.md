# Supabase Architecture

## Lifecycle

The database lifecycle for this project is now:

1. `supabase/migrations/`
   This is the only source of truth for schema, policies, permissions, and structural database changes.
2. `supabase/seed_injury_library.sql`
   This is the canonical generated seed for injury-library content.
3. Runtime code in `src/lib/supabase.ts` and related services
   These files assume the migration chain has already been applied.

## Allowed paths

Use these paths for active work:

- `supabase/migrations/` for schema and RLS changes
- `supabase/seed_injury_library.sql` for the main injury-library seed
- `supabase/sample-data.sql` only for optional local/manual sample data

## Forbidden paths

Do not use these for new development:

- `supabase/legacy/`
- root-level bootstrap SQL flows from old docs
- `supabase/.temp/`
- `database/`

If a database change is not represented in `supabase/migrations/`, it is not part of the supported architecture.

## Legacy lock

`supabase/legacy/` is archive-only.

Rules:

- Do not edit files in `supabase/legacy/`.
- Do not run `supabase/legacy/SUPABASE_SQL_CLEAN.sql` for new environments.
- Do not add new files under `supabase/legacy/` unless archiving historical material.
- Do not treat `supabase/legacy/sql-editor-chunks/` as a second setup path.

## Migration audit

A direct comparison between `supabase/legacy/SUPABASE_SQL_CLEAN.sql` and the current migration baseline shows that the legacy bootstrap is not schema-complete for the live app.

Key findings:

- `SUPABASE_SQL_CLEAN.sql` covers only the early injury tables, public read policies, and a few indexes.
- It does not include later database objects now expected by the app, such as `assessment_leads`, `admin_users`, and `injury_protocol_import_runs`.
- It does not include the `assessments` table path, which has now been promoted into `supabase/migrations/20260424000100_add_assessments.sql`.
- It does not reflect the current admin/RLS hardening model.
- It does not include the newer injury-phase enrichment columns like focus, progression markers, cautions, and nutrition notes.

## Schema parity status

Current status: partial parity only.

Meaning:

- `supabase/legacy/SUPABASE_SQL_CLEAN.sql` is not equivalent to the migration-driven system.
- The migration-driven system is the authoritative path.
- The legacy bootstrap must remain archival and should eventually be removed once all old docs are retired.

## Operational rule

Before any deploy, migration push, or database debugging session:

1. Check the needed change exists in `supabase/migrations/`.
2. Treat `supabase/legacy/` as historical reference only.
3. Seed content separately after migrations when needed.

## Next hardening step

The remaining cleanup work is documentation convergence:

- retire old setup docs that still describe legacy bootstrap flows
- keep one active setup flow that points only to migrations and seed


