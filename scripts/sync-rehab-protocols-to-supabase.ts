import path from 'node:path';
import * as dotenv from 'dotenv';
import type {TableInsert} from '../src/lib/supabaseDatabase';
import {
  getGeneratedRehabExerciseRows,
  getGeneratedRehabPhaseRows,
  getGeneratedRehabProtocolRows,
} from '../src/services/generatedRehabProtocolSource';

dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
dotenv.config({path: path.resolve(process.cwd(), '.env')});

(globalThis as any).import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
      VITE_SITE_URL: process.env.VITE_SITE_URL,
    },
  },
};

let supabaseModulePromise:
  | Promise<typeof import('../src/lib/supabase')>
  | null = null;

async function getSupabaseModule() {
  if (!supabaseModulePromise) {
    supabaseModulePromise = import('../src/lib/supabase');
  }

  return supabaseModulePromise;
}

async function ensureSupabase() {
  const {supabase} = await getSupabaseModule();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

async function signInIfConfigured() {
  const adminEmail = process.env.SUPABASE_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.SUPABASE_ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    console.log('No CLI admin credentials found. Sync will use the current Supabase session only.');
    return;
  }

  console.log(`Signing in to Supabase as ${adminEmail}...`);
  const {getCurrentUser, signInWithEmail} = await getSupabaseModule();
  await signInWithEmail(adminEmail, adminPassword);
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Supabase sign-in did not produce an authenticated user.');
  }
}

function buildProtocolPayload() {
  const protocolRows = getGeneratedRehabProtocolRows();
  const phaseRows = protocolRows.flatMap((protocol) => getGeneratedRehabPhaseRows(protocol.id));
  const exerciseRows = getGeneratedRehabExerciseRows(phaseRows.map((phase) => phase.id));

  return {
    protocolRows: protocolRows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description,
    })) satisfies TableInsert<'protocols'>[],
    phaseRows: phaseRows.map((row) => ({
      id: row.id,
      protocol_id: row.protocol_id,
      phase_number: row.phase_number,
      title: row.title,
      timeline: row.timeline,
      goals: row.goals,
      precautions: row.precautions,
      criteria_to_progress: row.criteria_to_progress,
    })) satisfies TableInsert<'phases'>[],
    exerciseRows: exerciseRows.map((row) => ({
      id: row.id,
      phase_id: row.phase_id,
      name: row.name,
      parameters: row.parameters,
      clinical_cue_rationale: row.clinical_cue_rationale,
    })) satisfies TableInsert<'exercises'>[],
  };
}

async function insertProtocols() {
  const db = await ensureSupabase();
  const protocolTable = db.from('protocols') as any;
  const phaseTable = db.from('phases') as any;
  const exerciseTable = db.from('exercises') as any;
  const {protocolRows, phaseRows, exerciseRows} = buildProtocolPayload();

  console.log('Clearing existing rehab protocol rows from Supabase...');
  const {error: deleteError} = await protocolTable.delete().gt('id', 0);
  if (deleteError) throw deleteError;

  for (const batch of chunk(protocolRows, 200)) {
    const {error} = await protocolTable.insert(batch);
    if (error) throw error;
  }

  for (const batch of chunk(phaseRows, 200)) {
    const {error} = await phaseTable.insert(batch);
    if (error) throw error;
  }

  for (const batch of chunk(exerciseRows, 200)) {
    const {error} = await exerciseTable.insert(batch);
    if (error) throw error;
  }

  return {
    protocolCount: protocolRows.length,
    phaseCount: phaseRows.length,
    exerciseCount: exerciseRows.length,
  };
}

async function main() {
  await signInIfConfigured();
  const result = await insertProtocols();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
