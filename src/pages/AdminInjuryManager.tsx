import {Children, cloneElement, isValidElement, type ReactNode, useEffect, useMemo, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {CopyPlus, FileDown, Plus, Save, Trash2} from 'lucide-react';
import Seo from '../components/seo/Seo';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import {
  getArticleAdminEmail,
  getCurrentUser,
  getSupabaseActionErrorMessage,
  getSupabaseConfigurationMessage,
  isArticleAdminUser,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  supabase,
  type User,
} from '../lib/supabase';
import {
  createInjury,
  createMeal,
  createPhase,
  createSupplement,
  deleteInjury,
  deleteMeal,
  deletePhase,
  deleteSupplement,
  fetchInjuriesFromSupabase,
  fetchMealsByPhaseId,
  fetchPhasesByInjuryId,
  fetchSupplementsByPhaseId,
  updateInjury,
  updateMeal,
  updatePhase,
  updateSupplement,
  type InjuryRow,
  type MealRow,
  type PhaseRow,
  type SupplementRow,
} from '../services/injurySupabaseService';
import {slugifyArticleTitle} from '../services/articleStudio';
import {decodeMojibake} from '../services/textEncoding';
import {migrateAllInjuriesToSupabase} from '../utils/dataMigration';

function ar(text: string) {
  return decodeMojibake(text);
}

function decodeStringsDeep<T>(value: T): T {
  if (typeof value === 'string') return ar(value) as T;

  if (Array.isArray(value)) {
    return value.map((item) => decodeStringsDeep(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, decodeStringsDeep(item)]),
    ) as T;
  }

  return value;
}

function decodeNodeTree(node: ReactNode): ReactNode {
  if (typeof node === 'string') return ar(node);

  if (Array.isArray(node)) {
    return node.map((child) => decodeNodeTree(child));
  }

  if (!isValidElement(node)) {
    return node;
  }

  const props = (node.props || {}) as Record<string, unknown>;
  const nextProps = Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      if (key === 'children') {
        return [key, Children.map(value as ReactNode, (child) => decodeNodeTree(child))];
      }

      return [key, decodeStringsDeep(value)];
    }),
  );

  return cloneElement(node, nextProps);
}

function confirmText(message: string) {
  return window.confirm(ar(message));
}

function listToText(value?: string[]) {
  return (value || []).join('\n');
}

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function numOrNull(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function buildInjuryPublicPath(lang: 'en' | 'ar', slug: string) {
  return `/${lang}/injuries/${slug.replace(/_/g, '-')}`;
}

async function canManageInjuries(user: User | null) {
  if (!user?.email || !supabase) return false;
  if (isArticleAdminUser(user)) return true;

  const {data} = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', user.email.trim().toLowerCase())
    .maybeSingle();

  return Boolean(data);
}

function newInjuryDraft(index: number) {
  return decodeStringsDeep({
    injury_id_slug: `new-injury-${index}`,
    name_en: 'New injury',
    name_ar: 'إصابة جديدة',
    category: 'General',
    body_region_en: 'General',
    body_region_ar: 'عام',
    overview_en: 'Short overview.',
    overview_ar: 'نظرة عامة قصيرة.',
    rehab_summary_en: 'Short rehab summary.',
    rehab_summary_ar: 'ملخص تأهيلي قصير.',
    common_in: [],
    red_flags: [],
    related_calculators: [],
  });
}

type InjuryDraft = {
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
  common_in_text: string;
  red_flags_text: string;
  related_calculators_text: string;
};

function mapInjuryDraft(injury: InjuryRow): InjuryDraft {
  return {
    injury_id_slug: injury.injury_id_slug,
    name_en: injury.name_en,
    name_ar: injury.name_ar,
    category: injury.category,
    body_region_en: injury.body_region_en,
    body_region_ar: injury.body_region_ar,
    overview_en: injury.overview_en,
    overview_ar: injury.overview_ar,
    rehab_summary_en: injury.rehab_summary_en,
    rehab_summary_ar: injury.rehab_summary_ar,
    common_in_text: listToText(injury.common_in),
    red_flags_text: listToText(injury.red_flags),
    related_calculators_text: listToText(injury.related_calculators),
  };
}

function SectionField({
  label,
  value,
  onChange,
  rows = 4,
  dir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  dir?: 'rtl' | 'ltr';
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        dir={dir}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
      />
    </label>
  );
}

type PhaseDraft = {
  label_en: string;
  label_ar: string;
  duration_en: string;
  duration_ar: string;
  recovery_window: string;
  goals_en: string;
  goals_ar: string;
  nutrition_focus_en: string;
  nutrition_focus_ar: string;
  recommended_foods_en: string;
  recommended_foods_ar: string;
  avoid_foods_en: string;
  avoid_foods_ar: string;
  exercises_en: string;
  exercises_ar: string;
  prohibited_movements_en: string;
  prohibited_movements_ar: string;
  protein_min_per_kg: string;
  protein_max_per_kg: string;
  hydration_ml_per_kg: string;
  omega3_grams: string;
  creatine_grams: string;
  collagen_min_per_kg: string;
  collagen_max_per_kg: string;
  vitamin_c_mg: string;
  calcium_mg: string;
};

function mapPhaseDraft(phase: PhaseRow): PhaseDraft {
  return {
    label_en: phase.label_en,
    label_ar: phase.label_ar,
    duration_en: phase.duration_en,
    duration_ar: phase.duration_ar,
    recovery_window: phase.recovery_window,
    goals_en: listToText(phase.goals_en),
    goals_ar: listToText(phase.goals_ar),
    nutrition_focus_en: listToText(phase.nutrition_focus_en),
    nutrition_focus_ar: listToText(phase.nutrition_focus_ar),
    recommended_foods_en: listToText(phase.recommended_foods_en),
    recommended_foods_ar: listToText(phase.recommended_foods_ar),
    avoid_foods_en: listToText(phase.avoid_foods_en),
    avoid_foods_ar: listToText(phase.avoid_foods_ar),
    exercises_en: listToText(phase.exercises_en),
    exercises_ar: listToText(phase.exercises_ar),
    prohibited_movements_en: listToText(phase.prohibited_movements_en),
    prohibited_movements_ar: listToText(phase.prohibited_movements_ar),
    protein_min_per_kg: phase.protein_min_per_kg?.toString() || '',
    protein_max_per_kg: phase.protein_max_per_kg?.toString() || '',
    hydration_ml_per_kg: phase.hydration_ml_per_kg?.toString() || '',
    omega3_grams: phase.omega3_grams?.toString() || '',
    creatine_grams: phase.creatine_grams?.toString() || '',
    collagen_min_per_kg: phase.collagen_min_per_kg?.toString() || '',
    collagen_max_per_kg: phase.collagen_max_per_kg?.toString() || '',
    vitamin_c_mg: phase.vitamin_c_mg?.toString() || '',
    calcium_mg: phase.calcium_mg?.toString() || '',
  };
}

function newPhase(injuryId: string, phaseNumber: number): Omit<PhaseRow, 'id' | 'created_at' | 'updated_at'> {
  return decodeStringsDeep({
    injury_id: injuryId,
    phase_number: phaseNumber,
    label_en: `Phase ${phaseNumber}`,
    label_ar: `المرحلة ${phaseNumber}`,
    duration_en: '',
    duration_ar: '',
    recovery_window: 'early',
    goals_en: [],
    goals_ar: [],
    nutrition_focus_en: [],
    nutrition_focus_ar: [],
    recommended_foods_en: [],
    recommended_foods_ar: [],
    avoid_foods_en: [],
    avoid_foods_ar: [],
    exercises_en: [],
    exercises_ar: [],
    prohibited_movements_en: [],
    prohibited_movements_ar: [],
    protein_min_per_kg: null,
    protein_max_per_kg: null,
    hydration_ml_per_kg: null,
    omega3_grams: null,
    creatine_grams: null,
    collagen_min_per_kg: null,
    collagen_max_per_kg: null,
    vitamin_c_mg: null,
    calcium_mg: null,
  });
}

function newSupplement(phaseId: string, orderIndex: number): Omit<SupplementRow, 'id' | 'created_at' | 'updated_at'> {
  return {
    phase_id: phaseId,
    name: 'New supplement',
    dose_en: '',
    dose_ar: '',
    reason_en: '',
    reason_ar: '',
    timing_en: '',
    timing_ar: '',
    caution_en: '',
    caution_ar: '',
    order_index: orderIndex,
  };
}

function newMeal(phaseId: string): Omit<MealRow, 'id' | 'created_at' | 'updated_at'> {
  return {
    phase_id: phaseId,
    diet_style: 'balanced',
    breakfast_en: '',
    breakfast_ar: '',
    lunch_en: '',
    lunch_ar: '',
    dinner_en: '',
    dinner_ar: '',
    snack_en: '',
    snack_ar: '',
    shopping_list_en: [],
    shopping_list_ar: [],
  };
}

function PhaseStudio({
  injuryId,
  lang,
  onNotice,
}: {
  injuryId: string;
  lang: 'en' | 'ar';
  onNotice: (message: string) => void;
}) {
  const isAr = lang === 'ar';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phases, setPhases] = useState<PhaseRow[]>([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [phaseDraft, setPhaseDraft] = useState<PhaseDraft | null>(null);
  const [supplements, setSupplements] = useState<SupplementRow[]>([]);
  const [meals, setMeals] = useState<MealRow[]>([]);

  const selectedPhase = useMemo(
    () => phases.find((item) => item.id === selectedPhaseId) ?? phases[0] ?? null,
    [phases, selectedPhaseId],
  );

  const loadPhases = async (preferredId?: string | null) => {
    setLoading(true);
    const rows = await fetchPhasesByInjuryId(injuryId);
    setPhases(rows);
    setSelectedPhaseId(
      preferredId && rows.some((item) => item.id === preferredId) ? preferredId : rows[0]?.id ?? null,
    );
    setLoading(false);
  };

  const loadRelated = async (phaseId: string) => {
    const [nextSupplements, nextMeals] = await Promise.all([
      fetchSupplementsByPhaseId(phaseId),
      fetchMealsByPhaseId(phaseId),
    ]);
    setSupplements(nextSupplements);
    setMeals(nextMeals);
  };

  useEffect(() => {
    void loadPhases();
  }, [injuryId]);

  useEffect(() => {
    if (!selectedPhase) {
      setPhaseDraft(null);
      setSupplements([]);
      setMeals([]);
      return;
    }
    setPhaseDraft(mapPhaseDraft(selectedPhase));
    void loadRelated(selectedPhase.id);
  }, [selectedPhase]);

  const savePhase = async () => {
    if (!selectedPhase || !phaseDraft) return;
    try {
      setSaving(true);
      await updatePhase(selectedPhase.id, {
        label_en: phaseDraft.label_en,
        label_ar: phaseDraft.label_ar,
        duration_en: phaseDraft.duration_en,
        duration_ar: phaseDraft.duration_ar,
        recovery_window: phaseDraft.recovery_window,
        goals_en: textToList(phaseDraft.goals_en),
        goals_ar: textToList(phaseDraft.goals_ar),
        nutrition_focus_en: textToList(phaseDraft.nutrition_focus_en),
        nutrition_focus_ar: textToList(phaseDraft.nutrition_focus_ar),
        recommended_foods_en: textToList(phaseDraft.recommended_foods_en),
        recommended_foods_ar: textToList(phaseDraft.recommended_foods_ar),
        avoid_foods_en: textToList(phaseDraft.avoid_foods_en),
        avoid_foods_ar: textToList(phaseDraft.avoid_foods_ar),
        exercises_en: textToList(phaseDraft.exercises_en),
        exercises_ar: textToList(phaseDraft.exercises_ar),
        prohibited_movements_en: textToList(phaseDraft.prohibited_movements_en),
        prohibited_movements_ar: textToList(phaseDraft.prohibited_movements_ar),
        protein_min_per_kg: numOrNull(phaseDraft.protein_min_per_kg),
        protein_max_per_kg: numOrNull(phaseDraft.protein_max_per_kg),
        hydration_ml_per_kg: numOrNull(phaseDraft.hydration_ml_per_kg),
        omega3_grams: numOrNull(phaseDraft.omega3_grams),
        creatine_grams: numOrNull(phaseDraft.creatine_grams),
        collagen_min_per_kg: numOrNull(phaseDraft.collagen_min_per_kg),
        collagen_max_per_kg: numOrNull(phaseDraft.collagen_max_per_kg),
        vitamin_c_mg: numOrNull(phaseDraft.vitamin_c_mg),
        calcium_mg: numOrNull(phaseDraft.calcium_mg),
      });
      await loadPhases(selectedPhase.id);
      onNotice(isAr ? 'تم حفظ المرحلة.' : 'Phase saved.');
    } catch (error) {
      onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
    } finally {
      setSaving(false);
    }
  };

  const removePhase = async () => {
    if (!selectedPhase) return;
    if (!confirmText(isAr ? 'حذف هذه المرحلة؟' : 'Delete this phase?')) return;
    try {
      await deletePhase(selectedPhase.id);
      await loadPhases();
      onNotice(isAr ? 'تم حذف المرحلة.' : 'Phase deleted.');
    } catch (error) {
      onNotice(getSupabaseActionErrorMessage(error, lang, 'delete'));
    }
  };

  const addPhase = async () => {
    try {
      const created = await createPhase(newPhase(injuryId, phases.length + 1));
      await loadPhases(created.id);
      onNotice(isAr ? 'تمت إضافة مرحلة جديدة.' : 'New phase added.');
    } catch (error) {
      onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
    }
  };

  if (loading) {
    return decodeNodeTree(
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        {isAr ? 'جار تحميل المراحل...' : 'Loading phases...'}
      </div>,
    );
  }

  return decodeNodeTree(
    <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-black text-slate-900">{isAr ? 'مراحل التعافي' : 'Recovery phases'}</div>
        <button type="button" onClick={addPhase} className="rounded-2xl bg-health-green px-4 py-2 text-sm font-bold text-white">
          {isAr ? 'إضافة مرحلة' : 'Add phase'}
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[230px,minmax(0,1fr)]">
        <aside className="space-y-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => setSelectedPhaseId(phase.id)}
              className={`w-full rounded-2xl border p-3 text-start transition ${selectedPhase?.id === phase.id ? 'border-health-green bg-white shadow-sm' : 'border-slate-200 bg-white/70'}`}
            >
              <div className="text-xs text-slate-400">{isAr ? `مرحلة ${phase.phase_number}` : `Phase ${phase.phase_number}`}</div>
              <div className="font-bold text-slate-900">{isAr ? phase.label_ar || phase.label_en : phase.label_en}</div>
            </button>
          ))}
        </aside>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
          {selectedPhase && phaseDraft ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Label (EN)</span><input value={phaseDraft.label_en} onChange={(e) => setPhaseDraft({...phaseDraft, label_en: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Label (AR)</span><input value={phaseDraft.label_ar} onChange={(e) => setPhaseDraft({...phaseDraft, label_ar: e.target.value})} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Duration (EN)</span><input value={phaseDraft.duration_en} onChange={(e) => setPhaseDraft({...phaseDraft, duration_en: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Duration (AR)</span><input value={phaseDraft.duration_ar} onChange={(e) => setPhaseDraft({...phaseDraft, duration_ar: e.target.value})} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
              </div>

              <SectionField label="Goals (EN)" value={phaseDraft.goals_en} onChange={(value) => setPhaseDraft({...phaseDraft, goals_en: value})} />
              <SectionField label="Goals (AR)" value={phaseDraft.goals_ar} onChange={(value) => setPhaseDraft({...phaseDraft, goals_ar: value})} dir="rtl" />
              <SectionField label="Nutrition Focus (EN)" value={phaseDraft.nutrition_focus_en} onChange={(value) => setPhaseDraft({...phaseDraft, nutrition_focus_en: value})} />
              <SectionField label="Nutrition Focus (AR)" value={phaseDraft.nutrition_focus_ar} onChange={(value) => setPhaseDraft({...phaseDraft, nutrition_focus_ar: value})} dir="rtl" />
              <SectionField label="Recommended Foods (EN)" value={phaseDraft.recommended_foods_en} onChange={(value) => setPhaseDraft({...phaseDraft, recommended_foods_en: value})} />
              <SectionField label="Recommended Foods (AR)" value={phaseDraft.recommended_foods_ar} onChange={(value) => setPhaseDraft({...phaseDraft, recommended_foods_ar: value})} dir="rtl" />
              <SectionField label="Avoid Foods (EN)" value={phaseDraft.avoid_foods_en} onChange={(value) => setPhaseDraft({...phaseDraft, avoid_foods_en: value})} />
              <SectionField label="Avoid Foods (AR)" value={phaseDraft.avoid_foods_ar} onChange={(value) => setPhaseDraft({...phaseDraft, avoid_foods_ar: value})} dir="rtl" />
              <SectionField label="Exercises (EN)" value={phaseDraft.exercises_en} onChange={(value) => setPhaseDraft({...phaseDraft, exercises_en: value})} />
              <SectionField label="Exercises (AR)" value={phaseDraft.exercises_ar} onChange={(value) => setPhaseDraft({...phaseDraft, exercises_ar: value})} dir="rtl" />
              <SectionField label="Prohibited Movements (EN)" value={phaseDraft.prohibited_movements_en} onChange={(value) => setPhaseDraft({...phaseDraft, prohibited_movements_en: value})} />
              <SectionField label="Prohibited Movements (AR)" value={phaseDraft.prohibited_movements_ar} onChange={(value) => setPhaseDraft({...phaseDraft, prohibited_movements_ar: value})} dir="rtl" />

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['protein_min_per_kg', 'Protein min/kg'],
                  ['protein_max_per_kg', 'Protein max/kg'],
                  ['hydration_ml_per_kg', 'Hydration ml/kg'],
                  ['omega3_grams', 'Omega 3 g'],
                  ['creatine_grams', 'Creatine g'],
                  ['collagen_min_per_kg', 'Collagen min/kg'],
                  ['collagen_max_per_kg', 'Collagen max/kg'],
                  ['vitamin_c_mg', 'Vitamin C mg'],
                  ['calcium_mg', 'Calcium mg'],
                ].map(([field, label]) => (
                  <label key={field} className="space-y-2">
                    <span className="text-sm font-bold text-slate-700">{label}</span>
                    <input value={phaseDraft[field as keyof PhaseDraft]} onChange={(e) => setPhaseDraft({...phaseDraft, [field]: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={savePhase} disabled={saving} className="rounded-2xl bg-health-green px-5 py-3 font-bold text-white disabled:opacity-60">{isAr ? 'حفظ المرحلة' : 'Save phase'}</button>
                <button type="button" onClick={removePhase} className="rounded-2xl border border-rose-200 px-5 py-3 font-bold text-rose-600">{isAr ? 'حذف المرحلة' : 'Delete phase'}</button>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black text-slate-900">{isAr ? 'المكملات' : 'Supplements'}</h3>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!selectedPhase) return;
                        try {
                          await createSupplement(newSupplement(selectedPhase.id, supplements.length + 1));
                          await loadRelated(selectedPhase.id);
                          onNotice(isAr ? 'تمت إضافة مكمل.' : 'Supplement added.');
                        } catch (error) {
                          onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
                        }
                      }}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700"
                    >
                      {isAr ? 'إضافة' : 'Add'}
                    </button>
                  </div>

                  {supplements.length ? supplements.map((supplement) => (
                    <div key={supplement.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <input value={supplement.name} onChange={(e) => setSupplements((current) => current.map((item) => item.id === supplement.id ? {...item, name: e.target.value} : item))} placeholder="Name" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={supplement.dose_en} onChange={(e) => setSupplements((current) => current.map((item) => item.id === supplement.id ? {...item, dose_en: e.target.value} : item))} placeholder="Dose (EN)" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={supplement.dose_ar} onChange={(e) => setSupplements((current) => current.map((item) => item.id === supplement.id ? {...item, dose_ar: e.target.value} : item))} placeholder="Dose (AR)" dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <textarea value={supplement.reason_en} onChange={(e) => setSupplements((current) => current.map((item) => item.id === supplement.id ? {...item, reason_en: e.target.value} : item))} placeholder="Reason (EN)" rows={3} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <textarea value={supplement.reason_ar} onChange={(e) => setSupplements((current) => current.map((item) => item.id === supplement.id ? {...item, reason_ar: e.target.value} : item))} placeholder="Reason (AR)" rows={3} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await updateSupplement(supplement.id, supplement);
                              onNotice(isAr ? 'تم حفظ المكمل.' : 'Supplement saved.');
                            } catch (error) {
                              onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
                            }
                          }}
                          className="rounded-xl bg-health-green px-4 py-2 text-sm font-bold text-white"
                        >
                          {isAr ? 'حفظ' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirmText(isAr ? 'حذف هذا المكمل؟' : 'Delete this supplement?')) return;
                            try {
                              await deleteSupplement(supplement.id);
                              if (selectedPhase) await loadRelated(selectedPhase.id);
                              onNotice(isAr ? 'تم حذف المكمل.' : 'Supplement deleted.');
                            } catch (error) {
                              onNotice(getSupabaseActionErrorMessage(error, lang, 'delete'));
                            }
                          }}
                          className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600"
                        >
                          {isAr ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                      {isAr ? 'لا توجد مكملات بعد.' : 'No supplements yet.'}
                    </div>
                  )}
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black text-slate-900">{isAr ? 'الوجبات' : 'Meals'}</h3>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!selectedPhase) return;
                        try {
                          await createMeal(newMeal(selectedPhase.id));
                          await loadRelated(selectedPhase.id);
                          onNotice(isAr ? 'تمت إضافة وجبة.' : 'Meal added.');
                        } catch (error) {
                          onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
                        }
                      }}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700"
                    >
                      {isAr ? 'إضافة' : 'Add'}
                    </button>
                  </div>

                  {meals.length ? meals.map((meal) => (
                    <div key={meal.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <input value={meal.diet_style} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, diet_style: e.target.value} : item))} placeholder="Diet style" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.breakfast_en} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, breakfast_en: e.target.value} : item))} placeholder="Breakfast (EN)" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.breakfast_ar} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, breakfast_ar: e.target.value} : item))} placeholder="Breakfast (AR)" dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.lunch_en} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, lunch_en: e.target.value} : item))} placeholder="Lunch (EN)" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.lunch_ar} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, lunch_ar: e.target.value} : item))} placeholder="Lunch (AR)" dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.dinner_en} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, dinner_en: e.target.value} : item))} placeholder="Dinner (EN)" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.dinner_ar} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, dinner_ar: e.target.value} : item))} placeholder="Dinner (AR)" dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.snack_en || ''} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, snack_en: e.target.value} : item))} placeholder="Snack (EN)" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <input value={meal.snack_ar || ''} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, snack_ar: e.target.value} : item))} placeholder="Snack (AR)" dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <textarea value={listToText(meal.shopping_list_en)} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, shopping_list_en: textToList(e.target.value)} : item))} placeholder="Shopping list (EN)" rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <textarea value={listToText(meal.shopping_list_ar)} onChange={(e) => setMeals((current) => current.map((item) => item.id === meal.id ? {...item, shopping_list_ar: textToList(e.target.value)} : item))} placeholder="Shopping list (AR)" rows={4} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await updateMeal(meal.id, meal);
                              onNotice(isAr ? 'تم حفظ الوجبة.' : 'Meal saved.');
                            } catch (error) {
                              onNotice(getSupabaseActionErrorMessage(error, lang, 'save'));
                            }
                          }}
                          className="rounded-xl bg-health-green px-4 py-2 text-sm font-bold text-white"
                        >
                          {isAr ? 'حفظ' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!confirmText(isAr ? 'حذف هذه الوجبة؟' : 'Delete this meal?')) return;
                            try {
                              await deleteMeal(meal.id);
                              if (selectedPhase) await loadRelated(selectedPhase.id);
                              onNotice(isAr ? 'تم حذف الوجبة.' : 'Meal deleted.');
                            } catch (error) {
                              onNotice(getSupabaseActionErrorMessage(error, lang, 'delete'));
                            }
                          }}
                          className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600"
                        >
                          {isAr ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
                      {isAr ? 'لا توجد وجبات بعد.' : 'No meals yet.'}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
              {isAr ? 'اختر مرحلة.' : 'Select a phase.'}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function AdminInjuryManager() {
  const uiLang = usePreferredLang();
  const isAr = uiLang === 'ar';
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [notice, setNotice] = useState('');
  const [injuries, setInjuries] = useState<InjuryRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<InjuryDraft | null>(null);
  const [search, setSearch] = useState('');

  const adminEmail = getArticleAdminEmail();
  const selectedInjury = useMemo(
    () => injuries.find((item) => item.id === selectedId) ?? injuries[0] ?? null,
    [injuries, selectedId],
  );
  const filteredInjuries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return injuries;
    return injuries.filter((injury) =>
      [injury.name_en, injury.name_ar, injury.category, injury.injury_id_slug].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [injuries, search]);

  const loadInjuries = async (preferredId?: string | null) => {
    setLoading(true);
    const rows = await fetchInjuriesFromSupabase();
    setInjuries(rows);
    setSelectedId(
      preferredId && rows.some((item) => item.id === preferredId) ? preferredId : rows[0]?.id ?? null,
    );
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        setAuthChecked(true);
        return;
      }
      try {
        const currentUser = await getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);
        setIsAdmin(await canManageInjuries(currentUser));
      } catch {
        if (!mounted) return;
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (mounted) setAuthChecked(true);
      }
    };

    void bootstrap();

    if (!isSupabaseConfigured) return () => void 0;

    const {data} = onSupabaseAuthChange(async (_, session) => {
      if (!mounted) return;
      const nextUser = session?.user || null;
      setUser(nextUser);
      setIsAdmin(await canManageInjuries(nextUser));
      setAuthChecked(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) void loadInjuries();
  }, [isAdmin]);

  useEffect(() => {
    setDraft(selectedInjury ? mapInjuryDraft(selectedInjury) : null);
  }, [selectedInjury]);

  if (!isSupabaseConfigured) {
    return decodeNodeTree(
      <>
        <Seo
          title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}
          description={getSupabaseConfigurationMessage(uiLang)}
          canonicalPath="/admin/injuries"
          noIndex
        />
        <PageLayout title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}>
          <p>{getSupabaseConfigurationMessage(uiLang)}</p>
        </PageLayout>
      </>
    );
  }

  if (!authChecked) {
    return decodeNodeTree(
      <>
        <Seo
          title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}
          description={isAr ? 'جار التحقق من الصلاحية.' : 'Checking access.'}
          canonicalPath="/admin/injuries"
          noIndex
        />
        <PageLayout title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}>
          <p>{isAr ? 'جار التحقق من صلاحيتك...' : 'Checking your access...'}</p>
        </PageLayout>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{from: '/admin/injuries'}} />;
  }

  if (!isAdmin) {
    return decodeNodeTree(
      <>
        <Seo
          title={isAr ? 'صفحة مقفولة' : 'Restricted'}
          description={isAr ? 'هذه الصفحة مقفولة.' : 'This page is restricted.'}
          canonicalPath="/admin/injuries"
          noIndex
        />
        <PageLayout title={isAr ? 'صفحة مقفولة' : 'Restricted'}>
          <p>{isAr ? 'هذه الصفحة متاحة لحساب الأدمن فقط.' : 'This studio is restricted to the admin account only.'}</p>
          <p>{isAr ? 'أنت مسجل الدخول بالحساب:' : 'Signed in as:'} <strong>{user.email}</strong></p>
          <p>{isAr ? 'إيميل الأدمن المضبوط:' : 'Configured admin email:'} <strong>{adminEmail || (isAr ? 'غير مضبوط' : 'not set')}</strong></p>
          <p>
            <Link to={`/${uiLang}/`} className="font-semibold text-health-green hover:underline">
              {isAr ? 'العودة للرئيسية' : 'Back home'}
            </Link>
          </p>
        </PageLayout>
      </>
    );
  }

  return decodeNodeTree(
    <>
      <Seo
        title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}
        description={isAr ? 'إدارة الإصابات من لوحة واحدة.' : 'Manage injury content from one admin page.'}
        canonicalPath="/admin/injuries"
        noIndex
      />
      <PageLayout title={isAr ? 'إدارة الإصابات' : 'Injury Studio'}>
        <div className="space-y-8">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-7 text-slate-700">
            <p>{isAr ? 'الصفحة دي بقت بنفس أسلوب ستوديو المقالات: صلاحيات واضحة، ولوحة تحرير أسهل للإضافة والتعديل.' : 'This page now follows the article studio style with clearer access control and easier editing.'}</p>
          </div>

          {isArticleAdminUser(user) ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
              <p>
                {isAr
                  ? 'فتح صفحة الأدمن عبر VITE_ARTICLE_ADMIN_EMAIL لا يكفي وحده للكتابة داخل Supabase. يجب أن يكون نفس المستخدم موجودًا أيضًا في جدول public.admin_users، وإلا ستفشل عمليات الاستيراد والحفظ بسبب RLS.'
                  : 'Opening the admin page via VITE_ARTICLE_ADMIN_EMAIL is not enough to write to Supabase. The same user must also exist in public.admin_users, otherwise imports and saves will fail because of RLS.'}
              </p>
              <p>
                {isAr
                  ? 'نفّذ جزء سياسات admin_users الموجود في ملف supabase/schema.sql داخل SQL Editor في Supabase بعد التأكد أن هذا البريد أنشأ حسابًا وسجّل الدخول.'
                  : 'Run the admin_users policy section from supabase/schema.sql in the Supabase SQL Editor after making sure this email has created an account and signed in.'}
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  setSaving(true);
                  const created = await createInjury(newInjuryDraft(injuries.length + 1));
                  await loadInjuries(created.id);
                  setNotice(isAr ? 'تمت إضافة إصابة جديدة.' : 'New injury added.');
                } catch (error) {
                  setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                } finally {
                  setSaving(false);
                }
              }}
              className="rounded-2xl bg-health-green px-4 py-2 text-sm font-bold text-white"
            >
              <Plus className="mr-2 inline h-4 w-4" />
              {isAr ? 'إصابة جديدة' : 'New injury'}
            </button>

            <button
              type="button"
              disabled={!selectedInjury}
              onClick={async () => {
                if (!selectedInjury) return;
                try {
                  setSaving(true);
                  const created = await createInjury(decodeStringsDeep({
                    ...newInjuryDraft(injuries.length + 1),
                    injury_id_slug: `${selectedInjury.injury_id_slug}-copy`,
                    name_en: `${selectedInjury.name_en} Copy`,
                    name_ar: `${selectedInjury.name_ar} نسخة`,
                    category: selectedInjury.category,
                    body_region_en: selectedInjury.body_region_en,
                    body_region_ar: selectedInjury.body_region_ar,
                    overview_en: selectedInjury.overview_en,
                    overview_ar: selectedInjury.overview_ar,
                    rehab_summary_en: selectedInjury.rehab_summary_en,
                    rehab_summary_ar: selectedInjury.rehab_summary_ar,
                    common_in: selectedInjury.common_in,
                    red_flags: selectedInjury.red_flags,
                    related_calculators: selectedInjury.related_calculators,
                  }));
                  await loadInjuries(created.id);
                  setNotice(isAr ? 'تم إنشاء نسخة من الإصابة.' : 'Injury duplicated.');
                } catch (error) {
                  setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                } finally {
                  setSaving(false);
                }
              }}
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
            >
              <CopyPlus className="mr-2 inline h-4 w-4" />
              {isAr ? 'نسخ الإصابة' : 'Duplicate'}
            </button>

            <button
              type="button"
              onClick={async () => {
                if (!confirmText(isAr ? 'استيراد الإصابات القديمة الآن؟' : 'Import legacy injuries now?')) return;
                try {
                  setMigrating(true);
                  const result = await migrateAllInjuriesToSupabase();
                  await loadInjuries(selectedId);
                  if (result.successCount === 0) {
                    const firstError = result.errors[0]?.message;
                    setNotice(
                      isAr
                        ? `لم يتم استيراد أي بيانات${firstError ? `: ${firstError}` : '.'}`
                        : `No legacy data was imported${firstError ? `: ${firstError}` : '.'}`,
                    );
                  } else if (result.errorCount > 0) {
                    setNotice(
                      isAr
                        ? `تم استيراد ${result.successCount} من ${result.totalCount}، وتعذر استيراد ${result.errorCount}.`
                        : `Imported ${result.successCount} of ${result.totalCount}, and ${result.errorCount} failed.`,
                    );
                  } else {
                    setNotice(
                      isAr
                        ? `تم استيراد ${result.successCount} من البيانات القديمة.`
                        : `Imported ${result.successCount} legacy records.`,
                    );
                  }
                } catch (error) {
                  setNotice(error instanceof Error ? error.message : isAr ? 'فشل الاستيراد.' : 'Import failed.');
                } finally {
                  setMigrating(false);
                }
              }}
              className="rounded-2xl border border-amber-300 px-4 py-2 text-sm font-bold text-amber-700"
            >
              <FileDown className="mr-2 inline h-4 w-4" />
              {migrating ? (isAr ? 'جار الاستيراد...' : 'Importing...') : isAr ? 'استيراد البيانات القديمة' : 'Import legacy data'}
            </button>

            <span className="text-sm text-slate-500">{user.email}</span>
            {notice ? <span className="text-sm font-medium text-health-green">{notice}</span> : null}
          </div>

          <div className="grid gap-6 xl:grid-cols-[300px,minmax(0,1fr)]">
            <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{isAr ? 'الإصابات' : 'Injuries'}</div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={isAr ? 'ابحث عن إصابة...' : 'Search injuries...'}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-health-green"
              />
              <div className="space-y-2">
                {loading ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                    {isAr ? 'جار التحميل...' : 'Loading...'}
                  </div>
                ) : (
                  filteredInjuries.map((injury) => (
                    <button
                      key={injury.id}
                      type="button"
                      onClick={() => setSelectedId(injury.id)}
                      className={`w-full rounded-2xl border p-4 text-start transition ${selectedInjury?.id === injury.id ? 'border-health-green bg-white shadow-sm' : 'border-slate-200 bg-white/70'}`}
                    >
                      <div className="text-xs text-slate-400">{injury.category}</div>
                      <div className="font-bold text-slate-900">{isAr ? injury.name_ar || injury.name_en : injury.name_en}</div>
                      <div className="mt-1 text-xs text-slate-500">{injury.injury_id_slug}</div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6">
              {selectedInjury && draft ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-2xl font-black text-slate-900">{isAr ? draft.name_ar || draft.name_en : draft.name_en}</div>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={buildInjuryPublicPath(uiLang, draft.injury_id_slug)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-700"
                      >
                        {isAr ? 'معاينة الصفحة' : 'Preview page'}
                      </a>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setSaving(true);
                            await updateInjury(selectedInjury.id, {
                              injury_id_slug: draft.injury_id_slug,
                              name_en: draft.name_en,
                              name_ar: draft.name_ar,
                              category: draft.category,
                              body_region_en: draft.body_region_en,
                              body_region_ar: draft.body_region_ar,
                              overview_en: draft.overview_en,
                              overview_ar: draft.overview_ar,
                              rehab_summary_en: draft.rehab_summary_en,
                              rehab_summary_ar: draft.rehab_summary_ar,
                              common_in: textToList(draft.common_in_text),
                              red_flags: textToList(draft.red_flags_text),
                              related_calculators: textToList(draft.related_calculators_text),
                            });
                            await loadInjuries(selectedInjury.id);
                            setNotice(isAr ? 'تم حفظ الإصابة.' : 'Injury saved.');
                          } catch (error) {
                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                          } finally {
                            setSaving(false);
                          }
                        }}
                        disabled={saving}
                        className="rounded-2xl bg-health-green px-5 py-3 font-bold text-white disabled:opacity-60"
                      >
                        <Save className="mr-2 inline h-4 w-4" />
                        {isAr ? 'حفظ التعديلات' : 'Save changes'}
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (!confirmText(isAr ? 'حذف هذه الإصابة؟' : 'Delete this injury?')) return;
                          try {
                            await deleteInjury(selectedInjury.id);
                            await loadInjuries();
                            setNotice(isAr ? 'تم حذف الإصابة.' : 'Injury deleted.');
                          } catch (error) {
                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'delete'));
                          }
                        }}
                        className="rounded-2xl border border-rose-200 px-5 py-3 font-bold text-rose-600"
                      >
                        <Trash2 className="mr-2 inline h-4 w-4" />
                        {isAr ? 'حذف الإصابة' : 'Delete injury'}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">Slug</span>
                      <div className="flex gap-2">
                        <input value={draft.injury_id_slug} onChange={(e) => setDraft({...draft, injury_id_slug: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" />
                        <button
                          type="button"
                          onClick={() => setDraft({...draft, injury_id_slug: slugifyArticleTitle(draft.name_en).replace(/-/g, '_')})}
                          className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
                        >
                          {isAr ? 'توليد' : 'Generate'}
                        </button>
                      </div>
                    </label>
                    <label className="space-y-2"><span className="text-sm font-bold text-slate-700">{isAr ? 'التصنيف' : 'Category'}</span><input value={draft.category} onChange={(e) => setDraft({...draft, category: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                    <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Name (EN)</span><input value={draft.name_en} onChange={(e) => setDraft({...draft, name_en: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                    <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Name (AR)</span><input value={draft.name_ar} onChange={(e) => setDraft({...draft, name_ar: e.target.value})} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                    <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Body Region (EN)</span><input value={draft.body_region_en} onChange={(e) => setDraft({...draft, body_region_en: e.target.value})} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                    <label className="space-y-2"><span className="text-sm font-bold text-slate-700">Body Region (AR)</span><input value={draft.body_region_ar} onChange={(e) => setDraft({...draft, body_region_ar: e.target.value})} dir="rtl" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green" /></label>
                  </div>

                  <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          name_ar: draft.name_ar || draft.name_en,
                          body_region_ar: draft.body_region_ar || draft.body_region_en,
                          overview_ar: draft.overview_ar || draft.overview_en,
                          rehab_summary_ar: draft.rehab_summary_ar || draft.rehab_summary_en,
                        })
                      }
                      className="rounded-2xl border border-slate-300 px-4 py-2 font-bold text-slate-700"
                    >
                      {isAr ? 'املأ العربي من الإنجليزي' : 'Fill AR from EN'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          name_en: draft.name_en || draft.name_ar,
                          body_region_en: draft.body_region_en || draft.body_region_ar,
                          overview_en: draft.overview_en || draft.overview_ar,
                          rehab_summary_en: draft.rehab_summary_en || draft.rehab_summary_ar,
                        })
                      }
                      className="rounded-2xl border border-slate-300 px-4 py-2 font-bold text-slate-700"
                    >
                      {isAr ? 'املأ الإنجليزي من العربي' : 'Fill EN from AR'}
                    </button>
                  </div>

                  <SectionField label="Overview (EN)" value={draft.overview_en} onChange={(value) => setDraft({...draft, overview_en: value})} rows={5} />
                  <SectionField label="Overview (AR)" value={draft.overview_ar} onChange={(value) => setDraft({...draft, overview_ar: value})} rows={5} dir="rtl" />
                  <SectionField label="Rehab Summary (EN)" value={draft.rehab_summary_en} onChange={(value) => setDraft({...draft, rehab_summary_en: value})} rows={5} />
                  <SectionField label="Rehab Summary (AR)" value={draft.rehab_summary_ar} onChange={(value) => setDraft({...draft, rehab_summary_ar: value})} rows={5} dir="rtl" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <SectionField label={isAr ? 'تظهر غالبًا في' : 'Common in'} value={draft.common_in_text} onChange={(value) => setDraft({...draft, common_in_text: value})} rows={6} />
                    <SectionField label={isAr ? 'العلامات التحذيرية' : 'Red flags'} value={draft.red_flags_text} onChange={(value) => setDraft({...draft, red_flags_text: value})} rows={6} />
                    <SectionField label={isAr ? 'الحاسبات المرتبطة' : 'Related calculators'} value={draft.related_calculators_text} onChange={(value) => setDraft({...draft, related_calculators_text: value})} rows={6} />
                  </div>

                  <PhaseStudio injuryId={selectedInjury.id} lang={uiLang} onNotice={setNotice} />
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                  {isAr ? 'اختر إصابة من القائمة.' : 'Select an injury from the list.'}
                </div>
              )}
            </section>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
