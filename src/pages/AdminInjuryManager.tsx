import {useEffect, useMemo, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {Plus, RefreshCcw, Save, Trash2} from 'lucide-react';
import Seo from '../components/seo/Seo';
import AdminShell from '../components/admin/AdminShell';
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
  createRehabExercise,
  createRehabPhase,
  createRehabProtocol,
  deleteRehabExercise,
  deleteRehabPhase,
  deleteRehabProtocol,
  fetchRehabExercisesByPhaseIds,
  fetchRehabPhasesByProtocolId,
  fetchRehabProtocolsFromSupabase,
  getLastRehabProtocolSource,
  getRehabProtocolSlug,
  updateRehabExercise,
  updateRehabPhase,
  updateRehabProtocol,
  type RehabExerciseRow,
  type RehabPhaseRow,
  type RehabProtocolRow,
} from '../services/rehabProtocolSupabaseService';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

function textToList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToText(value?: string[] | null) {
  return (value || []).join('\n');
}

function confirmText(message: string) {
  return window.confirm(message);
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

function nextNumericId(items: Array<{id: number}>) {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

type ProtocolDraft = {
  name: string;
  category: string;
  description: string;
};

type PhaseDraft = {
  title: string;
  timeline: string;
  goals: string;
  precautions: string;
  criteriaToProgress: string;
};

type ExerciseDraft = {
  id: number;
  name: string;
  parameters: string;
  clinicalCueRationale: string;
};

function mapProtocolDraft(protocol: RehabProtocolRow): ProtocolDraft {
  return {
    name: protocol.name,
    category: protocol.category,
    description: protocol.description || '',
  };
}

function mapPhaseDraft(phase: RehabPhaseRow): PhaseDraft {
  return {
    title: phase.title,
    timeline: phase.timeline || '',
    goals: listToText(phase.goals),
    precautions: listToText(phase.precautions),
    criteriaToProgress: listToText(phase.criteria_to_progress),
  };
}

function mapExerciseDraft(exercise: RehabExerciseRow): ExerciseDraft {
  return {
    id: exercise.id,
    name: exercise.name,
    parameters: exercise.parameters || '',
    clinicalCueRationale: exercise.clinical_cue_rationale || '',
  };
}

export default function AdminInjuryManager() {
  const uiLang = usePreferredLang();
  const isAr = uiLang === 'ar';
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [protocols, setProtocols] = useState<RehabProtocolRow[]>([]);
  const [selectedProtocolId, setSelectedProtocolId] = useState<number | null>(null);
  const [protocolDraft, setProtocolDraft] = useState<ProtocolDraft | null>(null);
  const [phases, setPhases] = useState<RehabPhaseRow[]>([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  const [phaseDraft, setPhaseDraft] = useState<PhaseDraft | null>(null);
  const [exerciseDrafts, setExerciseDrafts] = useState<ExerciseDraft[]>([]);
  const [source, setSource] = useState<'supabase' | 'generated'>('generated');

  const selectedProtocol = useMemo(
    () => protocols.find((item) => item.id === selectedProtocolId) ?? protocols[0] ?? null,
    [protocols, selectedProtocolId],
  );

  const filteredProtocols = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return protocols;
    return protocols.filter((protocol) => {
      const haystack = `${protocol.name} ${protocol.category} ${protocol.description || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [protocols, search]);

  const selectedPhase = useMemo(
    () => phases.find((item) => item.id === selectedPhaseId) ?? phases[0] ?? null,
    [phases, selectedPhaseId],
  );

  const loadProtocols = async (preferredId?: number | null) => {
    setLoading(true);
    try {
      const rows = await fetchRehabProtocolsFromSupabase();
      const activeId = preferredId && rows.some((item) => item.id === preferredId) ? preferredId : rows[0]?.id ?? null;
      setProtocols(rows);
      setSelectedProtocolId(activeId);
      setSource(getLastRehabProtocolSource());
    } catch (error) {
      setNotice(getSupabaseActionErrorMessage(error, uiLang, 'load'));
    } finally {
      setLoading(false);
    }
  };

  const loadPhases = async (protocolId: number, preferredPhaseId?: number | null) => {
    const rows = await fetchRehabPhasesByProtocolId(protocolId);
    const activeId =
      preferredPhaseId && rows.some((item) => item.id === preferredPhaseId) ? preferredPhaseId : rows[0]?.id ?? null;
    setPhases(rows);
    setSelectedPhaseId(activeId);
  };

  const loadExercises = async (phaseId: number) => {
    const rows = await fetchRehabExercisesByPhaseIds([phaseId]);
    setExerciseDrafts(rows.map(mapExerciseDraft));
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      if (!isSupabaseConfigured) {
        setAuthLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!active) return;
        setUser(currentUser);
        setCanEdit(await canManageInjuries(currentUser));
      } catch {
        if (!active) return;
        setUser(null);
        setCanEdit(false);
      } finally {
        if (active) setAuthLoading(false);
      }
    };

    void init();

    const {data} = onSupabaseAuthChange(async (_event, session) => {
      const nextUser = session?.user || null;
      setUser(nextUser);
      setCanEdit(await canManageInjuries(nextUser));
      setAuthLoading(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!canEdit) return;
    void loadProtocols();
  }, [canEdit]);

  useEffect(() => {
    if (!selectedProtocol) {
      setProtocolDraft(null);
      setPhases([]);
      setSelectedPhaseId(null);
      return;
    }

    setProtocolDraft(mapProtocolDraft(selectedProtocol));
    void loadPhases(selectedProtocol.id);
  }, [selectedProtocol?.id]);

  useEffect(() => {
    if (!selectedPhase) {
      setPhaseDraft(null);
      setExerciseDrafts([]);
      return;
    }

    setPhaseDraft(mapPhaseDraft(selectedPhase));
    void loadExercises(selectedPhase.id);
  }, [selectedPhase?.id]);

  if (!isSupabaseConfigured) {
    return (
      <PageLayout title="Admin">
        <Seo title="Admin" description="Supabase setup required" canonicalPath="/admin/injuries" />
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          {getSupabaseConfigurationMessage(uiLang)}
        </div>
      </PageLayout>
    );
  }

  if (authLoading) {
    return (
      <PageLayout title="Admin">
        <Seo title="Admin" description="Loading admin access" canonicalPath="/admin/injuries" />
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          {isAr ? 'جار التحقق من صلاحية الإدارة...' : 'Checking admin access...'}
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{from: '/admin/injuries'}} />;
  }

  if (!canEdit) {
    return (
      <PageLayout title="Admin">
        <Seo title="Admin" description="Access denied" canonicalPath="/admin/injuries" />
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          {isAr
            ? `الحساب ${user.email || getArticleAdminEmail()} لا يملك صلاحية إدارة البروتوكولات.`
            : `The account ${user.email || getArticleAdminEmail()} does not have protocol-management access.`}
        </div>
      </PageLayout>
    );
  }

  const saveProtocol = async () => {
    if (!selectedProtocol || !protocolDraft) return;
    try {
      setSaving(true);
      await updateRehabProtocol(selectedProtocol.id, {
        name: protocolDraft.name,
        category: protocolDraft.category,
        description: protocolDraft.description || null,
      });
      await loadProtocols(selectedProtocol.id);
      setNotice(isAr ? 'تم حفظ البروتوكول.' : 'Protocol saved.');
    } catch (error) {
      setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
    } finally {
      setSaving(false);
    }
  };

  const savePhase = async () => {
    if (!selectedPhase || !phaseDraft) return;
    try {
      setSaving(true);
      await updateRehabPhase(selectedPhase.id, {
        title: phaseDraft.title,
        timeline: phaseDraft.timeline || null,
        goals: textToList(phaseDraft.goals),
        precautions: textToList(phaseDraft.precautions),
        criteria_to_progress: textToList(phaseDraft.criteriaToProgress),
      });
      await loadPhases(selectedProtocol!.id, selectedPhase.id);
      setNotice(isAr ? 'تم حفظ المرحلة.' : 'Phase saved.');
    } catch (error) {
      setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Seo
        title={isAr ? 'إدارة بروتوكولات الإصابات' : 'Injury Protocol Admin'}
        description={
          isAr
            ? 'إدارة مكتبة البروتوكولات الجديدة المرتبطة مباشرة بجداول Supabase.'
            : 'Manage the new injury protocol library directly from the Supabase protocol tables.'
        }
        canonicalPath="/admin/injuries"
      />

      <AdminShell
        title={isAr ? 'إدارة بروتوكولات الإصابات' : 'Injury protocol admin'}
        description={
          isAr
            ? 'هذه اللوحة تعدل جداول البروتوكولات الجديدة نفسها: البروتوكول، المراحل، والتمارين.'
            : 'This workspace edits the new protocol tables directly: protocol, phases, and exercises.'
        }
        currentTab="injuries"
        user={user}
        canManageInjuries={canEdit}
        canManageArticles={isArticleAdminUser(user)}
      >
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                {isAr ? 'مصدر القراءة الحالي' : 'Current read source'}
              </div>
              <div className="mt-2 text-lg font-black text-slate-900">
                {source === 'supabase'
                  ? isAr
                    ? 'Supabase مباشر'
                    : 'Direct Supabase'
                  : isAr
                    ? 'Fallback من JSON'
                    : 'JSON fallback'}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {isAr
                  ? `${protocols.length} بروتوكول ظاهر في لوحة الإدارة الآن.`
                  : `${protocols.length} protocols are visible in admin right now.`}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void loadProtocols(selectedProtocolId)}
                className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
              >
                <RefreshCcw className="mr-2 inline h-4 w-4" />
                {isAr ? 'تحديث' : 'Refresh'}
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    setSaving(true);
                    const created = await createRehabProtocol({
                      id: nextNumericId(protocols),
                      name: `New Protocol ${protocols.length + 1}`,
                      category: 'General',
                      description: null,
                    });
                    await loadProtocols(created.id);
                    setNotice(isAr ? 'تم إنشاء بروتوكول جديد.' : 'New protocol created.');
                  } catch (error) {
                    setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                  } finally {
                    setSaving(false);
                  }
                }}
                className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
              >
                <Plus className="mr-2 inline h-4 w-4" />
                {isAr ? 'إضافة بروتوكول' : 'Add protocol'}
              </button>
            </div>
          </div>

          {notice ? <div className="mt-4 rounded-2xl border border-health-green/20 bg-health-green/5 px-4 py-3 text-sm text-health-green-dark">{notice}</div> : null}
        </section>

        <div className="grid gap-6 xl:grid-cols-[280px,minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isAr ? 'ابحث عن بروتوكول...' : 'Search protocols...'}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-health-green"
            />

            <div className="space-y-2">
              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
                  {isAr ? 'جار التحميل...' : 'Loading...'}
                </div>
              ) : (
                filteredProtocols.map((protocol) => (
                  <button
                    key={protocol.id}
                    type="button"
                    onClick={() => setSelectedProtocolId(protocol.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedProtocol?.id === protocol.id
                        ? 'border-health-green bg-white shadow-sm'
                        : 'border-slate-200 bg-white/70'
                    }`}
                  >
                    <div className="text-xs text-slate-400">{protocol.category}</div>
                    <div className="font-bold text-slate-900">{protocol.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{getRehabProtocolSlug(protocol.name)}</div>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="space-y-6">
            {selectedProtocol && protocolDraft ? (
              <>
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-2xl font-black text-slate-900">{selectedProtocol.name}</div>
                      <div className="mt-1 text-sm text-slate-500">{getRehabProtocolSlug(selectedProtocol.name)}</div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/${uiLang}/injuries/${getRehabProtocolSlug(protocolDraft.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
                      >
                        {isAr ? 'معاينة الصفحة' : 'Preview page'}
                      </Link>
                      <button
                        type="button"
                        onClick={() => void saveProtocol()}
                        disabled={saving}
                        className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                      >
                        <Save className="mr-2 inline h-4 w-4" />
                        {isAr ? 'حفظ البروتوكول' : 'Save protocol'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!confirmText(isAr ? 'حذف هذا البروتوكول؟' : 'Delete this protocol?')) return;
                          try {
                            await deleteRehabProtocol(selectedProtocol.id);
                            await loadProtocols();
                            setNotice(isAr ? 'تم حذف البروتوكول.' : 'Protocol deleted.');
                          } catch (error) {
                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'delete'));
                          }
                        }}
                        className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-bold text-rose-600"
                      >
                        <Trash2 className="mr-2 inline h-4 w-4" />
                        {isAr ? 'حذف' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{isAr ? 'اسم البروتوكول' : 'Protocol name'}</span>
                      <input
                        value={protocolDraft.name}
                        onChange={(event) => setProtocolDraft({...protocolDraft, name: event.target.value})}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-bold text-slate-700">{isAr ? 'التصنيف/المنطقة' : 'Category / region'}</span>
                      <input
                        value={protocolDraft.category}
                        onChange={(event) => setProtocolDraft({...protocolDraft, category: event.target.value})}
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block space-y-2">
                    <span className="text-sm font-bold text-slate-700">{isAr ? 'وصف مختصر' : 'Short description'}</span>
                    <textarea
                      rows={4}
                      value={protocolDraft.description}
                      onChange={(event) => setProtocolDraft({...protocolDraft, description: event.target.value})}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
                    />
                  </label>
                </section>

                <section className="grid gap-6 xl:grid-cols-[260px,minmax(0,1fr)]">
                  <aside className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-black text-slate-900">{isAr ? 'المراحل' : 'Phases'}</div>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const created = await createRehabPhase({
                              id: nextNumericId(phases),
                              protocol_id: selectedProtocol.id,
                              phase_number: phases.length + 1,
                              title: isAr ? `المرحلة ${phases.length + 1}` : `Phase ${phases.length + 1}`,
                              timeline: null,
                              goals: [],
                              precautions: [],
                              criteria_to_progress: [],
                            });
                            await loadPhases(selectedProtocol.id, created.id);
                            setNotice(isAr ? 'تمت إضافة مرحلة.' : 'Phase added.');
                          } catch (error) {
                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                          }
                        }}
                        className="rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700"
                      >
                        <Plus className="mr-1 inline h-3.5 w-3.5" />
                        {isAr ? 'إضافة' : 'Add'}
                      </button>
                    </div>

                    {phases.map((phase) => (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => setSelectedPhaseId(phase.id)}
                        className={`w-full rounded-2xl border p-3 text-left transition ${
                          selectedPhase?.id === phase.id
                            ? 'border-health-green bg-white shadow-sm'
                            : 'border-slate-200 bg-white/70'
                        }`}
                      >
                        <div className="text-xs text-slate-400">
                          {isAr ? `مرحلة ${phase.phase_number}` : `Phase ${phase.phase_number}`}
                        </div>
                        <div className="font-bold text-slate-900">{phase.title}</div>
                        <div className="mt-1 text-xs text-slate-500">{phase.timeline || (isAr ? 'بدون توقيت' : 'No timeline')}</div>
                      </button>
                    ))}
                  </aside>

                  <div className="space-y-6">
                    {selectedPhase && phaseDraft ? (
                      <>
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="text-xl font-black text-slate-900">
                              {isAr ? `تحرير المرحلة ${selectedPhase.phase_number}` : `Edit phase ${selectedPhase.phase_number}`}
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => void savePhase()}
                                disabled={saving}
                                className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
                              >
                                <Save className="mr-2 inline h-4 w-4" />
                                {isAr ? 'حفظ المرحلة' : 'Save phase'}
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!confirmText(isAr ? 'حذف هذه المرحلة؟' : 'Delete this phase?')) return;
                                  try {
                                    await deleteRehabPhase(selectedPhase.id);
                                    await loadPhases(selectedProtocol.id);
                                    setNotice(isAr ? 'تم حذف المرحلة.' : 'Phase deleted.');
                                  } catch (error) {
                                    setNotice(getSupabaseActionErrorMessage(error, uiLang, 'delete'));
                                  }
                                }}
                                className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-bold text-rose-600"
                              >
                                <Trash2 className="mr-2 inline h-4 w-4" />
                                {isAr ? 'حذف المرحلة' : 'Delete phase'}
                              </button>
                            </div>
                          </div>

                          <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <label className="space-y-2">
                              <span className="text-sm font-bold text-slate-700">{isAr ? 'عنوان المرحلة' : 'Phase title'}</span>
                              <input
                                value={phaseDraft.title}
                                onChange={(event) => setPhaseDraft({...phaseDraft, title: event.target.value})}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                              />
                            </label>
                            <label className="space-y-2">
                              <span className="text-sm font-bold text-slate-700">{isAr ? 'التوقيت' : 'Timeline'}</span>
                              <input
                                value={phaseDraft.timeline}
                                onChange={(event) => setPhaseDraft({...phaseDraft, timeline: event.target.value})}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                              />
                            </label>
                          </div>

                          <div className="mt-4 grid gap-4 md:grid-cols-3">
                            <label className="space-y-2">
                              <span className="text-sm font-bold text-slate-700">{isAr ? 'الأهداف' : 'Goals'}</span>
                              <textarea
                                rows={8}
                                value={phaseDraft.goals}
                                onChange={(event) => setPhaseDraft({...phaseDraft, goals: event.target.value})}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
                              />
                            </label>
                            <label className="space-y-2">
                              <span className="text-sm font-bold text-slate-700">{isAr ? 'المحاذير' : 'Precautions'}</span>
                              <textarea
                                rows={8}
                                value={phaseDraft.precautions}
                                onChange={(event) => setPhaseDraft({...phaseDraft, precautions: event.target.value})}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
                              />
                            </label>
                            <label className="space-y-2">
                              <span className="text-sm font-bold text-slate-700">{isAr ? 'معايير التقدم' : 'Criteria to progress'}</span>
                              <textarea
                                rows={8}
                                value={phaseDraft.criteriaToProgress}
                                onChange={(event) => setPhaseDraft({...phaseDraft, criteriaToProgress: event.target.value})}
                                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
                              />
                            </label>
                          </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="text-xl font-black text-slate-900">{isAr ? 'تمارين المرحلة' : 'Phase exercises'}</div>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await createRehabExercise({
                                    id: nextNumericId(exerciseDrafts),
                                    phase_id: selectedPhase.id,
                                    name: isAr ? 'تمرين جديد' : 'New Exercise',
                                    parameters: null,
                                    clinical_cue_rationale: null,
                                  });
                                  await loadExercises(selectedPhase.id);
                                  setNotice(isAr ? 'تمت إضافة تمرين.' : 'Exercise added.');
                                } catch (error) {
                                  setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                                }
                              }}
                              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"
                            >
                              <Plus className="mr-2 inline h-4 w-4" />
                              {isAr ? 'إضافة تمرين' : 'Add exercise'}
                            </button>
                          </div>

                          <div className="mt-5 space-y-4">
                            {exerciseDrafts.length ? (
                              exerciseDrafts.map((exercise) => (
                                <div key={exercise.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),180px]">
                                    <div className="space-y-4">
                                      <label className="space-y-2 block">
                                        <span className="text-sm font-bold text-slate-700">{isAr ? 'اسم التمرين' : 'Exercise name'}</span>
                                        <input
                                          value={exercise.name}
                                          onChange={(event) =>
                                            setExerciseDrafts((current) =>
                                              current.map((item) =>
                                                item.id === exercise.id ? {...item, name: event.target.value} : item,
                                              ),
                                            )
                                          }
                                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                                        />
                                      </label>

                                      <label className="space-y-2 block">
                                        <span className="text-sm font-bold text-slate-700">{isAr ? 'الجرعة / الوصف' : 'Dose / parameters'}</span>
                                        <input
                                          value={exercise.parameters}
                                          onChange={(event) =>
                                            setExerciseDrafts((current) =>
                                              current.map((item) =>
                                                item.id === exercise.id ? {...item, parameters: event.target.value} : item,
                                              ),
                                            )
                                          }
                                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-health-green"
                                        />
                                      </label>

                                      <label className="space-y-2 block">
                                        <span className="text-sm font-bold text-slate-700">{isAr ? 'ملاحظة تنفيذية' : 'Clinical cue'}</span>
                                        <textarea
                                          rows={3}
                                          value={exercise.clinicalCueRationale}
                                          onChange={(event) =>
                                            setExerciseDrafts((current) =>
                                              current.map((item) =>
                                                item.id === exercise.id
                                                  ? {...item, clinicalCueRationale: event.target.value}
                                                  : item,
                                              ),
                                            )
                                          }
                                          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-health-green"
                                        />
                                      </label>
                                    </div>

                                    <div className="flex flex-wrap gap-3 lg:flex-col">
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          try {
                                            await updateRehabExercise(exercise.id, {
                                              name: exercise.name,
                                              parameters: exercise.parameters || null,
                                              clinical_cue_rationale: exercise.clinicalCueRationale || null,
                                            });
                                            setNotice(isAr ? 'تم حفظ التمرين.' : 'Exercise saved.');
                                          } catch (error) {
                                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'save'));
                                          }
                                        }}
                                        className="rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
                                      >
                                        <Save className="mr-2 inline h-4 w-4" />
                                        {isAr ? 'حفظ' : 'Save'}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (!confirmText(isAr ? 'حذف هذا التمرين؟' : 'Delete this exercise?')) return;
                                          try {
                                            await deleteRehabExercise(exercise.id);
                                            await loadExercises(selectedPhase.id);
                                            setNotice(isAr ? 'تم حذف التمرين.' : 'Exercise deleted.');
                                          } catch (error) {
                                            setNotice(getSupabaseActionErrorMessage(error, uiLang, 'delete'));
                                          }
                                        }}
                                        className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-bold text-rose-600"
                                      >
                                        <Trash2 className="mr-2 inline h-4 w-4" />
                                        {isAr ? 'حذف' : 'Delete'}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                                {isAr ? 'لا توجد تمارين في هذه المرحلة بعد.' : 'No exercises in this phase yet.'}
                              </div>
                            )}
                          </div>
                        </section>
                      </>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                        {isAr ? 'اختر مرحلة من القائمة.' : 'Select a phase from the list.'}
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                {isAr ? 'اختر بروتوكولًا من القائمة.' : 'Select a protocol from the list.'}
              </div>
            )}
          </section>
        </div>
      </AdminShell>
    </>
  );
}
