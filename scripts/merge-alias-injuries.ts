import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';
import {createClient} from '@supabase/supabase-js';

type PlanItem = {
  sourceTitle: string;
  matchedSlug: string;
  remoteSlug: string;
};

type InjuryRow = {
  id: string;
  injury_id_slug: string;
  name_en: string;
  name_ar: string | null;
  overview_en: string | null;
  overview_ar: string | null;
  rehab_summary_en: string | null;
  rehab_summary_ar: string | null;
  category: string | null;
  body_region_en: string | null;
  body_region_ar: string | null;
  common_in: string[] | null;
  red_flags: string[] | null;
  related_calculators: string[] | null;
};

type PhaseRow = {
  id: string;
  injury_id: string;
  phase_number: number;
  label_en: string;
  label_ar: string | null;
  duration_en: string | null;
  duration_ar: string | null;
  recovery_window: string | null;
  goals_en: string[] | null;
  goals_ar: string[] | null;
  nutrition_focus_en: string[] | null;
  nutrition_focus_ar: string[] | null;
  recommended_foods_en: string[] | null;
  recommended_foods_ar: string[] | null;
  avoid_foods_en: string[] | null;
  avoid_foods_ar: string[] | null;
  focus_en: string | null;
  focus_ar: string | null;
  progression_markers_en: string[] | null;
  progression_markers_ar: string[] | null;
  cautions_en: string[] | null;
  cautions_ar: string[] | null;
  nutrition_notes_en: string[] | null;
  nutrition_notes_ar: string[] | null;
  exercise_plans: any[] | null;
  exercises_en: string[] | null;
  exercises_ar: string[] | null;
  prohibited_movements_en: string[] | null;
  prohibited_movements_ar: string[] | null;
  protein_min_per_kg: number | null;
  protein_max_per_kg: number | null;
  hydration_ml_per_kg: number | null;
  omega3_grams: number | null;
  creatine_grams: number | null;
  collagen_min_per_kg: number | null;
  collagen_max_per_kg: number | null;
  vitamin_c_mg: number | null;
  calcium_mg: number | null;
};

function loadEnv() {
  dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
  dotenv.config({path: path.resolve(process.cwd(), '.env')});
}

function getClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const anon = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error('Missing Supabase env.');
  return createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function signIn(client: ReturnType<typeof createClient>) {
  const email = process.env.SUPABASE_ADMIN_EMAIL?.trim();
  const password = process.env.SUPABASE_ADMIN_PASSWORD?.trim();
  if (!email || !password) throw new Error('Missing admin credentials.');
  const {error} = await client.auth.signInWithPassword({email, password});
  if (error) throw error;
}

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

function uniqText(items: Array<string | null | undefined>) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const value = (item || '').trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(value);
  }
  return out;
}

function mergeTextArrays(primary?: string[] | null, secondary?: string[] | null) {
  return uniqText([...(primary || []), ...(secondary || [])]);
}

function mergeScalarText(primary?: string | null, secondary?: string | null) {
  const a = (primary || '').trim();
  const b = (secondary || '').trim();
  if (!a) return b || null;
  if (!b) return a;
  return a.length >= b.length ? a : b;
}

function mergeJsonArray(primary?: any[] | null, secondary?: any[] | null) {
  const seen = new Set<string>();
  const out: any[] = [];
  for (const item of [...(primary || []), ...(secondary || [])]) {
    const key = JSON.stringify(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function labelKey(phase: {label_en: string | null; phase_number: number | null}) {
  return `${normalize(phase.label_en)}::${phase.phase_number ?? 0}`;
}

async function countTable(client: ReturnType<typeof createClient>, table: string) {
  const {count, error} = await client.from(table).select('*', {count: 'exact', head: true});
  if (error) throw error;
  return count || 0;
}

async function main() {
  loadEnv();
  const client = getClient();
  await signIn(client);

  const plan = JSON.parse(fs.readFileSync(path.resolve('tmp/injury-import/reconciliation-plan.json'), 'utf8'));
  const pairs: PlanItem[] = plan.mergeAliasCandidates;
  const slugs = [...new Set(pairs.flatMap((item: PlanItem) => [item.matchedSlug, item.remoteSlug]))];

  const before = {
    injuries: await countTable(client, 'injuries'),
    phases: await countTable(client, 'injury_phases'),
    phaseExercises: await countTable(client, 'phase_exercises'),
    phaseGoals: await countTable(client, 'phase_goals'),
    phasePrecautions: await countTable(client, 'phase_precautions'),
  };

  const {data: injuries, error: injuriesError} = await client
    .from('injuries')
    .select('*')
    .in('injury_id_slug', slugs);
  if (injuriesError) throw injuriesError;

  const injuryBySlug = new Map((injuries || []).map((row: InjuryRow) => [row.injury_id_slug, row]));
  const injuryIds = (injuries || []).map((row: InjuryRow) => row.id);

  const {data: phases, error: phasesError} = await client
    .from('injury_phases')
    .select('*')
    .in('injury_id', injuryIds)
    .order('phase_number');
  if (phasesError) throw phasesError;

  const phasesByInjury = new Map<string, PhaseRow[]>();
  for (const phase of (phases || []) as PhaseRow[]) {
    const list = phasesByInjury.get(phase.injury_id) || [];
    list.push(phase);
    phasesByInjury.set(phase.injury_id, list);
  }

  const phaseIds = (phases || []).map((row: PhaseRow) => row.id);
  const [goalsR, precautionsR, exercisesR, safetyR, contentR] = await Promise.all([
    client.from('phase_goals').select('*').in('phase_id', phaseIds),
    client.from('phase_precautions').select('*').in('phase_id', phaseIds),
    client.from('phase_exercises').select('*').in('phase_id', phaseIds),
    client.from('safety_notes').select('*').in('injury_id', injuryIds),
    client.from('injury_page_content').select('*').in('injury_id', injuryIds),
  ]);
  for (const result of [goalsR, precautionsR, exercisesR, safetyR, contentR]) if (result.error) throw result.error;

  const goalsByPhase = new Map<string, any[]>();
  for (const row of goalsR.data || []) goalsByPhase.set(row.phase_id, [...(goalsByPhase.get(row.phase_id) || []), row]);
  const precautionsByPhase = new Map<string, any[]>();
  for (const row of precautionsR.data || []) precautionsByPhase.set(row.phase_id, [...(precautionsByPhase.get(row.phase_id) || []), row]);
  const exercisesByPhase = new Map<string, any[]>();
  for (const row of exercisesR.data || []) exercisesByPhase.set(row.phase_id, [...(exercisesByPhase.get(row.phase_id) || []), row]);
  const safetyByInjury = new Map<string, any>((safetyR.data || []).map((row: any) => [row.injury_id, row]));
  const contentByInjury = new Map<string, any>((contentR.data || []).map((row: any) => [row.injury_id, row]));

  const mergeLog: any[] = [];

  for (const pair of pairs) {
    const canonical = injuryBySlug.get(pair.matchedSlug);
    const duplicate = injuryBySlug.get(pair.remoteSlug);
    if (!canonical || !duplicate) continue;

    const canonicalUpdate = {
      name_en: mergeScalarText(canonical.name_en, duplicate.name_en),
      name_ar: mergeScalarText(canonical.name_ar, duplicate.name_ar),
      overview_en: mergeScalarText(canonical.overview_en, duplicate.overview_en),
      overview_ar: mergeScalarText(canonical.overview_ar, duplicate.overview_ar),
      rehab_summary_en: mergeScalarText(canonical.rehab_summary_en, duplicate.rehab_summary_en),
      rehab_summary_ar: mergeScalarText(canonical.rehab_summary_ar, duplicate.rehab_summary_ar),
      category: mergeScalarText(canonical.category, duplicate.category),
      body_region_en: mergeScalarText(canonical.body_region_en, duplicate.body_region_en),
      body_region_ar: mergeScalarText(canonical.body_region_ar, duplicate.body_region_ar),
      common_in: mergeTextArrays(canonical.common_in, duplicate.common_in),
      red_flags: mergeTextArrays(canonical.red_flags, duplicate.red_flags),
      related_calculators: mergeTextArrays(canonical.related_calculators, duplicate.related_calculators),
    };

    const {error: injuryUpdateError} = await client.from('injuries').update(canonicalUpdate).eq('id', canonical.id);
    if (injuryUpdateError) throw injuryUpdateError;

    const canonicalSafety = safetyByInjury.get(canonical.id);
    const duplicateSafety = safetyByInjury.get(duplicate.id);
    if (!canonicalSafety && duplicateSafety) {
      const {error} = await client.from('safety_notes').update({injury_id: canonical.id}).eq('id', duplicateSafety.id);
      if (error) throw error;
    }

    const canonicalContent = contentByInjury.get(canonical.id);
    const duplicateContent = contentByInjury.get(duplicate.id);
    if (!canonicalContent && duplicateContent) {
      const {error} = await client.from('injury_page_content').update({injury_id: canonical.id}).eq('id', duplicateContent.id);
      if (error) throw error;
    }

    const canonicalPhases = phasesByInjury.get(canonical.id) || [];
    const duplicatePhases = phasesByInjury.get(duplicate.id) || [];
    const canonicalPhaseMap = new Map(canonicalPhases.map((phase) => [labelKey(phase), phase]));

    const pairLog = {
      sourceTitle: pair.sourceTitle,
      canonical: canonical.injury_id_slug,
      duplicate: duplicate.injury_id_slug,
      phasesMerged: 0,
      goalsMoved: 0,
      precautionsMoved: 0,
      exercisesMoved: 0,
    };

    for (const duplicatePhase of duplicatePhases) {
      const canonicalPhase = canonicalPhaseMap.get(labelKey(duplicatePhase));
      if (!canonicalPhase) continue;

      const phaseUpdate = {
        goals_en: mergeTextArrays(canonicalPhase.goals_en, duplicatePhase.goals_en),
        goals_ar: mergeTextArrays(canonicalPhase.goals_ar, duplicatePhase.goals_ar),
        nutrition_focus_en: mergeTextArrays(canonicalPhase.nutrition_focus_en, duplicatePhase.nutrition_focus_en),
        nutrition_focus_ar: mergeTextArrays(canonicalPhase.nutrition_focus_ar, duplicatePhase.nutrition_focus_ar),
        recommended_foods_en: mergeTextArrays(canonicalPhase.recommended_foods_en, duplicatePhase.recommended_foods_en),
        recommended_foods_ar: mergeTextArrays(canonicalPhase.recommended_foods_ar, duplicatePhase.recommended_foods_ar),
        avoid_foods_en: mergeTextArrays(canonicalPhase.avoid_foods_en, duplicatePhase.avoid_foods_en),
        avoid_foods_ar: mergeTextArrays(canonicalPhase.avoid_foods_ar, duplicatePhase.avoid_foods_ar),
        focus_en: mergeScalarText(canonicalPhase.focus_en, duplicatePhase.focus_en),
        focus_ar: mergeScalarText(canonicalPhase.focus_ar, duplicatePhase.focus_ar),
        progression_markers_en: mergeTextArrays(canonicalPhase.progression_markers_en, duplicatePhase.progression_markers_en),
        progression_markers_ar: mergeTextArrays(canonicalPhase.progression_markers_ar, duplicatePhase.progression_markers_ar),
        cautions_en: mergeTextArrays(canonicalPhase.cautions_en, duplicatePhase.cautions_en),
        cautions_ar: mergeTextArrays(canonicalPhase.cautions_ar, duplicatePhase.cautions_ar),
        nutrition_notes_en: mergeTextArrays(canonicalPhase.nutrition_notes_en, duplicatePhase.nutrition_notes_en),
        nutrition_notes_ar: mergeTextArrays(canonicalPhase.nutrition_notes_ar, duplicatePhase.nutrition_notes_ar),
        exercise_plans: mergeJsonArray(canonicalPhase.exercise_plans, duplicatePhase.exercise_plans),
        exercises_en: mergeTextArrays(canonicalPhase.exercises_en, duplicatePhase.exercises_en),
        exercises_ar: mergeTextArrays(canonicalPhase.exercises_ar, duplicatePhase.exercises_ar),
        prohibited_movements_en: mergeTextArrays(canonicalPhase.prohibited_movements_en, duplicatePhase.prohibited_movements_en),
        prohibited_movements_ar: mergeTextArrays(canonicalPhase.prohibited_movements_ar, duplicatePhase.prohibited_movements_ar),
        protein_min_per_kg: canonicalPhase.protein_min_per_kg ?? duplicatePhase.protein_min_per_kg,
        protein_max_per_kg: canonicalPhase.protein_max_per_kg ?? duplicatePhase.protein_max_per_kg,
        hydration_ml_per_kg: canonicalPhase.hydration_ml_per_kg ?? duplicatePhase.hydration_ml_per_kg,
        omega3_grams: canonicalPhase.omega3_grams ?? duplicatePhase.omega3_grams,
        creatine_grams: canonicalPhase.creatine_grams ?? duplicatePhase.creatine_grams,
        collagen_min_per_kg: canonicalPhase.collagen_min_per_kg ?? duplicatePhase.collagen_min_per_kg,
        collagen_max_per_kg: canonicalPhase.collagen_max_per_kg ?? duplicatePhase.collagen_max_per_kg,
        vitamin_c_mg: canonicalPhase.vitamin_c_mg ?? duplicatePhase.vitamin_c_mg,
        calcium_mg: canonicalPhase.calcium_mg ?? duplicatePhase.calcium_mg,
      };

      const {error: phaseError} = await client.from('injury_phases').update(phaseUpdate).eq('id', canonicalPhase.id);
      if (phaseError) throw phaseError;

      const existingGoalTexts = new Set(((goalsByPhase.get(canonicalPhase.id) || []) as any[]).map((row) => normalize(row.text_en)));
      for (const row of (goalsByPhase.get(duplicatePhase.id) || []) as any[]) {
        if (existingGoalTexts.has(normalize(row.text_en))) continue;
        const {error} = await client.from('phase_goals').insert([{ phase_id: canonicalPhase.id, order_index: existingGoalTexts.size, text_en: row.text_en, text_ar: row.text_ar || row.text_en }]);
        if (error) throw error;
        existingGoalTexts.add(normalize(row.text_en));
        pairLog.goalsMoved += 1;
      }

      const existingPrecautionTexts = new Set(((precautionsByPhase.get(canonicalPhase.id) || []) as any[]).map((row) => normalize(row.text_en)));
      for (const row of (precautionsByPhase.get(duplicatePhase.id) || []) as any[]) {
        if (existingPrecautionTexts.has(normalize(row.text_en))) continue;
        const {error} = await client.from('phase_precautions').insert([{ phase_id: canonicalPhase.id, order_index: existingPrecautionTexts.size, text_en: row.text_en, text_ar: row.text_ar || row.text_en }]);
        if (error) throw error;
        existingPrecautionTexts.add(normalize(row.text_en));
        pairLog.precautionsMoved += 1;
      }

      const existingExercises = new Set(((exercisesByPhase.get(canonicalPhase.id) || []) as any[]).map((row) => `${normalize(row.name_en)}::${normalize(row.prescription_en)}`));
      for (const row of (exercisesByPhase.get(duplicatePhase.id) || []) as any[]) {
        const key = `${normalize(row.name_en)}::${normalize(row.prescription_en)}`;
        if (existingExercises.has(key)) continue;
        const payload = { ...row };
        delete payload.id;
        delete payload.created_at;
        delete payload.updated_at;
        payload.phase_id = canonicalPhase.id;
        payload.order_index = existingExercises.size;
        const {error} = await client.from('phase_exercises').insert([payload]);
        if (error) throw error;
        existingExercises.add(key);
        pairLog.exercisesMoved += 1;
      }

      pairLog.phasesMerged += 1;
    }

    const {error: deleteError} = await client.from('injuries').delete().eq('id', duplicate.id);
    if (deleteError) throw deleteError;
    mergeLog.push(pairLog);
  }

  const after = {
    injuries: await countTable(client, 'injuries'),
    phases: await countTable(client, 'injury_phases'),
    phaseExercises: await countTable(client, 'phase_exercises'),
    phaseGoals: await countTable(client, 'phase_goals'),
    phasePrecautions: await countTable(client, 'phase_precautions'),
  };

  const outPath = path.resolve(process.cwd(), 'tmp/injury-import/alias-merge-result.json');
  fs.writeFileSync(outPath, JSON.stringify({ before, after, mergeLog }, null, 2));
  console.log(JSON.stringify({ before, after, mergedPairs: mergeLog.length, outPath }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
