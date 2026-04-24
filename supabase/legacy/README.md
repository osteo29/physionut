# Legacy Supabase Files

These files are archived compatibility references only.

Archive-only rules:

- Do not edit files in this folder for active development.
- Do not use these files as the source of truth for schema or policy changes.
- Do not run archived bootstrap SQL for new environments.
- Put all active database changes in `../migrations/`.

## Archive contents

- `SUPABASE_SQL_CLEAN.sql`
  Old one-shot bootstrap SQL used before migrations became the official path.
- `SUPABASE_ASSESSMENTS.sql`
  Archived assessment SQL that has now been promoted into `../migrations/20260424_add_assessments.sql`.
- `SUPABASE_AUTH_ASSESSMENTS.sql`
  Older assessment/auth variant kept only for comparison.
- `SUPABASE_HARDENING_PLAN.md`
  Historical notes from the hardening pass.
- `sql-editor-chunks/`
  Old chunked seed fallback. Keep only if manual SQL editor pasting is still needed for historical reference.
