import path from 'node:path';
import * as dotenv from 'dotenv';
import {generatedRehabProtocols} from '../src/services/generatedRehabProtocols';
import type {TableInsert} from '../src/lib/supabaseDatabase';

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

async function insertProtocols() {
  const db = await ensureSupabase();
  const protocolRows: TableInsert<'protocols'>[] = generatedRehabProtocols.map((protocol, index) => ({
    id: index + 1,
    name: protocol.name,
    category: protocol.category,
    description: null,
  }));

  const phaseRows: TableInsert<'phases'>[] = [];
  const exerciseRows: TableInsert<'exercises'>[] = [];

  generatedRehabProtocols.forEach((protocol, protocolIndex) => {
    protocol.phases.forEach((phase, phaseIndex) => {
      const phaseId = (protocolIndex + 1) * 100 + phaseIndex + 1;
      phaseRows.push({
        id: phaseId,
        protocol_id: protocolIndex + 1,
        phase_number: phase.phaseNumber,
        title: phase.title,
        timeline: phase.timeline || null,
        goals: phase.goals,
        precautions: phase.precautions,
        criteria_to_progress: phase.criteriaToProgress,
      });

      phase.exercises.forEach((exercise, exerciseIndex) => {
        exerciseRows.push({
          id: phaseId * 1000 + exerciseIndex + 1,
          phase_id: phaseId,
          name: exercise.name,
          parameters: exercise.parameters || null,
          clinical_cue_rationale: exercise.clinicalCueRationale || null,
        });
      });
    });
  });

  console.log('Clearing existing rehab protocol rows from Supabase...');
  const {error: deleteError} = await db.from('protocols').delete().gt('id', 0);
  if (deleteError) throw deleteError;

  for (const batch of chunk(protocolRows, 200)) {
    const {error} = await db.from('protocols').insert(batch);
    if (error) throw error;
  }

  for (const batch of chunk(phaseRows, 200)) {
    const {error} = await db.from('phases').insert(batch);
    if (error) throw error;
  }

  for (const batch of chunk(exerciseRows, 200)) {
    const {error} = await db.from('exercises').insert(batch);
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
