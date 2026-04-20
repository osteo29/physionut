Bulk exercise protocol import

What this does
- Keeps the current nutrition and supplement content.
- Adds only exercise-rehab overrides on top of the existing injury library.
- Does not use SQL for the large protocol text.
- Builds a small review workspace so you can inspect parsed data before syncing.

Your workflow
1. Open tmp/injury-import/bulk-protocols.txt
2. Paste all protocol text there as one big text file
3. Keep the format as close as possible to your source
4. Run `npm run organize:injury-data`
5. Review the generated report + JSON files
6. When the parse looks right, run `npm run protocols:sync`

Optional but helpful
- If an injury title may be ambiguous, put a slug line before it:
  [slug: acl_reconstruction]

Output files
- src/services/injuryExerciseProtocolOverrides.ts
  This is the generated exercise-only overrides file used by the app.
- tmp/injury-import/last-import-report.txt
  This shows matched and unmatched injuries after each import.
- tmp/injury-import/parsed-protocols.json
  This is the parsed structured version of the bulk text.
- tmp/injury-import/import-manifest.json
  This is the high-level manifest for counts, matches, missing coverage, and Supabase tables touched.

Notes
- The site keeps the current nutrition data from the main injury database.
- The imported file only overrides rehab-phase exercise content.
- You can paste all 100 injuries into one text file.
- `npm run import:injury-protocols` still works, but `npm run organize:injury-data` is the better daily workflow.
