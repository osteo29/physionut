/**
 * Integration Guide
 * دليل دمج نظام إدارة الإصابات مع الصفحات الموجودة
 * 
 * هذا الملف يحتوي على أمثلة عملية لكيفية تحديث الصفحات الموجودة
 * لاستخدام بيانات Supabase بدلاً من البيانات المرمزة
 */

// ============================================================
// 1. Update InjuryDetailPage.tsx
// ============================================================

/**
 * Before: Using hardcoded data from injuryProtocolCatalog
 * After: Fetching from Supabase in real-time
 */

// BEFORE:
/*
import { generatedInjuryProtocols } from '../services/injuryProtocolCatalog';

export function InjuryDetailPage({ injurySlug }: Props) {
  const injury = generatedInjuryProtocols.find(p => p.id === injurySlug);
  
  if (!injury) return <NotFound />;
  
  return (
    <div>
      <h1>{injury.name}</h1>
      <p>{injury.overview}</p>
      {injury.phases.map(phase => (
        <PhaseCard key={phase.number} phase={phase} />
      ))}
    </div>
  );
}
*/

// AFTER:
import { useEffect, useState } from 'react';
import { fetchCompleteInjuryProtocol } from '../services/injurySupabaseService';
import type { InjuryProtocol } from '../types/injury';

export function InjuryDetailPage({ injurySlug }: Props) {
  const [injury, setInjury] = useState<InjuryProtocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInjury();
  }, [injurySlug]);

  async function loadInjury() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCompleteInjuryProtocol(injurySlug);
      if (!data) {
        setError('Injury not found');
        return;
      }
      setInjury(data);
    } catch (err) {
      setError('Failed to load injury data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!injury) return <NotFound />;

  return (
    <div>
      <h1>{injury.name}</h1>
      <p>{injury.overview}</p>
      <div className="mt-4 bg-blue-50 p-4 rounded">
        <p className="text-sm text-blue-700">
          📘 This injury data is now managed in Supabase
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Last updated: {new Date(injury.updatedAt).toLocaleDateString()}
        </p>
      </div>
      {injury.phases.map((phase, index) => (
        <PhaseCard key={index} phase={phase} />
      ))}
    </div>
  );
}

// ============================================================
// 2. Update InjuryProtocolsPage.tsx
// ============================================================

/**
 * List all injuries and allow filtering/searching
 */

export function InjuryProtocolsPage() {
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInjuries();
  }, []);

  async function loadInjuries() {
    try {
      const data = await fetchInjuriesFromSupabase();
      setInjuries(data);
    } catch (error) {
      console.error('Failed to load injuries:', error);
    } finally {
      setLoading(false);
    }
  }

  const filtered = injuries.filter(injury => {
    const matchesSearch =
      injury.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      injury.name_ar.includes(searchTerm);

    const matchesCategory =
      categoryFilter === 'all' || injury.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Injury Protocols</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="search"
          placeholder="Search injuries..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="Ligament Injury">Ligament Injuries</option>
          <option value="Muscle Strain">Muscle Strains</option>
          <option value="Fracture">Fractures</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(injury => (
            <InjuryCard
              key={injury.id}
              injury={injury}
              onSelect={() => navigate(`/injuries/${injury.injury_id_slug}`)}
            />
          ))}
        </div>
      )}

      <div className="mt-6 bg-amber-50 p-4 rounded text-sm">
        <p className="text-amber-800">
          📊 Total injuries: {filtered.length} / {injuries.length}
        </p>
        <p className="text-xs text-amber-700 mt-1">
          Data is now managed dynamically from Supabase
        </p>
      </div>
    </div>
  );
}

// ============================================================
// 3. Add Route for Admin Panel
// ============================================================

/**
 * In your App.tsx or RouterApp.tsx:
 */

import { AdminInjuryManager } from './pages/AdminInjuryManager';

export function Router() {
  return (
    <Routes>
      {/* Existing routes */}
      <Route path="/injuries" element={<InjuryProtocolsPage />} />
      <Route path="/injuries/:slug" element={<InjuryDetailPage />} />

      {/* NEW: Admin panel route - Protected with auth in future */}
      <Route
        path="/admin/injuries"
        element={<AdminInjuryManager />}
        // In future: element={<ProtectedRoute><AdminInjuryManager /></ProtectedRoute>}
      />

      {/* More routes... */}
    </Routes>
  );
}

// ============================================================
// 4. Create Migration Task
// ============================================================

/**
 * File: src/tasks/migrateDataTask.ts
 * 
 * This is a one-time task to move all hardcoded data to Supabase
 * Run this early in your app lifecycle or in a separate script
 */

export async function runDataMigration() {
  console.log('🔄 Checking if data migration is needed...');

  // 1. Check if data already exists in Supabase
  const existingInjuries = await fetchInjuriesFromSupabase();
  if (existingInjuries.length > 0) {
    console.log(`✅ Data already migrated (found ${existingInjuries.length} injuries)`);
    return;
  }

  console.log('📥 Starting data migration from hardcoded catalog...');

  // 2. Import and run migration
  const { migrateAllInjuriesToSupabase } = await import(
    '../utils/dataMigration'
  );
  const result = await migrateAllInjuriesToSupabase();

  if (result.successCount > 0) {
    console.log(`✅ Migration successful: ${result.successCount} injuries imported`);
    // Show notification to user
  }

  if (result.errorCount > 0) {
    console.warn(`⚠️ Migration had ${result.errorCount} errors`);
  }
}

// ============================================================
// 5. ComponentIntegration Examples
// ============================================================

/**
 * InjuryCard Component
 * Display single injury with Supabase data
 */

interface Props {
  injury: InjuryRow;
  onSelect: () => void;
}

export function InjuryCard({ injury, onSelect }: Props) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold">{injury.name_en}</h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
          {injury.category}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-600">{injury.body_region_en}</p>
        <p className="text-xs text-gray-500 mt-1">
          العربية: {injury.name_ar}
        </p>
      </div>

      <p className="text-sm text-gray-700 line-clamp-2">
        {injury.overview_en}
      </p>

      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-gray-500">
          {injury.name_ar ? '🌐 Bilingual' : '🇺🇸 English only'}
        </span>
        <button
          onClick={e => {
            e.stopPropagation();
            // Show edit button if admin
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

/**
 * PhaseCard Component
 * Display single phase with all related data
 */

interface PhaseProps {
  phase: PhaseRow & {
    supplements: SupplementRow[];
    meals: MealRow[];
  };
}

export function PhaseCard({ phase }: PhaseProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        Phase {phase.phase_number}: {phase.label_en}
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-sm">Duration</h3>
          <p className="text-sm text-gray-700">{phase.duration_en}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Recovery Window</h3>
          <p className="text-sm text-gray-700">{phase.recovery_window}</p>
        </div>
      </div>

      {/* Goals */}
      {phase.goals_en && phase.goals_en.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Goals</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {phase.goals_en.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Nutrition */}
      <div className="bg-white rounded p-4 mb-4">
        <h3 className="font-semibold text-sm mb-2">Nutrition Guidelines</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          {phase.protein_min_per_kg && (
            <div>
              <span className="font-semibold">Protein:</span>
              {phase.protein_min_per_kg}-{phase.protein_max_per_kg}g/kg
            </div>
          )}
          {phase.hydration_ml_per_kg && (
            <div>
              <span className="font-semibold">Hydration:</span>
              {phase.hydration_ml_per_kg}ml/kg
            </div>
          )}
        </div>
      </div>

      {/* Supplements */}
      {phase.supplements && phase.supplements.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Recommended Supplements</h3>
          <div className="space-y-2">
            {phase.supplements.map(sup => (
              <div
                key={sup.id}
                className="bg-white rounded p-3 text-sm border-l-4 border-amber-400"
              >
                <p className="font-semibold">{sup.name}</p>
                <p className="text-xs text-gray-600">Dose: {sup.dose_en}</p>
                <p className="text-xs text-gray-600">Why: {sup.reason_en}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meals */}
      {phase.meals && phase.meals.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-2">Meal Examples</h3>
          {phase.meals.map(meal => (
            <div key={meal.id} className="bg-white rounded p-3 text-sm">
              <p className="font-semibold mb-2">{meal.diet_style}</p>
              <div className="space-y-1 text-xs">
                <p>
                  <strong>Breakfast:</strong> {meal.breakfast_en}
                </p>
                <p>
                  <strong>Lunch:</strong> {meal.lunch_en}
                </p>
                <p>
                  <strong>Dinner:</strong> {meal.dinner_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 6. Testing Checklist
// ============================================================

/*
 * Run these tests to verify the integration:
 * 
 * [] 1. Database Connection
 *    - Open DevTools Console
 *    - Run: await fetchInjuriesFromSupabase()
 *    - Should return array of injuries
 *
 * [] 2. Admin Panel
 *    - Navigate to /admin/injuries
 *    - Should see list of injuries after migration
 *    - Click expand to see phases
 *    - Click Edit to modify data
 *    - Click Save and verify in Supabase
 *
 * [] 3. Detail Page
 *    - Navigate to /injuries/knee-acl-tear (or any slug)
 *    - Should load data from Supabase (not hardcoded)
 *    - All phases should display with nutrition info
 *    - Check Arabic text displays correctly
 *
 * [] 4. Protocols List
 *    - Navigate to /injuries
 *    - Should show all injuries from Supabase
 *    - Search should filter results live
 *    - Category filter should work
 *
 * [] 5. Bilingual Data
 *    - Switch language in app
 *    - Should show Arabic translations if available
 *    - Should fallback to English if no Arabic translation
 *
 * [] 6. Performance
 *    - Load /injuries - should load < 2s
 *    - Load injury detail - should load < 1s
 *    - Admin panel should be responsive
 */

// ============================================================
// 7. Fallback Pattern (for gradual migration)
// ============================================================

/**
 * If you want to migrate gradually without breaking existing pages:
 */

async function getInjuryData(slug: string) {
  try {
    // Try Supabase first
    const data = await fetchCompleteInjuryProtocol(slug);
    if (data) {
      console.log('✅ Loaded from Supabase:', slug);
      return data;
    }
  } catch (error) {
    console.warn('⚠️ Failed to load from Supabase, using fallback', error);
  }

  // Fallback to hardcoded data
  const injury = generatedInjuryProtocols.find(p => p.id === slug);
  if (injury) {
    console.log('📦 Loaded from hardcoded data:', slug);
    return transformLegacyToNewFormat(injury);
  }

  throw new Error(`Injury not found: ${slug}`);
}

export { getInjuryData };
