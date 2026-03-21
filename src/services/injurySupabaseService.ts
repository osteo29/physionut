/**
 * Supabase Injury Management Service
 * Centralized API for managing injury protocols, phases, supplements, and meals
 */

import { supabase } from '../lib/supabase';
import type {
  InjuryProtocol,
  InjuryPhase,
  SupplementProtocol,
  MealExamples,
} from './injuryDatabase';

export interface InjuryRow {
  id: string;
  injury_id_slug: string;
  name_en: string;
  name_ar: string;
  category: string;
  body_region_en: string;
  body_region_ar: string;
  overview_en: string;
  overview_ar: string;
  rehab_summary_en: string;
  rehab_summary_ar: string;
  common_in: string[];
  red_flags: string[];
  related_calculators: string[];
  created_at: string;
  updated_at: string;
}

export interface PhaseRow {
  id: string;
  injury_id: string;
  phase_number: number;
  label_en: string;
  label_ar: string;
  duration_en: string;
  duration_ar: string;
  recovery_window: string;
  goals_en: string[];
  goals_ar: string[];
  nutrition_focus_en: string[];
  nutrition_focus_ar: string[];
  recommended_foods_en: string[];
  recommended_foods_ar: string[];
  avoid_foods_en: string[];
  avoid_foods_ar: string[];
  exercises_en: string[];
  exercises_ar: string[];
  prohibited_movements_en: string[];
  prohibited_movements_ar: string[];
  protein_min_per_kg: number | null;
  protein_max_per_kg: number | null;
  hydration_ml_per_kg: number | null;
  omega3_grams: number | null;
  creatine_grams: number | null;
  collagen_min_per_kg: number | null;
  collagen_max_per_kg: number | null;
  vitamin_c_mg: number | null;
  calcium_mg: number | null;
  created_at: string;
  updated_at: string;
}

export interface SupplementRow {
  id: string;
  phase_id: string;
  name: string;
  dose_en: string;
  dose_ar: string;
  reason_en: string;
  reason_ar: string;
  timing_en: string | null;
  timing_ar: string | null;
  caution_en: string | null;
  caution_ar: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface MealRow {
  id: string;
  phase_id: string;
  diet_style: string;
  breakfast_en: string;
  breakfast_ar: string;
  lunch_en: string;
  lunch_ar: string;
  dinner_en: string;
  dinner_ar: string;
  snack_en: string | null;
  snack_ar: string | null;
  shopping_list_en: string[];
  shopping_list_ar: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all injuries from Supabase
 */
export async function fetchInjuriesFromSupabase(): Promise<InjuryRow[]> {
  try {
    const { data, error } = await supabase
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
    const injuryId = slug.replace(/-/g, '_');
    const { data, error } = await supabase
      .from('injuries')
      .select('*')
      .eq('injury_id_slug', injuryId)
      .single();

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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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

/**
 * Fetch complete injury protocol with all related data
 */
export async function fetchCompleteInjuryProtocol(slug: string): Promise<InjuryProtocol | null> {
  try {
    const injury = await fetchInjuryBySlug(slug);
    if (!injury) return null;

    const phases = await fetchPhasesByInjuryId(injury.id);

    // Fetch supplements and meals for each phase
    const phasesWithData = await Promise.all(
      phases.map(async (phase) => {
        const supplements = await fetchSupplementsByPhaseId(phase.id);
        const mealRows = await fetchMealsByPhaseId(phase.id);

        // Convert supplements
        const supplementsConverted: SupplementProtocol[] = supplements.map((s) => ({
          name: s.name,
          dose: s.dose_en,
          reason: s.reason_en,
          timing: s.timing_en || undefined,
          caution: s.caution_en || undefined,
        }));

        // Convert meals (taking first or default diet type)
        const mealData = mealRows[0];
        const mealsConverted: MealExamples = mealData
          ? {
              breakfast: mealData.breakfast_en,
              lunch: mealData.lunch_en,
              dinner: mealData.dinner_en,
              snack: mealData.snack_en || undefined,
              shoppingList: mealData.shopping_list_en,
            }
          : {
              breakfast: '',
              lunch: '',
              dinner: '',
              shoppingList: [],
            };

        return {
          id: phase.id,
          label: phase.label_en,
          duration: phase.duration_en,
          window: phase.recovery_window as any,
          goals: phase.goals_en,
          nutritionFocus: phase.nutrition_focus_en,
          recommendedFoods: phase.recommended_foods_en,
          avoidFoods: phase.avoid_foods_en,
          supplements: supplementsConverted,
          exercises: phase.exercises_en,
          prohibitedMovements: phase.prohibited_movements_en,
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

    const protocol: InjuryProtocol = {
      id: injury.injury_id_slug,
      name: injury.name_en,
      category: injury.category as any,
      bodyRegion: injury.body_region_en as any,
      commonIn: injury.common_in,
      overview: injury.overview_en,
      rehabSummary: injury.rehab_summary_en,
      redFlags: injury.red_flags,
      relatedCalculators: injury.related_calculators,
      safetyNotes: {
        medications: [],
        supplements: [],
      },
      phases: phasesWithData,
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
export async function createInjury(data: Omit<InjuryRow, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase
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
export async function updateInjury(id: string, data: Partial<InjuryRow>) {
  try {
    const { data: result, error } = await supabase
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
    const { error } = await supabase.from('injuries').delete().eq('id', id);

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
export async function createPhase(data: Omit<PhaseRow, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase
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
export async function updatePhase(id: string, data: Partial<PhaseRow>) {
  try {
    const { data: result, error } = await supabase
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

// ==========================================================================
// SUPPLEMENTS
// ==========================================================================

/**
 * ADMIN: Create supplement
 */
export async function createSupplement(
  data: Omit<SupplementRow, 'id' | 'created_at' | 'updated_at'>
) {
  try {
    const { data: result, error } = await supabase
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
export async function updateSupplement(id: string, data: Partial<SupplementRow>) {
  try {
    const { data: result, error } = await supabase
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
    const { error } = await supabase.from('supplements').delete().eq('id', id);

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
export async function createMeal(data: Omit<MealRow, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: result, error } = await supabase
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
export async function updateMeal(id: string, data: Partial<MealRow>) {
  try {
    const { data: result, error } = await supabase
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
    const { error } = await supabase.from('meal_examples').delete().eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting meal:', err);
    throw err;
  }
}
