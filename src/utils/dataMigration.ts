/**
 * Data Migration Helper
 * Import the hardcoded injury catalog into Supabase.
 */

import { generatedInjuryProtocols } from '../services/injuryProtocolCatalog';
import {
  createInjury,
  createMeal,
  createPhase,
  createSupplement,
} from '../services/injurySupabaseService';

export type MigrationErrorDetail = {
  injuryId: string;
  injuryName: string;
  message: string;
};

export type MigrationResult = {
  successCount: number;
  errorCount: number;
  totalCount: number;
  errors: MigrationErrorDetail[];
};

function getLocalizedBodyRegion(region: string, lang: string): string {
  const bodyRegionMap: Record<string, Record<string, string>> = {
    en: {
      Knee: 'Knee',
      Ankle: 'Ankle',
      Shoulder: 'Shoulder',
      Hip: 'Hip',
      Back: 'Back',
      Foot: 'Foot',
      Elbow: 'Elbow',
      Wrist: 'Wrist',
    },
    ar: {
      Knee: 'الركبة',
      Ankle: 'الكاحل',
      Shoulder: 'الكتف',
      Hip: 'الورك',
      Back: 'الظهر',
      Foot: 'القدم',
      Elbow: 'الكوع',
      Wrist: 'المعصم',
    },
  };

  return bodyRegionMap[lang]?.[region] || region;
}

function getMigrationErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = error.message;
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return 'Unknown migration error';
}

export async function migrateAllInjuriesToSupabase(): Promise<MigrationResult> {
  console.log('Starting data migration...');

  let successCount = 0;
  let errorCount = 0;
  const errors: MigrationErrorDetail[] = [];

  for (const protocol of generatedInjuryProtocols) {
    try {
      console.log(`Migrating: ${protocol.name}...`);

      const injuryData = await createInjury({
        injury_id_slug: protocol.id,
        name_en: protocol.name,
        name_ar: protocol.name,
        category: protocol.category,
        body_region_en: protocol.bodyRegion,
        body_region_ar: getLocalizedBodyRegion(protocol.bodyRegion, 'ar'),
        overview_en: protocol.overview,
        overview_ar: '',
        rehab_summary_en: protocol.rehabSummary,
        rehab_summary_ar: '',
        common_in: protocol.commonIn || [],
        red_flags: protocol.redFlags || [],
        related_calculators: protocol.relatedCalculators || [],
      });

      for (let i = 0; i < protocol.phases.length; i++) {
        const phaseData = protocol.phases[i];

        const phase = await createPhase({
          injury_id: injuryData.id,
          phase_number: i + 1,
          label_en: phaseData.label,
          label_ar: '',
          duration_en: phaseData.duration,
          duration_ar: '',
          recovery_window: phaseData.window,
          goals_en: phaseData.goals || [],
          goals_ar: [],
          nutrition_focus_en: phaseData.nutritionFocus || [],
          nutrition_focus_ar: [],
          recommended_foods_en: phaseData.recommendedFoods || [],
          recommended_foods_ar: [],
          avoid_foods_en: phaseData.avoidFoods || [],
          avoid_foods_ar: [],
          exercises_en: phaseData.exercises || [],
          exercises_ar: [],
          prohibited_movements_en: phaseData.prohibitedMovements || [],
          prohibited_movements_ar: [],
          protein_min_per_kg: phaseData.proteinPerKg?.min || null,
          protein_max_per_kg: phaseData.proteinPerKg?.max || null,
          hydration_ml_per_kg: phaseData.hydrationMlPerKg || null,
          omega3_grams: phaseData.omega3Grams || null,
          creatine_grams: phaseData.creatineGrams || null,
          collagen_min_per_kg: phaseData.collagenPerKg?.min || null,
          collagen_max_per_kg: phaseData.collagenPerKg?.max || null,
          vitamin_c_mg: phaseData.vitaminCMg || null,
          calcium_mg: phaseData.calciumMg || null,
        });

        if (phaseData.supplements?.length) {
          for (let j = 0; j < phaseData.supplements.length; j++) {
            const supplement = phaseData.supplements[j];
            await createSupplement({
              phase_id: phase.id,
              name: supplement.name,
              dose_en: supplement.dose,
              dose_ar: '',
              reason_en: supplement.reason,
              reason_ar: '',
              timing_en: supplement.timing,
              timing_ar: '',
              caution_en: supplement.caution,
              caution_ar: '',
              order_index: j,
            });
          }
        }

        if (phaseData.meals) {
          await createMeal({
            phase_id: phase.id,
            diet_style: 'omnivore',
            breakfast_en: phaseData.meals.breakfast || '',
            breakfast_ar: '',
            lunch_en: phaseData.meals.lunch || '',
            lunch_ar: '',
            dinner_en: phaseData.meals.dinner || '',
            dinner_ar: '',
            snack_en: phaseData.meals.snack,
            snack_ar: '',
            shopping_list_en: phaseData.meals.shoppingList || [],
            shopping_list_ar: [],
          });
        }
      }

      successCount++;
      console.log(`Done: ${protocol.name}`);
    } catch (error) {
      errorCount++;
      const message = getMigrationErrorMessage(error);
      errors.push({
        injuryId: protocol.id,
        injuryName: protocol.name,
        message,
      });
      console.error(`Failed to migrate ${protocol.name}:`, error);
    }
  }

  console.log(`
========================================
Migration Complete
========================================
Successful: ${successCount}
Failed: ${errorCount}
Total attempted: ${generatedInjuryProtocols.length}
========================================
  `);

  return {
    successCount,
    errorCount,
    totalCount: generatedInjuryProtocols.length,
    errors,
  };
}
