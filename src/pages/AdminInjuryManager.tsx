import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Edit2, Plus, Trash2, ChevronDown, ChevronUp, Download } from 'lucide-react';
import {
  fetchInjuriesFromSupabase,
  fetchPhasesByInjuryId,
  fetchSupplementsByPhaseId,
  fetchMealsByPhaseId,
  updateInjury,
  updatePhase,
  updateSupplement,
  updateMeal,
  createPhase,
  createSupplement,
  createMeal,
  deleteSupplement,
  deleteMeal,
  type InjuryRow,
  type PhaseRow,
} from '../services/injurySupabaseService';
import { migrateAllInjuriesToSupabase } from '../utils/dataMigration';
import { getCurrentUser, onSupabaseAuthChange, supabase, type User } from '../lib/supabase';

export default function AdminInjuryManager() {
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMigrating, setIsMigrating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [expandedInjury, setExpandedInjury] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Record<string, string>>({});

  const refreshAdminState = async (nextUser?: User | null) => {
    const activeUser = nextUser === undefined ? await getCurrentUser().catch(() => null) : nextUser;
    setUser(activeUser);

    if (!activeUser || !supabase) {
      setIsAdmin(false);
      return;
    }

    const { data } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', activeUser.email ?? '')
      .maybeSingle();

    setIsAdmin(Boolean(data));
  };

  useEffect(() => {
    void refreshAdminState().finally(() => setAuthLoading(false));
    const authSub = supabase
      ? onSupabaseAuthChange(async (_, session) => {
          await refreshAdminState(session?.user || null);
          setAuthLoading(false);
        })
      : null;

    loadInjuries();

    return () => {
      authSub?.data.subscription.unsubscribe();
    };
  }, []);

  const loadInjuries = async () => {
    setLoading(true);
    const data = await fetchInjuriesFromSupabase();
    setInjuries(data);
    setLoading(false);
  };

  const handleMigrationClick = async () => {
    if (!user) {
      alert('You must sign in first.');
      return;
    }

    if (!isAdmin) {
      alert('This signed-in account is not recognized as an admin.');
      return;
    }

    if (!confirm('Import all 95 injuries from legacy data? This will take a few moments.')) return;
    setIsMigrating(true);
    try {
      await migrateAllInjuriesToSupabase();
      console.log('✅ Migration completed!');
      alert('Migration completed! Refreshing data...');
      await loadInjuries();
    } catch (error) {
      console.error('❌ Migration failed:', error);
      alert(`Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsMigrating(false);
    }
  };

  const handleInjuryEdit = async (injuryId: string, field: string, value: string) => {
    const key = `injury_${injuryId}_${field}`;
    setEditingData((prev) => ({ ...prev, [key]: value }));
  };

  const saveInjuryChanges = async (injuryId: string) => {
    const injury = injuries.find((i) => i.id === injuryId);
    if (!injury) return;

    const updates: Record<string, string> = {};
    Object.entries(editingData).forEach(([key, value]) => {
      if (key.startsWith(`injury_${injuryId}_`)) {
        const field = key.replace(`injury_${injuryId}_`, '');
        updates[field] = value;
      }
    });

    if (Object.keys(updates).length > 0) {
      try {
        await updateInjury(injuryId, updates as any);
        alert('✅ تم الحفظ بنجاح');
        await loadInjuries();
      } catch {
        alert('❌ خطأ في الحفظ');
      }
    }
  };

  if (loading) return <div className="p-6 text-center">Loading injuries...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🏥 Injury Management Dashboard</h1>
          <p className="text-gray-300">
            Edit injury protocols, phases, supplements, and meals. Changes are saved to Supabase.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-slate-700 bg-slate-900/70 p-4 text-sm">
          {authLoading ? (
            <p className="text-slate-300">Checking admin session...</p>
          ) : user ? (
            <div className="space-y-2">
              <p className="text-slate-200">
                Signed in as: <span className="font-semibold">{user.email}</span>
              </p>
              <p className={isAdmin ? 'text-emerald-400' : 'text-amber-400'}>
                {isAdmin ? 'Admin access confirmed.' : 'This account is signed in but is not recognized as an admin.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-amber-400">
                You are not signed in. Import and edit actions will fail with 403 until you log in.
              </p>
              <Link
                to="/en/auth"
                className="inline-flex items-center rounded-lg bg-health-green px-4 py-2 font-semibold text-white"
              >
                Open Login Page
              </Link>
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleMigrationClick}
            disabled={isMigrating || injuries.length > 0 || !user || !isAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition font-semibold"
          >
            <Download className="w-4 h-4" />
            {isMigrating ? 'Importing...' : 'Import Legacy Data'}
          </button>
        </div>

        <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-blue-200 font-semibold">نظام إدارة البروتوكولات</h3>
              <p className="text-blue-300 text-sm mt-1">
                {injuries.length === 0
                  ? 'No injuries found. Click "Import Legacy Data" to get started.'
                  : `${injuries.length} injuries loaded. Edit them below.`}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {injuries.map((injury) => (
            <div key={injury.id} className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
              <button
                onClick={() => setExpandedInjury(expandedInjury === injury.id ? null : injury.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800 transition"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-white">{injury.name_en}</h2>
                  <p className="text-gray-400 text-sm">{injury.name_ar}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-xs">{injury.category}</span>
                    <span className="px-3 py-1 bg-cyan-900 text-cyan-200 rounded-full text-xs">{injury.body_region_en}</span>
                  </div>
                </div>
                {expandedInjury === injury.id ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {expandedInjury === injury.id && (
                <div className="border-t border-gray-700 p-4 bg-gray-800/50 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Overview (English)</label>
                    <textarea
                      value={editingData[`injury_${injury.id}_overview_en`] ?? injury.overview_en}
                      onChange={(e) => handleInjuryEdit(injury.id, 'overview_en', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Overview (Arabic)</label>
                    <textarea
                      value={editingData[`injury_${injury.id}_overview_ar`] ?? injury.overview_ar}
                      onChange={(e) => handleInjuryEdit(injury.id, 'overview_ar', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                      rows={3}
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Rehabilitation Summary (English)</label>
                    <textarea
                      value={editingData[`injury_${injury.id}_rehab_summary_en`] ?? injury.rehab_summary_en}
                      onChange={(e) => handleInjuryEdit(injury.id, 'rehab_summary_en', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                      rows={3}
                    />
                  </div>

                  <button
                    onClick={() => saveInjuryChanges(injury.id)}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
                  >
                    💾 Save Changes
                  </button>

                  <PhasesList injuryId={injury.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
function PhasesList({ injuryId }: { injuryId: string }) {
  const [phases, setPhases] = useState<PhaseRow[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPhases();
  }, []);

  const loadPhases = async () => {
    setLoading(true);
    const data = await fetchPhasesByInjuryId(injuryId);
    setPhases(data);
    setLoading(false);
  };

  if (loading) return <div className="text-gray-400">Loading phases...</div>;

  return (
    <div className="mt-6 space-y-3 border-t border-gray-700 pt-4">
      <h3 className="text-lg font-bold text-cyan-400">📊 Phases (مراحل التعافي)</h3>

      {phases.map((phase) => (
        <div key={phase.id} className="border border-gray-600 rounded bg-gray-700/30 overflow-hidden">
          <button
            onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
            className="w-full p-3 flex items-center justify-between hover:bg-gray-700/50 transition text-left"
          >
            <div>
              <h4 className="font-semibold text-white">Phase {phase.phase_number}: {phase.label_en}</h4>
              <p className="text-sm text-gray-400">{phase.label_ar}</p>
            </div>
            {expandedPhase === phase.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {expandedPhase === phase.id && (
            <div className="p-3 border-t border-gray-600 space-y-3 bg-gray-800/30">
              <PhaseEditor phase={phase} onSave={loadPhases} />
              <SupplementsList phaseId={phase.id} />
              <MealsList phaseId={phase.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
function PhaseEditor({ phase, onSave }: { phase: PhaseRow; onSave: () => void }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    label_en: phase.label_en,
    label_ar: phase.label_ar,
    goals_en: phase.goals_en.join('\n'),
    goals_ar: phase.goals_ar.join('\n'),
  });

  const handleSave = async () => {
    try {
      await updatePhase(phase.id, {
        ...formData,
        goals_en: formData.goals_en.split('\n').filter((g) => g.trim()),
        goals_ar: formData.goals_ar.split('\n').filter((g) => g.trim()),
      } as any);
      alert('✅ Phase updated');
      setEditing(false);
      onSave();
    } catch {
      alert('❌ Error saving phase');
    }
  };

  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
        <Edit2 className="w-4 h-4" /> Edit Phase
      </button>
    );
  }

  return (
    <div className="space-y-2 bg-gray-900 p-3 rounded">
      <input type="text" value={formData.label_en} onChange={(e) => setFormData({ ...formData, label_en: e.target.value })} placeholder="Phase label (EN)" className="w-full px-2 py-1 bg-gray-700 text-white rounded text-sm" />
      <textarea value={formData.goals_en} onChange={(e) => setFormData({ ...formData, goals_en: e.target.value })} placeholder="Goals (EN) - one per line" className="w-full px-2 py-1 bg-gray-700 text-white rounded text-sm" rows={3} />
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm">Save</button>
        <button onClick={() => setEditing(false)} className="flex-1 px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ============================================================================
function SupplementsList({ phaseId }: { phaseId: string }) {
  const [supplements, setSupplements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadSupplements(); }, []);

  const loadSupplements = async () => {
    setLoading(true);
    const data = await fetchSupplementsByPhaseId(phaseId);
    setSupplements(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this supplement?')) return;
    try {
      await deleteSupplement(id);
      alert('✅ Supplement deleted');
      await loadSupplements();
    } catch {
      alert('❌ Error deleting supplement');
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-2 border-t border-gray-600 pt-3">
      <h5 className="font-semibold text-amber-400 text-sm">💊 Supplements</h5>
      {supplements.length === 0 ? <p className="text-xs text-gray-500">No supplements added</p> :
        supplements.map((sup) => (
          <div key={sup.id} className="flex items-center justify-between bg-gray-900 p-2 rounded text-sm">
            <div>
              <p className="text-white font-medium">{sup.name}</p>
              <p className="text-xs text-gray-400">{sup.dose_en}</p>
            </div>
            <button onClick={() => handleDelete(sup.id)} className="p-1 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))
      }
      <button className="w-full text-xs py-1 border border-amber-600 text-amber-400 rounded hover:bg-amber-600/20">
        <Plus className="w-3 h-3 inline mr-1" /> Add Supplement
      </button>
    </div>
  );
}

// ============================================================================
function MealsList({ phaseId }: { phaseId: string }) {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadMeals(); }, []);

  const loadMeals = async () => {
    setLoading(true);
    const data = await fetchMealsByPhaseId(phaseId);
    setMeals(data);
    setLoading(false);
  };

  if (loading) return null;

  return (
    <div className="space-y-2 border-t border-gray-600 pt-3">
      <h5 className="font-semibold text-emerald-400 text-sm">🍽️ Meal Plans</h5>
      {meals.length === 0 ? <p className="text-xs text-gray-500">No meals added</p> :
        meals.map((meal) => (
          <div key={meal.id} className="bg-gray-900 p-2 rounded text-sm">
            <p className="text-white font-medium capitalize">{meal.diet_style}</p>
            <p className="text-xs text-gray-400">🥗 {meal.breakfast_en}</p>
          </div>
        ))
      }
      <button className="w-full text-xs py-1 border border-emerald-600 text-emerald-400 rounded hover:bg-emerald-600/20">
        <Plus className="w-3 h-3 inline mr-1" /> Add Meal
      </button>
    </div>
  );
}
