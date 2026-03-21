/**
 * Data Migration Helper
 * استيراد البيانات الحالية (hardcoded) من injuryProtocolCatalog إلى Supabase
 * 
 * للاستخدام:
 * 1. اذهب إلى Admin Panel (/admin/injuries)
 * 2. اضغط "Import Legacy Data" button
 * أو قم بتشغيل هذا الـ script في console
 */

import { generatedInjuryProtocols } from '../services/injuryProtocolCatalog';
import {
  createInjury,
  createPhase,
  createSupplement,
  createMeal,
} from '../services/injurySupabaseService';

export async function migrateAllInjuriesToSupabase() {
  console.log('🔄 Starting data migration...');
  let successCount = 0;
  let errorCount = 0;

  for (const protocol of generatedInjuryProtocols) {
    try {
      console.log(`📥 Migrating: ${protocol.name}...`);

      // 1. Create injury
      const injuryData = await createInjury({
        injury_id_slug: protocol.id,
        name_en: protocol.name,
        name_ar: protocol.name, // استخدام الاسم الإنجليزي مؤقتاً - يمكن تحديثه لاحقاً
        category: protocol.category,
        body_region_en: protocol.bodyRegion,
        body_region_ar: getLocalizedBodyRegion(protocol.bodyRegion, 'ar'),
        overview_en: protocol.overview,
        overview_ar: '', // سيتم ملؤه لاحقاً
        rehab_summary_en: protocol.rehabSummary,
        rehab_summary_ar: '', // سيتم ملؤه لاحقاً
        common_in: protocol.commonIn || [],
        red_flags: protocol.redFlags || [],
        related_calculators: protocol.relatedCalculators || [],
      });

      // 2. Create phases
      for (let i = 0; i < protocol.phases.length; i++) {
        const phaseData = protocol.phases[i];

        const phase = await createPhase({
          injury_id: injuryData.id,
          phase_number: i + 1,
          label_en: phaseData.label,
          label_ar: '', // سيتم ملؤه لاحقاً
          duration_en: phaseData.duration,
          duration_ar: '', // سيتم ملؤه لاحقاً
          recovery_window: phaseData.window,
          goals_en: phaseData.goals || [],
          goals_ar: [], // سيتم ملؤه لاحقاً
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

        // 3. Create supplements
        if (phaseData.supplements && phaseData.supplements.length > 0) {
          for (let j = 0; j < phaseData.supplements.length; j++) {
            const sup = phaseData.supplements[j];
            await createSupplement({
              phase_id: phase.id,
              name: sup.name,
              dose_en: sup.dose,
              dose_ar: '', // سيتم ملؤه لاحقاً
              reason_en: sup.reason,
              reason_ar: '', // سيتم ملؤه لاحقاً
              timing_en: sup.timing,
              timing_ar: '',
              caution_en: sup.caution,
              caution_ar: '',
              order_index: j,
            });
          }
        }

        // 4. Create meal examples
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
      console.log(`✅ ${protocol.name}`);
    } catch (error) {
      errorCount++;
      console.error(`❌ Failed to migrate ${protocol.name}:`, error);
    }
  }

  console.log(`
========================================
🎉 Migration Complete!
========================================
✅ Successful: ${successCount}
❌ Failed: ${errorCount}
📊 Total injuries migrated: ${successCount}

Next steps:
1. Go to Admin Panel (/admin/injuries)
2. Review the imported data
3. Add Arabic translations
4. Test all pages
========================================
  `);

  return { successCount, errorCount };
}

// ============================================================================
// Helper functions (copy from injuryLocalization.ts if needed)
// ============================================================================

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

// ============================================================================
// Usage Example
// ============================================================================

/*
 * في ملف Admin Panel أو Button:
 * 
 * import { migrateAllInjuriesToSupabase } from '../utils/dataMigration';
 * 
 * function AdminPanel() {
 *   const handleMigrate = async () => {
 *     const result = await migrateAllInjuriesToSupabase();
 *     console.log('Migration result:', result);
 *   };
 * 
 *   return (
 *     <button onClick={handleMigrate} className="bg-blue-600 text-white px-4 py-2 rounded">
 *       📥 Migrate Data to Supabase
 *     </button>
 *   );
 * }
 */
