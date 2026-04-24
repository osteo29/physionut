#!/usr/bin/env node
/**
 * Verification script for the current Supabase workspace layout.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\nChecking project setup...\n');

const requiredFiles = [
  'src/services/injurySupabaseService.ts',
  'src/services/healthCheck.ts',
  'src/utils/dataMigration.ts',
  'src/pages/AdminInjuryManager.tsx',
  'src/RouterApp.tsx',
  'supabase/schema.sql',
  'supabase/migrations/20260424_000000_baseline_schema.sql',
  'supabase/migrations/20260424_add_assessments.sql',
  'supabase/seed_injury_library.sql',
  'supabase/README.md',
  'supabase/ARCHITECTURE.md',
  'supabase/legacy/README.md'
];

let allPresent = true;

console.log('Required files:\n');

requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  const status = exists ? 'OK' : 'MISSING';
  console.log(`${status}  ${file}`);
  if (!exists) allPresent = false;
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('\nWorkspace layout looks consistent.');
  console.log('\nRecommended DB flow:');
  console.log('  1. Apply migrations from supabase/migrations in filename order.');
  console.log('  2. Seed the injury library with supabase/seed_injury_library.sql if needed.');
  console.log('  3. Treat supabase/legacy as archive-only.');
} else {
  console.log('\nSome expected files are missing. Review the Supabase workspace before deploying or pushing migrations.');
}

console.log('\n' + '='.repeat(50) + '\n');
