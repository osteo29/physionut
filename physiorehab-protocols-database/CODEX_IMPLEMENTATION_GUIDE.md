# Clinical Implementation Guide for Codex / Supabase

This document serves as a blueprint for implementing the **ActiveRehab** database and frontend using the unified rehab protocol dataset in this folder.

## 1. Database Schema (Supabase/PostgreSQL)
The merged JSON dataset and protocol aliases map to the following structure:
- **`protocols`**: Name and Category.
- **`phases`**: Linked to protocols. Contains `number`, `title`, `timeline`, and Arrays for `goals`, `precautions`, `criteria_to_progress`.
- **`exercises`**: Linked to specific phases. Contains `name`, `parameters`, and `clinical_cue_rationale`.

**Crucial Note:** Ensure the `phases` table columns are defined as `TEXT[]` to correctly store list items like precautions and criteria.

## 2. Frontend Design Principles (Medical Reference Aesthetic)
To make the application look like a premium clinical textbook, follow these design rules:

### A. Phase Header (The "Clinical Summary")
At the start of every phase, display three distinct cards or columns:
1.  **Goals (Blue)**: Use a list with checkmark icons.
2.  **Precautions (Amber/Red)**: Highlight these with an exclamation icon. **This is critical safety data.**
3.  **Criteria to Progress (Green)**: Clearly define what the patient must achieve to move to the next phase.

### B. Exercise Table (The "Prescription")
Exercises should NOT be cards. They should be a **Clean Table** for readability:
- **Column 1: Exercise Name**: Bold, distinct text.
- **Column 2: Parameters**: Sets, reps, or duration (e.g., "3x15 reps").
- **Column 3: Clinical Cue / Rationale**: This is the "why" behind the move. Use it to provide professional guidance.

### C. Typography & Color
- **Headers**: Use a bold Sans-Serif (e.g., Inter, Montserrat).
- **Body/Notes**: Consider a high-quality Serif for a "Book" character.
- **Primary Color**: `#1e3a8a` (Deep Oxford Blue).
- **Accent Color**: `#059669` (Emerald Green) for successful criteria.

## 3. Data Integrity Verification
I have used a processor to verify that all 100 protocols in the SQL patches contain:
- [x] Full Phased Breakdowns.
- [x] Precautionary Warnings.
- [x] Progression Criteria.
- [x] Clinical Cues for every exercise.

If any phase is missing "Precautions" or "Criteria", refer back to `merged_protocols.json` first, then inspect `full_protocols.json` or `protocol_name_aliases.json` for canonical naming.
