/**
 * Supabase Injury Management Service
 * Centralized API for managing injury protocols, phases, supplements, and meals
 */

import {supabase} from '../lib/supabase';
import type {TableInsert, TableRow, TableUpdate} from '../lib/supabaseDatabase';
import type {
  InjuryProtocol,
  InjuryPhase,
  InjuryPageContentData,
  SupplementProtocol,
  MealExamples,
} from './injuryDatabase';
import type {Language} from './translations';
import type {ImportedInjuryProtocol, ProtocolImportSummary} from './injuryProtocolImport';
import {getAllInjuries, type RecoveryWindow} from './injuryDatabase';

function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

export type InjuryRow = TableRow<'injuries'>;
export type InjuryInsert = TableInsert<'injuries'>;
export type InjuryUpdate = TableUpdate<'injuries'>;

export type PhaseRow = TableRow<'injury_phases'>;
export type PhaseInsert = TableInsert<'injury_phases'>;
export type PhaseUpdate = TableUpdate<'injury_phases'>;

export type SupplementRow = TableRow<'supplements'>;
export type SupplementInsert = TableInsert<'supplements'>;
export type SupplementUpdate = TableUpdate<'supplements'>;

export type MealRow = TableRow<'meal_examples'>;
export type MealInsert = TableInsert<'meal_examples'>;
export type MealUpdate = TableUpdate<'meal_examples'>;

export type SafetyNotesRow = TableRow<'safety_notes'>;
export type InjuryPageContentRow = TableRow<'injury_page_content'>;

/**
 * Fetch all injuries from Supabase
 */
export async function fetchInjuriesFromSupabase(): Promise<InjuryRow[]> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('injuries')
      .select('*')
      .order('name_en');

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching injuries:', err);
    return [];
  }
}

/**
 * Fetch specific injury by slug
 */
export async function fetchInjuryBySlug(slug: string): Promise<InjuryRow | null> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('injuries')
      .select('*')
      .in('injury_id_slug', [slug, slug.replace(/-/g, '_'), slug.replace(/_/g, '-')])
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`Error fetching injury ${slug}:`, err);
    return null;
  }
}

/**
 * Fetch phases for an injury
 */
export async function fetchPhasesByInjuryId(injuryId: string): Promise<PhaseRow[]> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('injury_phases')
      .select('*')
      .eq('injury_id', injuryId)
      .order('phase_number');

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error(`Error fetching phases for injury ${injuryId}:`, err);
    return [];
  }
}

/**
 * Fetch supplements for a phase
 */
export async function fetchSupplementsByPhaseId(phaseId: string): Promise<SupplementRow[]> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('supplements')
      .select('*')
      .eq('phase_id', phaseId)
      .order('order_index');

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error(`Error fetching supplements for phase ${phaseId}:`, err);
    return [];
  }
}

/**
 * Fetch meal examples for a phase
 */
export async function fetchMealsByPhaseId(phaseId: string): Promise<MealRow[]> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('meal_examples')
      .select('*')
      .eq('phase_id', phaseId);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error(`Error fetching meals for phase ${phaseId}:`, err);
    return [];
  }
}

export async function fetchSafetyNotesByInjuryId(injuryId: string): Promise<SafetyNotesRow | null> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('safety_notes')
      .select('*')
      .eq('injury_id', injuryId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`Error fetching safety notes for injury ${injuryId}:`, err);
    return null;
  }
}

export async function fetchInjuryPageContentByInjuryId(injuryId: string): Promise<InjuryPageContentRow | null> {
  try {
    const db = getSupabaseClient();
    const { data, error } = await db
      .from('injury_page_content')
      .select('*')
      .eq('injury_id', injuryId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error(`Error fetching page content for injury ${injuryId}:`, err);
    return null;
  }
}

/**
 * Fetch complete injury protocol with all related data
 */
export async function fetchCompleteInjuryProtocol(
  slug: string,
  lang: Language = 'en'
): Promise<InjuryProtocol | null> {
  try {
    const injury = await fetchInjuryBySlug(slug);
    if (!injury) return null;

    const [phases, safetyNotes, pageContent] = await Promise.all([
      fetchPhasesByInjuryId(injury.id),
      fetchSafetyNotesByInjuryId(injury.id),
      fetchInjuryPageContentByInjuryId(injury.id),
    ]);
    const useArabic = lang === 'ar';

    // Fetch supplements and meals for each phase
    const phasesWithData = await Promise.all(
      phases.map(async (phase) => {
        const normalizeList = (value: unknown): string[] => {
          if (Array.isArray(value)) {
            return value.map((v) => (typeof v === 'string' ? v.trim() : '')).filter(Boolean);
          }
          if (typeof value === 'string') {
            return value
              .split('\n')
              .map((item) => item.trim())
              .filter(Boolean);
          }
          return [];
        };

        const supplements = await fetchSupplementsByPhaseId(phase.id);
        const mealRows = await fetchMealsByPhaseId(phase.id);

        // Convert supplements
        const supplementsConverted: SupplementProtocol[] = supplements.map((s) => ({
          name: s.name,
          dose: useArabic ? s.dose_ar || s.dose_en : s.dose_en,
          reason: useArabic ? s.reason_ar || s.reason_en : s.reason_en,
          timing: useArabic ? s.timing_ar || s.timing_en || undefined : s.timing_en || undefined,
          caution: useArabic ? s.caution_ar || s.caution_en || undefined : s.caution_en || undefined,
        }));

        // Convert meals (taking first or default diet type)
        const mealData = mealRows[0];
        const mealsConverted: MealExamples = mealData
          ? {
              breakfast: useArabic ? mealData.breakfast_ar || mealData.breakfast_en : mealData.breakfast_en,
              lunch: useArabic ? mealData.lunch_ar || mealData.lunch_en : mealData.lunch_en,
              dinner: useArabic ? mealData.dinner_ar || mealData.dinner_en : mealData.dinner_en,
              snack: useArabic
                ? mealData.snack_ar || mealData.snack_en || undefined
                : mealData.snack_en || undefined,
              shoppingList: useArabic
                ? mealData.shopping_list_ar?.length
                  ? mealData.shopping_list_ar
                  : mealData.shopping_list_en
                : mealData.shopping_list_en,
            }
          : {
              breakfast: '',
              lunch: '',
              dinner: '',
              shoppingList: [],
            };

        return {
          id: phase.id,
          label: useArabic ? phase.label_ar || phase.label_en : phase.label_en,
          duration: useArabic ? phase.duration_ar || phase.duration_en : phase.duration_en,
          window: phase.recovery_window as any,
          goals: useArabic && phase.goals_ar?.length ? phase.goals_ar : phase.goals_en,
          nutritionFocus:
            useArabic && phase.nutrition_focus_ar?.length ? phase.nutrition_focus_ar : phase.nutrition_focus_en,
          recommendedFoods:
            useArabic && phase.recommended_foods_ar?.length
              ? phase.recommended_foods_ar
              : phase.recommended_foods_en,
          avoidFoods:
            useArabic && phase.avoid_foods_ar?.length ? phase.avoid_foods_ar : phase.avoid_foods_en,
          supplements: supplementsConverted,
          exercises: useArabic && phase.exercises_ar?.length ? phase.exercises_ar : phase.exercises_en,
          prohibitedMovements:
            useArabic && phase.prohibited_movements_ar?.length
              ? phase.prohibited_movements_ar
              : phase.prohibited_movements_en,
          exercisePlans: (phase.exercise_plans || []).map((p: any) => ({
            label: useArabic
              ? (p?.label_ar ?? p?.exercise_ar ?? p?.label_en ?? p?.exercise_en ?? '')
              : (p?.label_en ?? p?.exercise_en ?? p?.label_ar ?? p?.exercise_ar ?? ''),
            sets: p?.sets ?? undefined,
            reps: p?.reps ?? undefined,
            rest: p?.rest ?? undefined,
            equipment: useArabic ? p?.equipment_ar ?? p?.equipment_en ?? p?.equipment ?? undefined : p?.equipment_en ?? p?.equipment_ar ?? p?.equipment ?? undefined,
            alternatives: useArabic ? normalizeList(p?.alternatives_ar ?? p?.alternatives) : normalizeList(p?.alternatives_en ?? p?.alternatives),
            cues: useArabic ? normalizeList(p?.cues_ar ?? p?.cues) : normalizeList(p?.cues_en ?? p?.cues),
          })),
          focus: (useArabic ? phase.focus_ar : phase.focus_en) || undefined,
          progressionMarkers: (useArabic ? phase.progression_markers_ar : phase.progression_markers_en) || [],
          cautions: (useArabic ? phase.cautions_ar : phase.cautions_en) || [],
          nutritionNotes: (useArabic ? phase.nutrition_notes_ar : phase.nutrition_notes_en) || [],
          meals: mealsConverted,
          proteinPerKg:
            phase.protein_min_per_kg && phase.protein_max_per_kg
              ? {
                  min: Number(phase.protein_min_per_kg),
                  max: Number(phase.protein_max_per_kg),
                }
              : undefined,
          hydrationMlPerKg: phase.hydration_ml_per_kg || undefined,
          omega3Grams: phase.omega3_grams ? Number(phase.omega3_grams) : undefined,
          creatineGrams: phase.creatine_grams ? Number(phase.creatine_grams) : undefined,
          collagenPerKg:
            phase.collagen_min_per_kg && phase.collagen_max_per_kg
              ? {
                  min: Number(phase.collagen_min_per_kg),
                  max: Number(phase.collagen_max_per_kg),
                }
              : undefined,
          vitaminCMg: phase.vitamin_c_mg || undefined,
          calciumMg: phase.calcium_mg || undefined,
        } as InjuryPhase;
      })
    );

    const faqItems = Array.isArray(pageContent?.faq_items) ? pageContent.faq_items : [];
    const mappedPageContent: InjuryPageContentData | undefined =
      pageContent
        ? {
            intro: useArabic ? pageContent.intro_ar || pageContent.intro_en || undefined : pageContent.intro_en || undefined,
            symptoms:
              useArabic && pageContent.symptoms_ar?.length
                ? pageContent.symptoms_ar
                : pageContent.symptoms_en || [],
            rehabNotes:
              useArabic && pageContent.rehab_notes_ar?.length
                ? pageContent.rehab_notes_ar
                : pageContent.rehab_notes_en || [],
            nutritionNotes:
              useArabic && pageContent.nutrition_notes_ar?.length
                ? pageContent.nutrition_notes_ar
                : pageContent.nutrition_notes_en || [],
            faq: faqItems
              .map((item) => {
                if (!item || typeof item !== 'object') return null;
                const qEn = typeof item.q_en === 'string' ? item.q_en : typeof item.q === 'string' ? item.q : '';
                const aEn = typeof item.a_en === 'string' ? item.a_en : typeof item.a === 'string' ? item.a : '';
                const qAr = typeof item.q_ar === 'string' ? item.q_ar : qEn;
                const aAr = typeof item.a_ar === 'string' ? item.a_ar : aEn;
                const q = useArabic ? qAr || qEn : qEn || qAr;
                const a = useArabic ? aAr || aEn : aEn || aAr;
                return q && a ? {q, a} : null;
              })
              .filter(Boolean) as Array<{q: string; a: string}>,
          }
        : undefined;

    const protocol: InjuryProtocol = {
      id: injury.injury_id_slug,
      name: useArabic ? injury.name_ar || injury.name_en : injury.name_en,
      category: injury.category as any,
      bodyRegion: (useArabic ? injury.body_region_ar || injury.body_region_en : injury.body_region_en) as any,
      commonIn: injury.common_in,
      overview: useArabic ? injury.overview_ar || injury.overview_en : injury.overview_en,
      rehabSummary: useArabic ? injury.rehab_summary_ar || injury.rehab_summary_en : injury.rehab_summary_en,
      redFlags: injury.red_flags,
      relatedCalculators: injury.related_calculators,
      safetyNotes: {
        medications:
          useArabic && safetyNotes?.medications_ar?.length
            ? safetyNotes.medications_ar
            : safetyNotes?.medications_en || [],
        supplements:
          useArabic && safetyNotes?.supplements_ar?.length
            ? safetyNotes.supplements_ar
            : safetyNotes?.supplements_en || [],
      },
      phases: phasesWithData,
      pageContent: mappedPageContent,
    };

    return protocol;
  } catch (err) {
    console.error(`Error fetching complete protocol for ${slug}:`, err);
    return null;
  }
}

/**
 * ADMIN: Create new injury
 */
export async function createInjury(data: InjuryInsert) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('injuries')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error creating injury:', err);
    throw err;
  }
}

/**
 * ADMIN: Update injury
 */
export async function updateInjury(id: string, data: InjuryUpdate) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('injuries')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error updating injury:', err);
    throw err;
  }
}

/**
 * ADMIN: Delete injury (cascades to phases, supplements, meals)
 */
export async function deleteInjury(id: string) {
  try {
    const db = getSupabaseClient();
    const { error } = await db.from('injuries').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting injury:', err);
    throw err;
  }
}

// ==========================================================================
// PHASES
// ==========================================================================

/**
 * ADMIN: Create phase
 */
export async function createPhase(data: PhaseInsert) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('injury_phases')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error creating phase:', err);
    throw err;
  }
}

/**
 * ADMIN: Update phase
 */
export async function updatePhase(id: string, data: PhaseUpdate) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('injury_phases')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error updating phase:', err);
    throw err;
  }
}

/**
 * ADMIN: Delete phase
 */
export async function deletePhase(id: string) {
  try {
    const db = getSupabaseClient();
    const { error } = await db.from('injury_phases').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting phase:', err);
    throw err;
  }
}

// ==========================================================================
// SUPPLEMENTS
// ==========================================================================

/**
 * ADMIN: Create supplement
 */
export async function createSupplement(
  data: SupplementInsert
) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('supplements')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error creating supplement:', err);
    throw err;
  }
}

/**
 * ADMIN: Update supplement
 */
export async function updateSupplement(id: string, data: SupplementUpdate) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('supplements')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error updating supplement:', err);
    throw err;
  }
}

/**
 * ADMIN: Delete supplement
 */
export async function deleteSupplement(id: string) {
  try {
    const db = getSupabaseClient();
    const { error } = await db.from('supplements').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting supplement:', err);
    throw err;
  }
}

// ==========================================================================
// MEALS
// ==========================================================================

/**
 * ADMIN: Create meal
 */
export async function createMeal(data: MealInsert) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('meal_examples')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error creating meal:', err);
    throw err;
  }
}

/**
 * ADMIN: Update meal
 */
export async function updateMeal(id: string, data: MealUpdate) {
  try {
    const db = getSupabaseClient();
    const { data: result, error } = await db
      .from('meal_examples')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (err) {
    console.error('Error updating meal:', err);
    throw err;
  }
}

/**
 * ADMIN: Delete meal
 */
export async function deleteMeal(id: string) {
  try {
    const db = getSupabaseClient();
    const { error } = await db.from('meal_examples').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting meal:', err);
    throw err;
  }
}


type ImportRunStatus = 'preview' | 'imported' | 'failed';

export type InjuryProtocolImportRunRow = {
  id: string;
  source_name: string | null;
  raw_text: string;
  parsed_count: number;
  matched_count: number;
  unmatched_count: number;
  imported_slugs: string[];
  unmatched_titles: string[];
  status: ImportRunStatus;
  notes: string | null;
  created_by: string | null;
  created_by_email: string | null;
  created_at: string;
  updated_at: string;
};

function inferRecoveryWindow(phaseNumber: number): RecoveryWindow {
  if (phaseNumber <= 1) return 'under_48h';
  if (phaseNumber === 2) return 'days_3_14';
  if (phaseNumber === 3) return 'weeks_2_6';
  return 'over_6_weeks';
}

function getLocalProtocolMap() {
  return new Map(getAllInjuries().map((injury) => [injury.id, injury]));
}

function buildFallbackInjuryInsert(slug: string, sourceTitle: string): InjuryInsert {
  return {
    injury_id_slug: slug,
    name_en: sourceTitle,
    name_ar: sourceTitle,
    category: 'Overuse',
    body_region_en: 'Whole body',
    body_region_ar: 'Whole body',
    overview_en: sourceTitle,
    overview_ar: sourceTitle,
    rehab_summary_en: 'Imported from admin protocol workflow.',
    rehab_summary_ar: 'Imported from admin protocol workflow.',
    common_in: [],
    red_flags: [],
    related_calculators: [],
  };
}

function buildLocalInjuryInsert(injury: InjuryProtocol): InjuryInsert {
  return {
    injury_id_slug: injury.id,
    name_en: injury.name,
    name_ar: injury.name,
    category: injury.category,
    body_region_en: injury.bodyRegion,
    body_region_ar: injury.bodyRegion,
    overview_en: injury.overview,
    overview_ar: injury.overview,
    rehab_summary_en: injury.rehabSummary,
    rehab_summary_ar: injury.rehabSummary,
    common_in: injury.commonIn,
    red_flags: injury.redFlags,
    related_calculators: injury.relatedCalculators,
  };
}

function buildPhasePayload(
  injuryId: string,
  phaseNumber: number,
  importedPhase: ImportedInjuryProtocol['phases'][number],
  existingPhase?: PhaseRow,
  basePhase?: InjuryPhase,
): PhaseInsert | PhaseUpdate {
  const fallbackLabel = importedPhase.label || basePhase?.label || `Phase ${phaseNumber}`;
  const fallbackDuration = importedPhase.duration || basePhase?.duration || '';
  const fallbackWindow = existingPhase?.recovery_window || basePhase?.window || inferRecoveryWindow(phaseNumber);

  return {
    injury_id: injuryId,
    phase_number: phaseNumber,
    label_en: importedPhase.label || existingPhase?.label_en || basePhase?.label || fallbackLabel,
    label_ar: existingPhase?.label_ar || importedPhase.label || basePhase?.label || fallbackLabel,
    duration_en: importedPhase.duration || existingPhase?.duration_en || basePhase?.duration || fallbackDuration,
    duration_ar: existingPhase?.duration_ar || importedPhase.duration || basePhase?.duration || fallbackDuration,
    recovery_window: fallbackWindow,
    goals_en: importedPhase.goals.length ? importedPhase.goals : existingPhase?.goals_en || basePhase?.goals || [],
    goals_ar: existingPhase?.goals_ar || basePhase?.goals || importedPhase.goals,
    nutrition_focus_en: existingPhase?.nutrition_focus_en || basePhase?.nutritionFocus || [],
    nutrition_focus_ar: existingPhase?.nutrition_focus_ar || basePhase?.nutritionFocus || [],
    recommended_foods_en: existingPhase?.recommended_foods_en || basePhase?.recommendedFoods || [],
    recommended_foods_ar: existingPhase?.recommended_foods_ar || basePhase?.recommendedFoods || [],
    avoid_foods_en: existingPhase?.avoid_foods_en || basePhase?.avoidFoods || [],
    avoid_foods_ar: existingPhase?.avoid_foods_ar || basePhase?.avoidFoods || [],
    focus_en: existingPhase?.focus_en || basePhase?.focus || '',
    focus_ar: existingPhase?.focus_ar || basePhase?.focus || '',
    progression_markers_en: importedPhase.progressionMarkers.length
      ? importedPhase.progressionMarkers
      : existingPhase?.progression_markers_en || basePhase?.progressionMarkers || [],
    progression_markers_ar: existingPhase?.progression_markers_ar || basePhase?.progressionMarkers || importedPhase.progressionMarkers,
    cautions_en: importedPhase.cautions.length ? importedPhase.cautions : existingPhase?.cautions_en || basePhase?.cautions || [],
    cautions_ar: existingPhase?.cautions_ar || basePhase?.cautions || importedPhase.cautions,
    nutrition_notes_en: existingPhase?.nutrition_notes_en || basePhase?.nutritionNotes || [],
    nutrition_notes_ar: existingPhase?.nutrition_notes_ar || basePhase?.nutritionNotes || [],
    exercise_plans: importedPhase.exercisePlans.length ? importedPhase.exercisePlans : existingPhase?.exercise_plans || basePhase?.exercisePlans || [],
    exercises_en: importedPhase.exercises.length ? importedPhase.exercises : existingPhase?.exercises_en || basePhase?.exercises || [],
    exercises_ar: existingPhase?.exercises_ar || basePhase?.exercises || importedPhase.exercises,
    prohibited_movements_en: existingPhase?.prohibited_movements_en || basePhase?.prohibitedMovements || [],
    prohibited_movements_ar: existingPhase?.prohibited_movements_ar || basePhase?.prohibitedMovements || [],
    protein_min_per_kg: existingPhase?.protein_min_per_kg ?? basePhase?.proteinPerKg?.min ?? null,
    protein_max_per_kg: existingPhase?.protein_max_per_kg ?? basePhase?.proteinPerKg?.max ?? null,
    hydration_ml_per_kg: existingPhase?.hydration_ml_per_kg ?? basePhase?.hydrationMlPerKg ?? null,
    omega3_grams: existingPhase?.omega3_grams ?? basePhase?.omega3Grams ?? null,
    creatine_grams: existingPhase?.creatine_grams ?? basePhase?.creatineGrams ?? null,
    collagen_min_per_kg: existingPhase?.collagen_min_per_kg ?? basePhase?.collagenPerKg?.min ?? null,
    collagen_max_per_kg: existingPhase?.collagen_max_per_kg ?? basePhase?.collagenPerKg?.max ?? null,
    vitamin_c_mg: existingPhase?.vitamin_c_mg ?? basePhase?.vitaminCMg ?? null,
    calcium_mg: existingPhase?.calcium_mg ?? basePhase?.calciumMg ?? null,
  };
}

export async function createInjuryProtocolImportRun(data: {
  rawText: string;
  sourceName?: string;
  summary: ProtocolImportSummary;
  status?: ImportRunStatus;
  notes?: string;
  actor?: {id?: string | null; email?: string | null};
}): Promise<InjuryProtocolImportRunRow | null> {
  try {
    const db = getSupabaseClient();
    const {data: result, error} = await db
      .from('injury_protocol_import_runs')
      .insert([
        {
          source_name: data.sourceName || null,
          raw_text: data.rawText,
          parsed_count: data.summary.parsedCount,
          matched_count: data.summary.matchedCount,
          unmatched_count: data.summary.unmatchedCount,
          imported_slugs: data.summary.matched.map((item) => item.matchedSlug).filter(Boolean),
          unmatched_titles: data.summary.unmatched.map((item) => item.sourceTitle),
          status: data.status || 'preview',
          notes: data.notes || null,
          created_by: data.actor?.id || null,
          created_by_email: data.actor?.email || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return result as InjuryProtocolImportRunRow;
  } catch (err) {
    console.error('Error creating injury protocol import run:', err);
    return null;
  }
}

export async function updateInjuryProtocolImportRun(
  id: string,
  data: Partial<Pick<InjuryProtocolImportRunRow, 'status' | 'notes' | 'parsed_count' | 'matched_count' | 'unmatched_count' | 'imported_slugs' | 'unmatched_titles'>>,
) {
  try {
    const db = getSupabaseClient();
    const {data: result, error} = await db
      .from('injury_protocol_import_runs')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result as InjuryProtocolImportRunRow;
  } catch (err) {
    console.error('Error updating injury protocol import run:', err);
    throw err;
  }
}

export async function importExerciseProtocolsToSupabase(params: {
  rawText: string;
  parsedInjuries: ImportedInjuryProtocol[];
  sourceName?: string;
  actor?: {id?: string | null; email?: string | null};
}) {
  const summary = {
    parsedCount: params.parsedInjuries.length,
    matchedCount: params.parsedInjuries.filter((item) => item.matchedSlug).length,
    unmatchedCount: params.parsedInjuries.filter((item) => !item.matchedSlug).length,
    matched: params.parsedInjuries.filter((item) => item.matchedSlug),
    unmatched: params.parsedInjuries.filter((item) => !item.matchedSlug),
  } satisfies ProtocolImportSummary;

  const run = await createInjuryProtocolImportRun({
    rawText: params.rawText,
    sourceName: params.sourceName,
    summary,
    status: 'preview',
    actor: params.actor,
  });

  try {
    const localProtocols = getLocalProtocolMap();
    const remoteRows = await fetchInjuriesFromSupabase();
    const remoteBySlug = new Map(remoteRows.map((row) => [row.injury_id_slug, row]));
    let importedCount = 0;

    for (const imported of params.parsedInjuries) {
      if (!imported.matchedSlug) continue;

      const localProtocol = localProtocols.get(imported.matchedSlug);
      let remoteInjury = remoteBySlug.get(imported.matchedSlug) || null;

      if (!remoteInjury) {
        remoteInjury = await createInjury(
          localProtocol
            ? buildLocalInjuryInsert(localProtocol)
            : buildFallbackInjuryInsert(imported.matchedSlug, imported.sourceTitle),
        );
        remoteBySlug.set(imported.matchedSlug, remoteInjury);
      }

      const existingPhases = await fetchPhasesByInjuryId(remoteInjury.id);
      const existingByNumber = new Map(existingPhases.map((phase) => [phase.phase_number, phase]));

      for (const importedPhase of imported.phases) {
        const existing = existingByNumber.get(importedPhase.phaseNumber);
        const basePhase = localProtocol?.phases[importedPhase.phaseNumber - 1];
        const payload = buildPhasePayload(remoteInjury.id, importedPhase.phaseNumber, importedPhase, existing, basePhase);

        if (existing) {
          await updatePhase(existing.id, payload as PhaseUpdate);
        } else {
          await createPhase(payload as PhaseInsert);
        }
      }

      importedCount += 1;
    }

    if (run) {
      await updateInjuryProtocolImportRun(run.id, {
        status: 'imported',
        notes: `Imported ${importedCount} matched injuries into Supabase.`,
      });
    }

    return {
      runId: run?.id || null,
      importedCount,
      summary,
    };
  } catch (error) {
    if (run) {
      await updateInjuryProtocolImportRun(run.id, {
        status: 'failed',
        notes: error instanceof Error ? error.message : 'Import failed',
      });
    }
    throw error;
  }
}

