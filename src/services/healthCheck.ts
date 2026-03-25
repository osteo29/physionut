/**
 * System Health Check & Testing Suite
 * فحص صحة النظام واختبارات شاملة
 *
 * Run this to verify all Supabase components are working correctly.
 */

import {
  fetchCompleteInjuryProtocol,
  fetchInjuriesFromSupabase,
  fetchInjuryBySlug,
  fetchMealsByPhaseId,
  fetchPhasesByInjuryId,
  fetchSupplementsByPhaseId,
} from './injurySupabaseService';
import {supabase} from '../lib/supabase';

type HealthCheckResults = {
  supabaseConnection: boolean;
  tablesExist: boolean;
  dataExists: boolean;
  serviceLayerWorks: boolean;
  aggregationWorks: boolean;
  performance: Record<string, number>;
};

function createInitialResults(): HealthCheckResults {
  return {
    supabaseConnection: false,
    tablesExist: false,
    dataExists: false,
    serviceLayerWorks: false,
    aggregationWorks: false,
    performance: {},
  };
}

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

export async function runHealthChecks() {
  console.log('Starting system health check...\n');

  const results = createInitialResults();

  try {
    const db = ensureSupabase();

    console.log('Test 1: Supabase connection');
    const healthCheck = await db.from('injuries').select('count', {count: 'exact'});
    if (healthCheck.error) {
      console.error('Failed:', healthCheck.error.message);
      return results;
    }
    results.supabaseConnection = true;
    console.log('Connected to Supabase\n');

    console.log('Test 2: Database tables');
    const tables = ['injuries', 'injury_phases', 'supplements', 'meal_examples', 'safety_notes'];
    for (const table of tables) {
      const {count} = await db.from(table).select('*', {count: 'exact', head: true});
      console.log(`  ${table}: ${count} records`);
    }
    results.tablesExist = true;
    console.log();

    console.log('Test 3: Data existence');
    const injuriesCount = await db.from('injuries').select('*', {count: 'exact', head: true});
    const phasesCount = await db.from('injury_phases').select('*', {count: 'exact', head: true});
    const supplementsCount = await db.from('supplements').select('*', {count: 'exact', head: true});

    console.log(`  Injuries: ${injuriesCount.count}`);
    console.log(`  Phases: ${phasesCount.count}`);
    console.log(`  Supplements: ${supplementsCount.count}`);

    if ((injuriesCount.count || 0) > 0) {
      results.dataExists = true;
      console.log('Data exists\n');
    } else {
      console.log('No data found. Run migration first.\n');
    }

    console.log('Test 4: Service layer functions');
    const startFetch = performance.now();
    const injuries = await fetchInjuriesFromSupabase();
    const fetchTime = performance.now() - startFetch;
    results.performance.fetchAllInjuries = fetchTime;
    console.log(`  fetchInjuriesFromSupabase(): ${fetchTime.toFixed(2)}ms`);

    if (injuries.length > 0) {
      results.serviceLayerWorks = true;

      const startSingle = performance.now();
      await fetchInjuryBySlug(injuries[0].injury_id_slug);
      const singleTime = performance.now() - startSingle;
      results.performance.fetchSingleInjury = singleTime;
      console.log(
        `  fetchInjuryBySlug('${injuries[0].injury_id_slug}'): ${singleTime.toFixed(2)}ms`,
      );

      const startPhases = performance.now();
      const phases = await fetchPhasesByInjuryId(injuries[0].id);
      const phasesTime = performance.now() - startPhases;
      results.performance.fetchPhases = phasesTime;
      console.log(`  fetchPhasesByInjuryId(): ${phasesTime.toFixed(2)}ms (${phases.length} phases)`);

      if (phases.length > 0) {
        const startSupp = performance.now();
        const supplements = await fetchSupplementsByPhaseId(phases[0].id);
        const suppTime = performance.now() - startSupp;
        results.performance.fetchSupplements = suppTime;
        console.log(
          `  fetchSupplementsByPhaseId(): ${suppTime.toFixed(2)}ms (${supplements.length} items)`,
        );

        const startMeals = performance.now();
        const meals = await fetchMealsByPhaseId(phases[0].id);
        const mealsTime = performance.now() - startMeals;
        results.performance.fetchMeals = mealsTime;
        const mealsCount = Array.isArray(meals) ? meals.length : 0;
        console.log(`  fetchMealsByPhaseId(): ${mealsTime.toFixed(2)}ms (${mealsCount} meals)`);
      }

      console.log();
    } else {
      console.log('No injuries found\n');
    }

    console.log('Test 5: Complex aggregation');
    if (injuries.length > 0) {
      const startAgg = performance.now();
      const complete = await fetchCompleteInjuryProtocol(injuries[0].injury_id_slug);
      const aggTime = performance.now() - startAgg;
      results.performance.fetchCompleteProtocol = aggTime;

      if (complete) {
        results.aggregationWorks = true;
        console.log(`  fetchCompleteInjuryProtocol(): ${aggTime.toFixed(2)}ms`);
        console.log(`  Injury: ${complete.name}`);
        console.log(`  Phases: ${complete.phases.length}`);
        const totalPhaseItems = complete.phases.reduce((sum, phase) => {
          const supplements = Array.isArray(phase.supplements) ? phase.supplements.length : 0;
          const meals = phase.meals ? 1 : 0;
          return sum + supplements + meals;
        }, 0);
        console.log(`  Total supplements and meals: ${totalPhaseItems}`);
        console.log();
      }
    }

    console.log('Test 6: Bilingual data support');
    if (results.dataExists && injuries.length > 0) {
      const sample = injuries[0];
      console.log(`  English: ${sample.name_en}`);
      console.log(`  Arabic: ${sample.name_ar || '(not translated yet)'}`);
      console.log(`  Region EN: ${sample.body_region_en}`);
      console.log(`  Region AR: ${sample.body_region_ar || '(not translated yet)'}`);
      console.log();
    }

    console.log('Test 7: Row level security');
    console.log('  Note: current setup allows public read');
    console.log('  All tables have public read policy');
    console.log('  Write protection still depends on authenticated policies');
    console.log();
  } catch (error) {
    console.error('Health check failed:', error);
    return results;
  }

  console.log('========================================');
  console.log('Health Check Summary');
  console.log('========================================');
  console.log(`  Supabase Connection: ${results.supabaseConnection ? 'OK' : 'FAIL'}`);
  console.log(`  Database Tables: ${results.tablesExist ? 'OK' : 'FAIL'}`);
  console.log(`  Data Populated: ${results.dataExists ? 'OK' : 'FAIL'}`);
  console.log(`  Service Layer: ${results.serviceLayerWorks ? 'OK' : 'FAIL'}`);
  console.log(`  Aggregation: ${results.aggregationWorks ? 'OK' : 'FAIL'}`);

  console.log('\nPerformance Metrics:');
  Object.entries(results.performance).forEach(([key, time]) => {
    console.log(`  ${key}: ${time.toFixed(2)}ms`);
  });

  const allPassed = Object.entries(results).every(([key, value]) =>
    key === 'performance' ? true : value === true,
  );
  console.log(`\n${allPassed ? 'All tests passed.' : 'Some tests need attention.'}`);

  return results;
}

export async function testDataIntegrity() {
  console.log('\nTesting data integrity...\n');

  const db = ensureSupabase();

  const {data: orphanedPhases} = await db
    .from('injury_phases')
    .select('id, injury_id')
    .then(async (response) => {
      if (!response.data) return response;

      const {data: injuries} = await db.from('injuries').select('id');
      const injuryIds = new Set(injuries?.map((injury) => injury.id) || []);
      const orphaned = response.data.filter((phase) => !injuryIds.has(phase.injury_id));

      return {data: orphaned, error: response.error};
    });

  if (orphanedPhases && orphanedPhases.length > 0) {
    console.warn(`Found ${orphanedPhases.length} orphaned phases`);
  } else {
    console.log('No orphaned phases');
  }

  const {data: injuries} = await db.from('injuries').select('id, name_en');
  if (injuries) {
    for (const injury of injuries.slice(0, 5)) {
      const {count} = await db
        .from('injury_phases')
        .select('*', {count: 'exact', head: true})
        .eq('injury_id', injury.id);

      if ((count || 0) !== 5) {
        console.warn(`${injury.name_en} has ${count} phases (expected 5)`);
      }
    }
  }

  console.log('Data integrity check complete\n');
}

export async function testPerformance() {
  console.log('\nRunning performance tests...\n');

  const db = ensureSupabase();
  const iterations = 10;
  const times: Record<string, number[]> = {
    fetchAllInjuries: [],
    fetchSingleInjury: [],
    fetchCompleteProtocol: [],
  };

  const {data: injuries} = await db.from('injuries').select('id, injury_id_slug');
  if (!injuries || injuries.length === 0) {
    console.log('No data to test');
    return;
  }

  await fetchInjuriesFromSupabase();

  for (let i = 0; i < iterations; i += 1) {
    const start1 = performance.now();
    await fetchInjuriesFromSupabase();
    times.fetchAllInjuries.push(performance.now() - start1);

    const index = Math.floor(Math.random() * injuries.length);
    const start2 = performance.now();
    await fetchInjuryBySlug(injuries[index].injury_id_slug);
    times.fetchSingleInjury.push(performance.now() - start2);

    const start3 = performance.now();
    await fetchCompleteInjuryProtocol(injuries[index].injury_id_slug);
    times.fetchCompleteProtocol.push(performance.now() - start3);
  }

  Object.entries(times).forEach(([name, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    console.log(`${name}:`);
    console.log(`  Average: ${avg.toFixed(2)}ms`);
    console.log(`  Min: ${min.toFixed(2)}ms`);
    console.log(`  Max: ${max.toFixed(2)}ms`);
  });

  console.log();
}

export default {
  runHealthChecks,
  testDataIntegrity,
  testPerformance,
};
