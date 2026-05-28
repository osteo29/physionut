# Scheduled Publisher

This edge function publishes due `article_workflows` rows whose:

- `status = 'scheduled'`
- `scheduled_for <= now()`

## Current behavior

- Claims due articles atomically by updating them from `scheduled` to `published`
- Writes a new `article_revisions` snapshot
- Re-syncs the public `articles` table for touched languages
- Emits `ARTICLE_PUBLISHED` events into `public.system_events`
- Emits `SITEMAP_REFRESH_REQUESTED` events for downstream side effects
- Writes execution state into `public.operation_logs`

## Auth

The function accepts either:

- `x-scheduled-job-secret: <SCHEDULED_JOB_SECRET>`
- `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>`

## Suggested next step

Run this function from a scheduler every few minutes, then add a consumer for:

- `SITEMAP_REFRESH_REQUESTED`
- cache invalidation
- search indexing
