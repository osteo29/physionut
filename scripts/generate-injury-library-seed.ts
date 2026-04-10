import fs from 'node:fs';
import path from 'node:path';
import {getAllInjuries} from '../src/services/injuryDatabase';
import {injuryPageContentCatalog} from '../src/services/injuryPageContentCatalog';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from '../src/services/injuryLocalization';
import {decodeMojibake} from '../src/services/textEncoding';

function sqlText(value?: string | null) {
  if (value == null) return 'null';
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlArray(values?: string[] | null) {
  if (!values?.length) return `ARRAY[]::text[]`;
  return `ARRAY[${values.map((item) => sqlText(item)).join(', ')}]`;
}

function sqlJson(value: unknown) {
  return `'${JSON.stringify(value ?? []).replace(/'/g, "''")}'::jsonb`;
}

function decode(value: string) {
  return decodeMojibake(value);
}

function fallbackArabicSummary(injuryNameAr: string, bodyRegionAr: string) {
  return `${injuryNameAr} ????? ??? ??? ????? ?????? ????? ????? ??????? ???????? ???????? ?????? ??????? ?????? ?????? ?? ${bodyRegionAr}.`;
}

function translatePhaseLabel(label: string, phaseNumber: number) {
  const lower = label.toLowerCase();
  if (lower.includes('acute') || lower.includes('pain-dominant') || lower.includes('immediate')) return `??????? ${phaseNumber}: ????`;
  if (lower.includes('repair') || lower.includes('reload') || lower.includes('rebuild') || lower.includes('protected')) return `??????? ${phaseNumber}: ??? ???? ????? ??????`;
  if (lower.includes('return') || lower.includes('late')) return `??????? ${phaseNumber}: ???? ??????`;
  if (lower.includes('prehab')) return `??????? ${phaseNumber}: ????? ??? ???????`;
  return `??????? ${phaseNumber}`;
}

const injuries = getAllInjuries();

const seedChunks = injuries.map((injury) => {
  const nameAr = decode(getLocalizedInjuryName(injury.id, injury.name, 'ar'));
  const bodyRegionAr = decode(getLocalizedBodyRegion(injury.bodyRegion, 'ar'));
  const overviewAr = decode(getLocalizedInjuryOverview(nameAr, injury.category, injury.bodyRegion, injury.overview, 'ar'));
  const rehabSummaryAr = fallbackArabicSummary(nameAr, bodyRegionAr);
  const pageContent = injuryPageContentCatalog[injury.id];

  const phaseBlocks = injury.phases.map((phase, index) => {
    const phaseNumber = index + 1;
    const phaseLabelAr = translatePhaseLabel(phase.label, phaseNumber);

    const supplementsSql = [
      `delete from public.supplements where phase_id = v_phase_id;`,
      ...phase.supplements.map(
        (supplement, supplementIndex) => `
  insert into public.supplements (
    phase_id, name, dose_en, dose_ar, reason_en, reason_ar, timing_en, timing_ar, caution_en, caution_ar, order_index
  ) values (
    v_phase_id,
    ${sqlText(decode(supplement.name))},
    ${sqlText(decode(supplement.dose))},
    ${sqlText(decode(supplement.dose))},
    ${sqlText(decode(supplement.reason))},
    ${sqlText(decode(supplement.reason))},
    ${sqlText(supplement.timing ? decode(supplement.timing) : null)},
    ${sqlText(supplement.timing ? decode(supplement.timing) : null)},
    ${sqlText(supplement.caution ? decode(supplement.caution) : null)},
    ${sqlText(supplement.caution ? decode(supplement.caution) : null)},
    ${supplementIndex}
  );`,
      ),
    ].join('\n');

    return `
  insert into public.injury_phases (
    injury_id, phase_number, label_en, label_ar, duration_en, duration_ar, recovery_window,
    goals_en, goals_ar, nutrition_focus_en, nutrition_focus_ar, recommended_foods_en, recommended_foods_ar,
    avoid_foods_en, avoid_foods_ar, focus_en, focus_ar, progression_markers_en, progression_markers_ar,
    cautions_en, cautions_ar, nutrition_notes_en, nutrition_notes_ar, exercise_plans, exercises_en, exercises_ar,
    prohibited_movements_en, prohibited_movements_ar, protein_min_per_kg, protein_max_per_kg,
    hydration_ml_per_kg, omega3_grams, creatine_grams, collagen_min_per_kg, collagen_max_per_kg, vitamin_c_mg, calcium_mg
  ) values (
    v_injury_id,
    ${phaseNumber},
    ${sqlText(decode(phase.label))},
    ${sqlText(phaseLabelAr)},
    ${sqlText(decode(phase.duration))},
    ${sqlText(decode(phase.duration))},
    ${sqlText(phase.window)},
    ${sqlArray(phase.goals.map(decode))},
    ARRAY[]::text[],
    ${sqlArray(phase.nutritionFocus.map(decode))},
    ARRAY[]::text[],
    ${sqlArray(phase.recommendedFoods.map(decode))},
    ARRAY[]::text[],
    ${sqlArray(phase.avoidFoods.map(decode))},
    ARRAY[]::text[],
    ${sqlText(phase.focus ? decode(phase.focus) : null)},
    ${sqlText(phase.focus ? decode(phase.focus) : null)},
    ${sqlArray(phase.progressionMarkers?.map(decode) || [])},
    ARRAY[]::text[],
    ${sqlArray(phase.cautions?.map(decode) || [])},
    ARRAY[]::text[],
    ${sqlArray(phase.nutritionNotes?.map(decode) || [])},
    ARRAY[]::text[],
    ${sqlJson(phase.exercisePlans ?? [])},
    ${sqlArray(phase.exercises.map(decode))},
    ARRAY[]::text[],
    ${sqlArray(phase.prohibitedMovements.map(decode))},
    ARRAY[]::text[],
    ${phase.proteinPerKg?.min ?? 'null'},
    ${phase.proteinPerKg?.max ?? 'null'},
    ${phase.hydrationMlPerKg ?? 'null'},
    ${phase.omega3Grams ?? 'null'},
    ${phase.creatineGrams ?? 'null'},
    ${phase.collagenPerKg?.min ?? 'null'},
    ${phase.collagenPerKg?.max ?? 'null'},
    ${phase.vitaminCMg ?? 'null'},
    ${phase.calciumMg ?? 'null'}
  )
  on conflict (injury_id, phase_number) do update set
    label_en = excluded.label_en,
    label_ar = excluded.label_ar,
    duration_en = excluded.duration_en,
    duration_ar = excluded.duration_ar,
    recovery_window = excluded.recovery_window,
    goals_en = excluded.goals_en,
    nutrition_focus_en = excluded.nutrition_focus_en,
    recommended_foods_en = excluded.recommended_foods_en,
    avoid_foods_en = excluded.avoid_foods_en,
    focus_en = excluded.focus_en,
    progression_markers_en = excluded.progression_markers_en,
    cautions_en = excluded.cautions_en,
    nutrition_notes_en = excluded.nutrition_notes_en,
    exercise_plans = excluded.exercise_plans,
    exercises_en = excluded.exercises_en,
    prohibited_movements_en = excluded.prohibited_movements_en,
    protein_min_per_kg = excluded.protein_min_per_kg,
    protein_max_per_kg = excluded.protein_max_per_kg,
    hydration_ml_per_kg = excluded.hydration_ml_per_kg,
    omega3_grams = excluded.omega3_grams,
    creatine_grams = excluded.creatine_grams,
    collagen_min_per_kg = excluded.collagen_min_per_kg,
    collagen_max_per_kg = excluded.collagen_max_per_kg,
    vitamin_c_mg = excluded.vitamin_c_mg,
    calcium_mg = excluded.calcium_mg,
    updated_at = now()
  returning id into v_phase_id;

  insert into public.meal_examples (
    phase_id, diet_style, breakfast_en, breakfast_ar, lunch_en, lunch_ar, dinner_en, dinner_ar,
    snack_en, snack_ar, shopping_list_en, shopping_list_ar
  ) values (
    v_phase_id,
    'omnivore',
    ${sqlText(decode(phase.meals.breakfast))},
    ${sqlText(decode(phase.meals.breakfast))},
    ${sqlText(decode(phase.meals.lunch))},
    ${sqlText(decode(phase.meals.lunch))},
    ${sqlText(decode(phase.meals.dinner))},
    ${sqlText(decode(phase.meals.dinner))},
    ${sqlText(phase.meals.snack ? decode(phase.meals.snack) : null)},
    ${sqlText(phase.meals.snack ? decode(phase.meals.snack) : null)},
    ${sqlArray(phase.meals.shoppingList.map(decode))},
    ARRAY[]::text[]
  )
  on conflict (phase_id, diet_style) do update set
    breakfast_en = excluded.breakfast_en,
    breakfast_ar = excluded.breakfast_ar,
    lunch_en = excluded.lunch_en,
    lunch_ar = excluded.lunch_ar,
    dinner_en = excluded.dinner_en,
    dinner_ar = excluded.dinner_ar,
    snack_en = excluded.snack_en,
    snack_ar = excluded.snack_ar,
    shopping_list_en = excluded.shopping_list_en,
    updated_at = now();

  ${supplementsSql}`;
  });

  const pageContentSql = pageContent
    ? `
  insert into public.injury_page_content (
    injury_id, intro_en, intro_ar, symptoms_en, symptoms_ar, rehab_notes_en, rehab_notes_ar,
    nutrition_notes_en, nutrition_notes_ar, faq_items
  ) values (
    v_injury_id,
    ${sqlText(decode(pageContent.intro || injury.overview))},
    ${sqlText(overviewAr)},
    ${sqlArray((pageContent.symptoms || []).map(decode))},
    ARRAY[]::text[],
    ${sqlArray((pageContent.rehabNotes || []).map(decode))},
    ARRAY[]::text[],
    ${sqlArray((pageContent.nutritionNotes || []).map(decode))},
    ARRAY[]::text[],
    ${sqlJson(
      (pageContent.faq || []).map((item) => ({
        q_en: decode(item.q),
        a_en: decode(item.a),
        q_ar: decode(item.q),
        a_ar: decode(item.a),
      })),
    )}
  )
  on conflict (injury_id) do update set
    intro_en = excluded.intro_en,
    intro_ar = excluded.intro_ar,
    symptoms_en = excluded.symptoms_en,
    rehab_notes_en = excluded.rehab_notes_en,
    nutrition_notes_en = excluded.nutrition_notes_en,
    faq_items = excluded.faq_items,
    updated_at = now();`
    : '';

  return `
do $seed$
declare
  v_injury_id uuid;
  v_phase_id uuid;
begin
  insert into public.injuries (
    injury_id_slug, name_en, name_ar, category, body_region_en, body_region_ar,
    overview_en, overview_ar, rehab_summary_en, rehab_summary_ar,
    common_in, red_flags, related_calculators
  ) values (
    ${sqlText(injury.id)},
    ${sqlText(decode(injury.name))},
    ${sqlText(nameAr)},
    ${sqlText(decode(injury.category))},
    ${sqlText(decode(injury.bodyRegion))},
    ${sqlText(bodyRegionAr)},
    ${sqlText(decode(injury.overview))},
    ${sqlText(overviewAr)},
    ${sqlText(decode(injury.rehabSummary))},
    ${sqlText(rehabSummaryAr)},
    ${sqlArray(injury.commonIn.map(decode))},
    ${sqlArray(injury.redFlags.map(decode))},
    ${sqlArray(injury.relatedCalculators.map(decode))}
  )
  on conflict (injury_id_slug) do update set
    name_en = excluded.name_en,
    name_ar = excluded.name_ar,
    category = excluded.category,
    body_region_en = excluded.body_region_en,
    body_region_ar = excluded.body_region_ar,
    overview_en = excluded.overview_en,
    overview_ar = excluded.overview_ar,
    rehab_summary_en = excluded.rehab_summary_en,
    rehab_summary_ar = excluded.rehab_summary_ar,
    common_in = excluded.common_in,
    red_flags = excluded.red_flags,
    related_calculators = excluded.related_calculators,
    updated_at = now()
  returning id into v_injury_id;

  insert into public.safety_notes (
    injury_id, medications_en, medications_ar, supplements_en, supplements_ar,
    contraindication_medications, contraindication_supplements
  ) values (
    v_injury_id,
    ${sqlArray(injury.safetyNotes.medications.map(decode))},
    ARRAY[]::text[],
    ${sqlArray(injury.safetyNotes.supplements.map(decode))},
    ARRAY[]::text[],
    ${sqlArray((injury.contraindications?.medications || []).map(decode))},
    ${sqlArray((injury.contraindications?.supplements || []).map(decode))}
  )
  on conflict (injury_id) do update set
    medications_en = excluded.medications_en,
    supplements_en = excluded.supplements_en,
    contraindication_medications = excluded.contraindication_medications,
    contraindication_supplements = excluded.contraindication_supplements,
    updated_at = now();

${phaseBlocks.join('\n')}
${pageContentSql}
end
$seed$;`;
});

const header = `-- Auto-generated injury library seed\n-- Generated from src/services/injuryDatabase.ts and injuryPageContentCatalog.ts\n-- Injury count: ${injuries.length}\n`;
const output = `${header}\n${seedChunks.join('\n\n')}\n`;

const outputPath = path.resolve(process.cwd(), 'supabase', 'seed_injury_library.sql');
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`Generated ${outputPath} with ${injuries.length} injuries.`);
