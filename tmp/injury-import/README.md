Bulk exercise protocol import

What this does
- Keeps the current nutrition and supplement content.
- Adds only exercise-rehab overrides on top of the existing injury library.
- Does not use SQL for the large protocol text.

Your workflow
1. Open tmp/injury-import/bulk-protocols.txt
2. Paste all protocol text there as one big text file
3. Keep the format as close as possible to your source
4. Tell Codex to run: npm run import:injury-protocols

Optional but helpful
- If an injury title may be ambiguous, put a slug line before it:
  [slug: acl_reconstruction]

Output files
- src/services/injuryExerciseProtocolOverrides.ts
  This is the generated exercise-only overrides file used by the app.
- tmp/injury-import/last-import-report.txt
  This shows matched and unmatched injuries after each import.

Notes
- The site keeps the current nutrition data from the main injury database.
- The imported file only overrides rehab-phase exercise content.
- You can paste all 100 injuries into one text file.
