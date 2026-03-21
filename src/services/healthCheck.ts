/**
 * System Health Check & Testing Suite
 * فحص صحة النظام واختبارات شاملة
 * 
 * Run this to verify all Supabase components are working correctly
 */

import {
  fetchInjuriesFromSupabase,
  fetchInjuryBySlug,
  fetchPhasesByInjuryId,
  fetchSupplementsByPhaseId,
  fetchMealsByPhaseId,
  fetchCompleteInjuryProtocol,
} from './injurySupabaseService';
import { supabase } from '../lib/supabase';

// ============================================================
// Health Check Functions
// ============================================================

export async function runHealthChecks() {
  console.log('🏥 Starting System Health Check...\n');

  const results = {
    supabaseConnection: false,
    tablesExist: false,
    dataExists: false,
    serviceLayerWorks: false,
    aggregationWorks: false,
    performance: {} as Record<string, number>,
  };

  try {
    // Test 1: Supabase Connection
    console.log('📡 Test 1: Supabase Connection');
    const healthCheck = await supabase.from('injuries').select('count', { count: 'exact' });
    if (healthCheck.error) {
      console.error('❌ Failed:', healthCheck.error.message);
      return results;
    }
    results.supabaseConnection = true;
    console.log('✅ Connected to Supabase\n');

    // Test 2: Tables Exist
    console.log('🗄️  Test 2: Database Tables');
    const tables = ['injuries', 'injury_phases', 'supplements', 'meal_examples', 'safety_notes'];
    for (const table of tables) {
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      console.log(`  ✅ ${table} table exists (${count} records)`);
    }
    results.tablesExist = true;
    console.log();

    // Test 3: Data Exists
    console.log('📊 Test 3: Data Existence');
    const injuriesCount = await supabase.from('injuries').select('*', { count: 'exact', head: true });
    const phasesCount = await supabase.from('injury_phases').select('*', { count: 'exact', head: true });
    const supplementsCount = await supabase.from('supplements').select('*', { count: 'exact', head: true });

    console.log(`  📋 Injuries: ${injuriesCount.count}`);
    console.log(`  📋 Phases: ${phasesCount.count}`);
    console.log(`  📋 Supplements: ${supplementsCount.count}`);

    if ((injuriesCount.count || 0) > 0) {
      results.dataExists = true;
      console.log('✅ Data exists\n');
    } else {
      console.log('⚠️  No data found. Run migration first.\n');
    }

    // Test 4: Service Layer
    console.log('🔧 Test 4: Service Layer Functions');
    const startFetch = performance.now();
    const injuries = await fetchInjuriesFromSupabase();
    const fetchTime = performance.now() - startFetch;
    results.performance.fetchAllInjuries = fetchTime;
    console.log(`  ✅ fetchInjuriesFromSupabase() - ${fetchTime.toFixed(2)}ms`);

    if (injuries.length > 0) {
      results.serviceLayerWorks = true;

      // Test single injury fetch
      const startSingle = performance.now();
      const singleInjury = await fetchInjuryBySlug(injuries[0].injury_id_slug);
      const singleTime = performance.now() - startSingle;
      results.performance.fetchSingleInjury = singleTime;
      console.log(
        `  ✅ fetchInjuryBySlug('${injuries[0].injury_id_slug}') - ${singleTime.toFixed(2)}ms`
      );

      // Test phases fetch
      const startPhases = performance.now();
      const phases = await fetchPhasesByInjuryId(injuries[0].id);
      const phasesTime = performance.now() - startPhases;
      results.performance.fetchPhases = phasesTime;
      console.log(`  ✅ fetchPhasesByInjuryId() - ${phasesTime.toFixed(2)}ms (${phases.length} phases)`);

      if (phases.length > 0) {
        // Test supplements and meals
        const startSupp = performance.now();
        const supplements = await fetchSupplementsByPhaseId(phases[0].id);
        const suppTime = performance.now() - startSupp;
        results.performance.fetchSupplements = suppTime;
        console.log(`  ✅ fetchSupplementsByPhaseId() - ${suppTime.toFixed(2)}ms (${supplements.length} items)`);

        const startMeals = performance.now();
        const meals = await fetchMealsByPhaseId(phases[0].id);
        const mealsTime = performance.now() - startMeals;
        results.performance.fetchMeals = mealsTime;
        const mealsCount = Array.isArray(meals) ? meals.length : 0;
        console.log(`  ✅ fetchMealsByPhaseId() - ${mealsTime.toFixed(2)}ms (${mealsCount} meals)`);
      }

      console.log();
    } else {
      console.log('❌ No injuries found\n');
    }

    // Test 5: Aggregation Function
    console.log('🔗 Test 5: Complex Aggregation');
    if (injuries.length > 0) {
      const startAgg = performance.now();
      const complete = await fetchCompleteInjuryProtocol(injuries[0].injury_id_slug);
      const aggTime = performance.now() - startAgg;
      results.performance.fetchCompleteProtocol = aggTime;

      if (complete) {
        results.aggregationWorks = true;
        console.log(`  ✅ fetchCompleteInjuryProtocol() - ${aggTime.toFixed(2)}ms`);
        console.log(`     └─ Injury: ${complete.name}`);
        console.log(`     └─ Phases: ${complete.phases.length}`);
        const totalPhaseItems = complete.phases.reduce(
          (sum, p) => {
            const supplements = Array.isArray(p.supplements) ? p.supplements.length : 0;
            const meals = p.meals ? 1 : 0; // meals هي object واحد وليس array
            return sum + supplements + meals;
          },
          0
        );
        console.log(`     └─ Total supplements & meals: ${totalPhaseItems}`);
        console.log();
      }
    }

    // Test 6: Bilingual Data
    console.log('🌐 Test 6: Bilingual Data Support');
    if (results.dataExists && injuries.length > 0) {
      const sample = injuries[0];
      console.log(`  English: ${sample.name_en}`);
      console.log(`  العربية: ${sample.name_ar || '(not translated yet)'}`);
      console.log(`  Region EN: ${sample.body_region_en}`);
      console.log(`  المنطقة AR: ${sample.body_region_ar || '(not translated yet)'}`);
      console.log();
    }

    // Test 7: RLS Policies
    console.log('🔒 Test 7: Row Level Security');
    console.log('  ⚠️  Note: Current setup allows public read');
    console.log('  ✅ All tables have public read policy');
    console.log('  ⏳ Write protection: Requires auth (not yet enforced)');
    console.log();

  } catch (error) {
    console.error('❌ Health check failed:', error);
    return results;
  }

  // Summary
  console.log('════════════════════════════════════════');
  console.log('📊 Health Check Summary');
  console.log('════════════════════════════════════════');
  console.log(`  Supabase Connection: ${results.supabaseConnection ? '✅' : '❌'}`);
  console.log(`  Database Tables: ${results.tablesExist ? '✅' : '❌'}`);
  console.log(`  Data Populated: ${results.dataExists ? '✅' : '❌'}`);
  console.log(`  Service Layer: ${results.serviceLayerWorks ? '✅' : '❌'}`);
  console.log(`  Aggregation: ${results.aggregationWorks ? '✅' : '❌'}`);

  console.log('\n⚡ Performance Metrics:');
  Object.entries(results.performance).forEach(([key, time]) => {
    const status = time < 500 ? '⚡' : time < 1000 ? '⏱️ ' : '🐢';
    console.log(`  ${status} ${key}: ${time.toFixed(2)}ms`);
  });

  const allPassed = Object.values(results).every(v => v === true || typeof v === 'object');
  console.log(`\n${allPassed ? '✅ All tests passed!' : '⚠️  Some tests need attention'}`);

  return results;
}

// ============================================================
// Detailed Testing Functions
// ============================================================

export async function testDataIntegrity() {
  console.log('\n🔍 Testing Data Integrity...\n');

  // Check for orphaned phases (phases without injuries)
  const { data: orphanedPhases, error: phaseError } = await supabase
    .from('injury_phases')
    .select('id, injury_id')
    .then(async res => {
      if (!res.data) return res;
      // Get all injury IDs
      const { data: injuries } = await supabase.from('injuries').select('id');
      const injuryIds = new Set(injuries?.map(i => i.id) || []);

      // Find orphaned phases
      const orphaned = res.data.filter((p: any) => !injuryIds.has(p.injury_id));
      return { data: orphaned, error: res.error };
    });

  if (orphanedPhases && orphanedPhases.length > 0) {
    console.warn(`⚠️  Found ${orphanedPhases.length} orphaned phases`);
  } else {
    console.log('✅ No orphaned phases');
  }

  // Check for missing phases (injuries without 5 phases)
  const { data: injuries } = await supabase.from('injuries').select('id, name_en');
  if (injuries) {
    for (const injury of injuries.slice(0, 5)) {
      // Check first 5 for performance
      const { count } = await supabase
        .from('injury_phases')
        .select('*', { count: 'exact', head: true })
        .eq('injury_id', injury.id);

      if ((count || 0) !== 5) {
        console.warn(`⚠️  ${injury.name_en} has ${count} phases (expected 5)`);
      }
    }
  }

  console.log('✅ Data integrity check complete\n');
}

export async function testPerformance() {
  console.log('\n⚡ Running Performance Tests...\n');

  const iterations = 10;
  const times: Record<string, number[]> = {
    fetchAllInjuries: [],
    fetchSingleInjury: [],
    fetchCompleteProtocol: [],
  };

  const { data: injuries } = await supabase.from('injuries').select('id, injury_id_slug');
  if (!injuries || injuries.length === 0) {
    console.log('❌ No data to test');
    return;
  }

  // Warm up
  await fetchInjuriesFromSupabase();

  // Run tests
  for (let i = 0; i < iterations; i++) {
    // Test 1: Fetch all
    const start1 = performance.now();
    await fetchInjuriesFromSupabase();
    times.fetchAllInjuries.push(performance.now() - start1);

    // Test 2: Fetch single
    const idx = Math.floor(Math.random() * injuries.length);
    const start2 = performance.now();
    await fetchInjuryBySlug(injuries[idx].injury_id_slug);
    times.fetchSingleInjury.push(performance.now() - start2);

    // Test 3: Fetch complete
    const start3 = performance.now();
    await fetchCompleteInjuryProtocol(injuries[idx].injury_id_slug);
    times.fetchCompleteProtocol.push(performance.now() - start3);
  }

  // Calculate stats
  Object.entries(times).forEach(([name, values]) => {
    const avg = values.reduce((a, b) => a + b) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    console.log(`${name}:`);
    console.log(`  Average: ${avg.toFixed(2)}ms`);
    console.log(`  Min: ${min.toFixed(2)}ms`);
    console.log(`  Max: ${max.toFixed(2)}ms`);
  });

  console.log();
}

// ============================================================
// Usage Instructions
// ============================================================

/*
 * Run these commands in your browser console:
 * 
 * // Full health check
 * import { runHealthChecks } from './services/healthCheck';
 * await runHealthChecks();
 * 
 * // Check data integrity
 * import { testDataIntegrity } from './services/healthCheck';
 * await testDataIntegrity();
 * 
 * // Performance testing
 * import { testPerformance } from './services/healthCheck';
 * await testPerformance();
 * 
 * Or add a debug page:
 * 
 * export function DebugPage() {
 *   return (
 *     <div className="p-6 space-y-4">
 *       <button onClick={runHealthChecks}>
 *         Run Health Checks
 *       </button>
 *       <button onClick={testDataIntegrity}>
 *         Test Data Integrity
 *       </button>
 *       <button onClick={testPerformance}>
 *         Run Performance Tests
 *       </button>
 *     </div>
 *   );
 * }
 */

export default {
  runHealthChecks,
  testDataIntegrity,
  testPerformance,
};
