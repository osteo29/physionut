import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Mock import.meta.env just in case
(globalThis as any).import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
      VITE_SITE_URL: process.env.VITE_SITE_URL,
    }
  }
};

const inputPath = path.resolve(process.cwd(), 'tmp', 'injury-import', 'bulk-protocols.txt');

async function main() {
  const { parseInjuryProtocolText } = await import('../src/services/injuryProtocolImport');
  const { importExerciseProtocolsToSupabase } = await import('../src/services/injurySupabaseService');
  
  console.log(`Reading from: ${inputPath}`);
  const rawText = fs.readFileSync(inputPath, 'utf8');
  
  console.log('Parsing injuries...');
  const injuries = parseInjuryProtocolText(rawText);
  
  console.log(`Parsed ${injuries.length} injuries. Found ${injuries.filter(i => i.matchedSlug).length} matches.`);
  
  console.log('Syncing to Supabase...');
  try {
    const result = await importExerciseProtocolsToSupabase({
      rawText,
      parsedInjuries: injuries,
      sourceName: 'CLI Bulk Sync'
    });
    console.log(`Successfully synced ${result.importedCount} injuries to Supabase!`);
    console.log(`Run ID: ${result.runId}`);
  } catch (err) {
    console.error('Failed to sync:', err);
  }
}

main().catch(console.error);
