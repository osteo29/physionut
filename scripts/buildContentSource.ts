import {config as loadEnv} from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import type {Article} from '../src/services/articles';
import {getArticles as getLocalArticles} from '../src/services/articles';
import type {InjuryProtocol} from '../src/services/injuryDatabase';
import {getAllInjuries as getLocalInjuries} from '../src/services/injuryDatabase';
import type {Database} from '../src/lib/supabaseDatabase';

loadEnv({path: '.env.local'});
loadEnv();

type Language = 'en' | 'ar';

type InjuryRecord = Database['public']['Tables']['injuries']['Row'];
type PhaseRecord = Database['public']['Tables']['injury_phases']['Row'];
type SupplementRecord = Database['public']['Tables']['supplements']['Row'];
type MealRecord = Database['public']['Tables']['meal_examples']['Row'];
type SafetyRecord = Database['public']['Tables']['safety_notes']['Row'];

const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

const supabase =
  supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey) : null;

function mapArticleRecord(record: Database['public']['Tables']['articles']['Row'], index: number): Article {
  return {
    id: index + 1,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    category: record.category,
    date: record.date,
    icon: record.icon,
    image: record.image || undefined,
  };
}

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function mapExercisePlans(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
    .map((plan) => ({
      label:
        typeof plan.label_en === 'string'
          ? plan.label_en
          : typeof plan.exercise_en === 'string'
            ? plan.exercise_en
            : '',
      label_en:
        typeof plan.label_en === 'string'
          ? plan.label_en
          : typeof plan.exercise_en === 'string'
            ? plan.exercise_en
            : '',
      label_ar:
        typeof plan.label_ar === 'string'
          ? plan.label_ar
          : typeof plan.exercise_ar === 'string'
            ? plan.exercise_ar
            : '',
      sets: typeof plan.sets === 'string' ? plan.sets : undefined,
      reps: typeof plan.reps === 'string' ? plan.reps : undefined,
      rest: typeof plan.rest === 'string' ? plan.rest : undefined,
      equipment:
        typeof plan.equipment_en === 'string'
          ? plan.equipment_en
          : typeof plan.equipment === 'string'
            ? plan.equipment
            : undefined,
      equipment_en:
        typeof plan.equipment_en === 'string'
          ? plan.equipment_en
          : typeof plan.equipment === 'string'
            ? plan.equipment
            : undefined,
      equipment_ar:
        typeof plan.equipment_ar === 'string'
          ? plan.equipment_ar
          : typeof plan.equipment === 'string'
            ? plan.equipment
            : undefined,
      alternatives: toStringList(plan.alternatives_en ?? plan.alternatives),
      alternatives_en: toStringList(plan.alternatives_en ?? plan.alternatives),
      alternatives_ar: toStringList(plan.alternatives_ar ?? plan.alternatives),
      cues: toStringList(plan.cues_en ?? plan.cues),
      cues_en: toStringList(plan.cues_en ?? plan.cues),
      cues_ar: toStringList(plan.cues_ar ?? plan.cues),
    }));
}

function mapMeals(meal: MealRecord | undefined) {
  return {
    breakfast: meal?.breakfast_en || '',
    breakfast_en: meal?.breakfast_en || '',
    breakfast_ar: meal?.breakfast_ar || '',
    lunch: meal?.lunch_en || '',
    lunch_en: meal?.lunch_en || '',
    lunch_ar: meal?.lunch_ar || '',
    dinner: meal?.dinner_en || '',
    dinner_en: meal?.dinner_en || '',
    dinner_ar: meal?.dinner_ar || '',
    snack: meal?.snack_en || '',
    snack_en: meal?.snack_en || '',
    snack_ar: meal?.snack_ar || '',
    shoppingList: meal?.shopping_list_en || [],
    shopping_list_en: meal?.shopping_list_en || [],
    shopping_list_ar: meal?.shopping_list_ar || [],
  };
}

function mapSupplements(supplements: SupplementRecord[]) {
  return supplements.map((supplement) => ({
    name: supplement.name,
    dose: supplement.dose_en,
    dose_en: supplement.dose_en,
    dose_ar: supplement.dose_ar,
    reason: supplement.reason_en,
    reason_en: supplement.reason_en,
    reason_ar: supplement.reason_ar,
    timing: supplement.timing_en || undefined,
    timing_en: supplement.timing_en || undefined,
    timing_ar: supplement.timing_ar || undefined,
    caution: supplement.caution_en || undefined,
    caution_en: supplement.caution_en || undefined,
    caution_ar: supplement.caution_ar || undefined,
  }));
}

export async function getBuildArticles(lang: Language): Promise<Article[]> {
  if (!supabase) {
    return getLocalArticles(lang);
  }

  try {
    const {data, error} = await supabase
      .from('articles')
      .select('*')
      .eq('lang', lang)
      .order('date', {ascending: false})
      .order('created_at', {ascending: false});

    if (error) throw error;
    if (!data?.length) return getLocalArticles(lang);
    return data.map(mapArticleRecord);
  } catch {
    return getLocalArticles(lang);
  }
}

export async function getBuildInjuries(): Promise<InjuryProtocol[]> {
  if (!supabase) {
    return getLocalInjuries();
  }

  try {
    const [injuriesResult, phasesResult, supplementsResult, mealsResult, safetyResult] = await Promise.all([
      supabase.from('injuries').select('*').order('name_en'),
      supabase.from('injury_phases').select('*').order('injury_id').order('phase_number'),
      supabase.from('supplements').select('*').order('phase_id').order('order_index'),
      supabase.from('meal_examples').select('*').order('phase_id'),
      supabase.from('safety_notes').select('*').order('injury_id'),
    ]);

    if (injuriesResult.error || phasesResult.error || supplementsResult.error || mealsResult.error || safetyResult.error) {
      throw injuriesResult.error || phasesResult.error || supplementsResult.error || mealsResult.error || safetyResult.error;
    }

    const injuries = injuriesResult.data || [];
    const phases = phasesResult.data || [];
    const supplements = supplementsResult.data || [];
    const meals = mealsResult.data || [];
    const safetyNotes = safetyResult.data || [];

    if (!injuries.length) {
      return getLocalInjuries();
    }

    const phasesByInjury = new Map<string, PhaseRecord[]>();
    for (const phase of phases) {
      const list = phasesByInjury.get(phase.injury_id) || [];
      list.push(phase);
      phasesByInjury.set(phase.injury_id, list);
    }

    const supplementsByPhase = new Map<string, SupplementRecord[]>();
    for (const supplement of supplements) {
      const list = supplementsByPhase.get(supplement.phase_id) || [];
      list.push(supplement);
      supplementsByPhase.set(supplement.phase_id, list);
    }

    const mealsByPhase = new Map<string, MealRecord[]>();
    for (const meal of meals) {
      const list = mealsByPhase.get(meal.phase_id) || [];
      list.push(meal);
      mealsByPhase.set(meal.phase_id, list);
    }

    const safetyByInjury = new Map<string, SafetyRecord>();
    for (const safety of safetyNotes) {
      safetyByInjury.set(safety.injury_id, safety);
    }

    return injuries.map((injury: InjuryRecord) => {
      const injuryPhases = phasesByInjury.get(injury.id) || [];
      const safety = safetyByInjury.get(injury.id);

      return {
        id: injury.injury_id_slug,
        name: injury.name_en,
        name_en: injury.name_en,
        name_ar: injury.name_ar,
        category: injury.category,
        bodyRegion: injury.body_region_en,
        body_region_en: injury.body_region_en,
        body_region_ar: injury.body_region_ar,
        commonIn: injury.common_in || [],
        overview: injury.overview_en || '',
        overview_en: injury.overview_en || '',
        overview_ar: injury.overview_ar || '',
        rehabSummary: injury.rehab_summary_en || '',
        rehab_summary_en: injury.rehab_summary_en || '',
        rehab_summary_ar: injury.rehab_summary_ar || '',
        redFlags: injury.red_flags || [],
        relatedCalculators: injury.related_calculators || [],
        safetyNotes: {
          medications: safety?.medications_en || [],
          supplements: safety?.supplements_en || [],
        },
        contraindications: {
          medications: safety?.contraindication_medications || [],
          supplements: safety?.contraindication_supplements || [],
        },
        phases: injuryPhases.map((phase) => {
          const phaseSupplements = supplementsByPhase.get(phase.id) || [];
          const phaseMeals = mealsByPhase.get(phase.id) || [];
          const primaryMeal = phaseMeals[0];

          return {
            id: phase.id,
            label: phase.label_en,
            label_en: phase.label_en,
            label_ar: phase.label_ar,
            duration: phase.duration_en,
            duration_en: phase.duration_en,
            duration_ar: phase.duration_ar,
            window: phase.recovery_window,
            goals: phase.goals_en || [],
            goals_en: phase.goals_en || [],
            goals_ar: phase.goals_ar || [],
            nutritionFocus: phase.nutrition_focus_en || [],
            nutrition_focus_en: phase.nutrition_focus_en || [],
            nutrition_focus_ar: phase.nutrition_focus_ar || [],
            recommendedFoods: phase.recommended_foods_en || [],
            recommended_foods_en: phase.recommended_foods_en || [],
            recommended_foods_ar: phase.recommended_foods_ar || [],
            avoidFoods: phase.avoid_foods_en || [],
            avoid_foods_en: phase.avoid_foods_en || [],
            avoid_foods_ar: phase.avoid_foods_ar || [],
            supplements: mapSupplements(phaseSupplements),
            exercises: phase.exercises_en || [],
            exercises_en: phase.exercises_en || [],
            exercises_ar: phase.exercises_ar || [],
            prohibitedMovements: phase.prohibited_movements_en || [],
            prohibited_movements_en: phase.prohibited_movements_en || [],
            prohibited_movements_ar: phase.prohibited_movements_ar || [],
            exercisePlans: mapExercisePlans(phase.exercise_plans),
            focus: phase.focus_en || '',
            focus_en: phase.focus_en || '',
            focus_ar: phase.focus_ar || '',
            progressionMarkers: phase.progression_markers_en || [],
            progression_markers_en: phase.progression_markers_en || [],
            progression_markers_ar: phase.progression_markers_ar || [],
            cautions: phase.cautions_en || [],
            cautions_en: phase.cautions_en || [],
            cautions_ar: phase.cautions_ar || [],
            nutritionNotes: phase.nutrition_notes_en || [],
            nutrition_notes_en: phase.nutrition_notes_en || [],
            nutrition_notes_ar: phase.nutrition_notes_ar || [],
            meals: mapMeals(primaryMeal),
          };
        }),
      } as InjuryProtocol;
    });
  } catch {
    return getLocalInjuries();
  }
}


