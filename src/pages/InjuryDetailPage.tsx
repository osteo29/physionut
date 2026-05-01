import {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {Activity, AlertTriangle, ArrowRight, CheckCircle2, Clock3, Pill, ShieldAlert, Sparkles, Stethoscope} from 'lucide-react';
import {Link, Navigate, useParams} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import type {InjuryPhase, InjuryProtocol} from '../services/injuryDatabase';
import {getInjuryExerciseLinks} from '../services/injuryExerciseLinks';
import {getInjuryRehabLinks} from '../services/injuryRehabLinks';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
} from '../services/injuryLocalization';
import {
  getCatalogInjuries,
  getInjuryProtocolBySlugWithFallback,
  type InjuryCatalogEntry,
  type InjuryCatalogSource,
} from '../services/injuryService';
import {INJURY_CANONICAL_PARENT_MAP} from '../services/seoAliases';
import {decodeMojibake} from '../services/textEncoding';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

const DrugNutrientChecker = lazy(() => import('../components/ai/DrugNutrientChecker'));

function normalizeCopy(value: string) {
  return decodeMojibake(value);
}

function buildPath(id: string, lang: string) {
  return `/${lang}/injuries/${id.replace(/_/g, '-')}`;
}

function getSourceMeta(source: InjuryCatalogSource, isAr: boolean) {
  if (source === 'supabase') {
    return {
      label: isAr ? 'متصل بقاعدة البيانات' : 'Live Supabase data',
      description: isAr
        ? 'الصفحة معروضة من نفس بيانات الباك إند الحالية.'
        : 'This page is rendering from the current backend protocol record.',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    };
  }

  if (source === 'generated') {
    return {
      label: isAr ? 'بروتوكول مستورد' : 'Imported generated protocol',
      description: isAr
        ? 'تم استخدام البروتوكول المستورد مع تغذية وربط محليين عند الحاجة.'
        : 'The imported protocol is being used, with local nutrition enrichment when needed.',
      className: 'border-sky-200 bg-sky-50 text-sky-700',
    };
  }

  return {
    label: isAr ? 'وضع احتياطي محلي' : 'Local fallback',
    description: isAr
      ? 'تعذر الوصول للسجل البعيد، لذلك تم استخدام نسخة محلية للحفاظ على تماسك الصفحة.'
      : 'The remote record was unavailable, so the page is using the local fallback to stay consistent.',
    className: 'border-amber-200 bg-amber-50 text-amber-800',
  };
}

function renderBulletList(items: string[], tone: 'neutral' | 'success' | 'warning' | 'accent') {
  const dotClass =
    tone === 'success'
      ? 'text-emerald-500'
      : tone === 'warning'
        ? 'text-amber-500'
        : tone === 'accent'
          ? 'text-health-green'
          : 'text-slate-400';

  return (
    <ul className="space-y-3 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-1 text-base leading-none ${dotClass}`}>•</span>
          <span className="leading-7">{normalizeCopy(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function PhaseSummaryCard({
  phase,
  index,
  active,
  isAr,
  onClick,
}: {
  phase: InjuryPhase;
  index: number;
  active: boolean;
  isAr: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
        active
          ? 'border-health-green bg-health-green text-white shadow-lg shadow-health-green/20'
          : 'border-slate-200 bg-white text-slate-800 hover:border-health-green/30 hover:bg-health-green/5'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className={`text-xs font-bold uppercase tracking-[0.18em] ${active ? 'text-white/80' : 'text-slate-400'}`}>
          {isAr ? `المرحلة ${index + 1}` : `Phase ${index + 1}`}
        </div>
        <div className={`text-xs ${active ? 'text-white/80' : 'text-slate-500'}`}>{normalizeCopy(phase.duration)}</div>
      </div>
      <div className="mt-2 text-base font-black">{normalizeCopy(phase.label)}</div>
      <div className={`mt-2 text-sm leading-6 ${active ? 'text-white/90' : 'text-slate-600'}`}>
        {phase.focus ? normalizeCopy(phase.focus) : normalizeCopy(phase.goals[0] || '')}
      </div>
    </button>
  );
}

export default function InjuryDetailPage() {
  const {slug = ''} = useParams();
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [injury, setInjury] = useState<InjuryProtocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [catalogInjuries, setCatalogInjuries] = useState<InjuryCatalogEntry[]>([]);
  const [protocolSource, setProtocolSource] = useState<InjuryCatalogSource>('local');
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const [result, catalog] = await Promise.all([
        getInjuryProtocolBySlugWithFallback(slug, lang),
        getCatalogInjuries(lang),
      ]);

      if (!active) return;
      setInjury(result.injury);
      setProtocolSource(result.source);
      setCatalogInjuries(catalog.injuries);
      setLoading(false);
    };

    void load();
    return () => {
      active = false;
    };
  }, [lang, slug]);

  useEffect(() => {
    if (injury && activeTab > injury.phases.length) {
      setActiveTab(0);
    }
  }, [injury, activeTab]);

  if (!injury && !loading) {
    return <Navigate to={`/${lang}/injuries`} replace />;
  }

  if (!injury) {
    return (
      <PageLayout title={isAr ? 'جارٍ تحميل البروتوكول' : 'Loading protocol'}>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          {isAr ? 'جارٍ تحميل تفاصيل الإصابة...' : 'Loading injury details...'}
        </div>
      </PageLayout>
    );
  }

  const injuryDisplayName = getLocalizedInjuryName(injury.id, injury.name, lang);
  const categoryDisplay = getLocalizedCategory(injury.category, lang);
  const bodyRegionDisplay = getLocalizedBodyRegion(injury.bodyRegion, lang);
  const isNutritionTab = activeTab === injury.phases.length;
  const currentPhase = !isNutritionTab ? injury.phases[activeTab] : null;
  const sourceMeta = getSourceMeta(protocolSource, isAr);
  const medicationNotes = [...injury.safetyNotes.medications, ...injury.safetyNotes.supplements].map(normalizeCopy);
  const symptoms = injury.pageContent?.symptoms?.map(normalizeCopy) || [];
  const rehabNotes = injury.pageContent?.rehabNotes?.map(normalizeCopy) || [];
  const commonIn = injury.commonIn?.map(normalizeCopy).filter(Boolean) || [];

  const relatedInjuries = useMemo(
    () =>
      catalogInjuries
        .filter((item) => item.id !== injury.id)
        .filter((item) => item.category === categoryDisplay || item.bodyRegion === bodyRegionDisplay)
        .slice(0, 6),
    [bodyRegionDisplay, catalogInjuries, categoryDisplay, injury.id],
  );

  const relatedExerciseLinks = getInjuryExerciseLinks({
    injuryId: injury.id,
    bodyRegion: injury.bodyRegion,
    lang,
  });

  const relatedRehabLinks = getInjuryRehabLinks({
    injuryId: injury.id,
    bodyRegion: injury.bodyRegion,
    lang,
  });

  const askPhasePrompt = isAr
    ? `أنا في مرحلة التعافي من ${injuryDisplayName}. اشرح لي ماذا أركز عليه الآن، ما التمارين المناسبة، ومتى أستطيع الانتقال للمرحلة التالية؟`
    : `I am recovering from ${injuryDisplayName}. Explain what I should focus on now, which exercises fit this phase, and when I can move to the next phase.`;
  const askPhaseLink = `/${lang}/assistant?prompt=${encodeURIComponent(askPhasePrompt)}`;

  const faqItems =
    injury.pageContent?.faq?.length
      ? injury.pageContent.faq
      : [
          {
            q: isAr ? 'ما هو الهدف الأساسي من هذا البروتوكول؟' : 'What is the main goal of this protocol?',
            a: isAr
              ? 'التدرج الآمن في التحميل وإعادة الأنسجة لطبيعتها لتجنب الإصابة مرة أخرى.'
              : 'Gradual safe loading and restoring tissue capacity to prevent re-injury.',
          },
          {
            q: isAr ? 'متى أراجع طبيبًا؟' : 'When should I see a doctor?',
            a: isAr
              ? 'إذا زاد الألم بشكل حاد، أو ظهر تورم مفاجئ، أو عدم استقرار ملحوظ في المفصل.'
              : 'If you experience sharp pain, sudden swelling, or noticeable joint instability.',
          },
        ];

  const canonicalInjuryId = INJURY_CANONICAL_PARENT_MAP[injury.id] || injury.id;
  const canonicalPath = buildPath(canonicalInjuryId, lang);
  const labels = {
    title: isAr ? `بروتوكول ${injuryDisplayName}` : `${injuryDisplayName} Recovery Protocol`,
    description: isAr
      ? `خطة علاج وتأهيل متدرجة لـ ${injuryDisplayName} تشمل التمارين، التغذية، والمحاذير في كل مرحلة.`
      : `A phased rehab plan for ${injuryDisplayName} including exercises, nutrition support, and safety guidance.`,
  } as const;

  const hreflangs = [
    {lang: 'en', href: `https://physionutrition.vercel.app${buildPath(canonicalInjuryId, 'en')}`},
    {lang: 'ar', href: `https://physionutrition.vercel.app${buildPath(canonicalInjuryId, 'ar')}`},
  ];

  return (
    <>
      <Seo
        title={labels.title}
        description={labels.description}
        canonicalPath={canonicalPath}
        structuredData={[]}
        hreflangs={hreflangs}
      />
      <PageLayout title={labels.title}>
        <div className="space-y-8 not-prose">
          <section className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_35%),linear-gradient(145deg,#ffffff,#f8fafc)] p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${sourceMeta.className}`}>
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>{sourceMeta.label}</span>
                </div>

                <div>
                  <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">{injuryDisplayName}</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{normalizeCopy(injury.overview || labels.description)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {categoryDisplay}
                  </span>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {bodyRegionDisplay}
                  </span>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {injury.phases.length} {isAr ? 'مراحل' : 'phases'}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'ملخص الخطة' : 'Plan focus'}</div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                      {normalizeCopy(injury.rehabSummary || (currentPhase?.focus || ''))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'المخاطر المهمة' : 'Red flags'}</div>
                    <div className="mt-2 text-2xl font-black text-slate-900">{injury.redFlags.length}</div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'مصدر الداتا' : 'Data source'}</div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">{sourceMeta.description}</div>
                  </div>
                </div>

                {commonIn.length > 0 ? (
                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'شائعة في' : 'Common in'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {commonIn.map((item) => (
                        <span key={item} className="rounded-full border border-health-green/20 bg-health-green/10 px-3 py-1 text-sm font-medium text-health-green-dark">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                    <Sparkles className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'المرحلة الحالية' : 'Current focus'}</span>
                  </div>
                  <div className="mt-4 text-2xl font-black">
                    {isNutritionTab
                      ? isAr
                        ? 'التغذية والمكملات'
                        : 'Nutrition and supplements'
                      : currentPhase
                        ? normalizeCopy(currentPhase.label)
                        : ''}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-white/75">
                    {isNutritionTab
                      ? isAr
                        ? 'راجع نقاط التغذية، الوجبات، والمكملات الآمنة خلال التعافي.'
                        : 'Review recovery nutrition, meal examples, and supplement safety.'
                      : normalizeCopy(currentPhase?.focus || currentPhase?.goals[0] || '')}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={askPhaseLink}
                      className="inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white transition hover:bg-health-green-dark"
                    >
                      {isAr ? 'اسأل المساعد' : 'Ask the assistant'}
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActiveTab(injury.phases.length)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white/90 transition hover:bg-white/10"
                    >
                      <Pill className="h-4 w-4" />
                      {isAr ? 'افتح التغذية' : 'Open nutrition'}
                    </button>
                  </div>
                </div>

                {injury.redFlags.length > 0 ? (
                  <div className="rounded-[1.6rem] border border-amber-200 bg-amber-50 p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-2 text-sm font-black text-amber-900">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{isAr ? 'علامات تستدعي الانتباه' : 'Watch-outs'}</span>
                    </div>
                    {renderBulletList(injury.redFlags.map(normalizeCopy), 'warning')}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
            <aside className="space-y-4">
              <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="mb-3 text-sm font-black text-slate-900">{isAr ? 'مراحل التعافي' : 'Recovery phases'}</div>
                <div className="space-y-3">
                  {injury.phases.map((phase, index) => (
                    <PhaseSummaryCard
                      key={phase.id}
                      phase={phase}
                      index={index}
                      active={activeTab === index}
                      isAr={isAr}
                      onClick={() => setActiveTab(index)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setActiveTab(injury.phases.length)}
                    className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                      isNutritionTab
                        ? 'border-amber-400 bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <div className={`text-xs font-bold uppercase tracking-[0.18em] ${isNutritionTab ? 'text-white/80' : 'text-slate-400'}`}>
                      {isAr ? 'قسم إضافي' : 'Bonus section'}
                    </div>
                    <div className="mt-2 text-base font-black">{isAr ? 'التغذية والمكملات' : 'Nutrition and supplements'}</div>
                  </button>
                </div>
              </div>

              {(symptoms.length > 0 || rehabNotes.length > 0) && (
                <div className="rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'لمحة سريعة' : 'Quick context'}</div>
                  {symptoms.length > 0 ? (
                    <div className="mb-5">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'الأعراض' : 'Symptoms'}</div>
                      {renderBulletList(symptoms.slice(0, 4), 'neutral')}
                    </div>
                  ) : null}
                  {rehabNotes.length > 0 ? (
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'ملاحظات التأهيل' : 'Rehab notes'}</div>
                      {renderBulletList(rehabNotes.slice(0, 3), 'accent')}
                    </div>
                  ) : null}
                </div>
              )}
            </aside>

            <div className="space-y-6">
              {currentPhase ? (
                <>
                  <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          {isAr ? `المرحلة ${activeTab + 1}` : `Phase ${activeTab + 1}`}
                        </div>
                        <h2 className="mt-2 text-2xl font-black text-slate-900">{normalizeCopy(currentPhase.label)}</h2>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                        <Clock3 className="h-4 w-4 text-health-green" />
                        <span>{normalizeCopy(currentPhase.duration)}</span>
                      </div>
                    </div>

                    {currentPhase.focus ? (
                      <div className="mt-5 rounded-[1.5rem] border border-health-green/15 bg-health-green/5 p-4 text-sm leading-7 text-slate-700">
                        {normalizeCopy(currentPhase.focus)}
                      </div>
                    ) : null}

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>{isAr ? 'الأهداف' : 'Goals'}</span>
                        </div>
                        {renderBulletList(currentPhase.goals.map(normalizeCopy), 'success')}
                      </div>
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span>{isAr ? 'المحاذير' : 'Precautions'}</span>
                        </div>
                        {renderBulletList(
                          (currentPhase.cautions?.length ? currentPhase.cautions : [isAr ? 'لا توجد محاذير إضافية.' : 'No extra precautions.']).map(normalizeCopy),
                          'warning',
                        )}
                      </div>
                      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-black text-slate-900">
                          <Activity className="h-4 w-4 text-health-green" />
                          <span>{isAr ? 'الانتقال للمرحلة التالية' : 'Progression markers'}</span>
                        </div>
                        {renderBulletList(
                          (currentPhase.progressionMarkers?.length
                            ? currentPhase.progressionMarkers
                            : [isAr ? 'حسب تقييم الأخصائي.' : 'Follow clinician guidance.']).map(normalizeCopy),
                          'accent',
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                      <Sparkles className="h-4 w-4 text-health-green" />
                      <span>{isAr ? 'التمارين العلاجية' : 'Therapeutic exercises'}</span>
                    </div>
                    {currentPhase.exercisePlans?.length ? (
                      <div className="grid gap-4">
                        {currentPhase.exercisePlans.map((plan, idx) => (
                          <div key={`${plan.label}-${idx}`} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className="text-lg font-black text-slate-900">{normalizeCopy(plan.label)}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {plan.sets ? (
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                      {isAr ? 'الجرعة' : 'Dose'}: {normalizeCopy(plan.sets)}
                                    </span>
                                  ) : null}
                                  {plan.reps ? (
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                      {isAr ? 'العدّات' : 'Reps'}: {normalizeCopy(plan.reps)}
                                    </span>
                                  ) : null}
                                  {plan.rest ? (
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                      {isAr ? 'الراحة' : 'Rest'}: {normalizeCopy(plan.rest)}
                                    </span>
                                  ) : null}
                                  {plan.equipment ? (
                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                      {isAr ? 'الأداة' : 'Equipment'}: {normalizeCopy(plan.equipment)}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            {plan.cues?.length ? (
                              <div className="mt-4">
                                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                  {isAr ? 'ملاحظات التنفيذ' : 'Execution cues'}
                                </div>
                                {renderBulletList(plan.cues.map(normalizeCopy), 'accent')}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-[1.6rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                        {isAr ? 'لا توجد تمارين مفصلة مسجلة لهذه المرحلة بعد.' : 'No detailed exercises are recorded for this phase yet.'}
                      </div>
                    )}
                  </section>

                  <section className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'تغذية هذه المرحلة' : 'Phase nutrition'}</div>
                      {currentPhase.nutritionFocus?.length ? (
                        <div className="mb-5">
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'نقاط التركيز' : 'Focus points'}</div>
                          {renderBulletList(currentPhase.nutritionFocus.map(normalizeCopy), 'accent')}
                        </div>
                      ) : null}
                      {currentPhase.recommendedFoods?.length ? (
                        <div className="mb-5">
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'أطعمة مقترحة' : 'Recommended foods'}</div>
                          {renderBulletList(currentPhase.recommendedFoods.map(normalizeCopy), 'success')}
                        </div>
                      ) : null}
                      {currentPhase.avoidFoods?.length ? (
                        <div>
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'يفضل تقليل' : 'Best to reduce'}</div>
                          {renderBulletList(currentPhase.avoidFoods.map(normalizeCopy), 'warning')}
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'الوجبات والمكملات' : 'Meals and supplements'}</div>
                      <div className="grid gap-3">
                        {currentPhase.meals.breakfast ? (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                            <span className="font-bold text-slate-900">{isAr ? 'فطور:' : 'Breakfast:'}</span> {normalizeCopy(currentPhase.meals.breakfast)}
                          </div>
                        ) : null}
                        {currentPhase.meals.lunch ? (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                            <span className="font-bold text-slate-900">{isAr ? 'غداء:' : 'Lunch:'}</span> {normalizeCopy(currentPhase.meals.lunch)}
                          </div>
                        ) : null}
                        {currentPhase.meals.dinner ? (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                            <span className="font-bold text-slate-900">{isAr ? 'عشاء:' : 'Dinner:'}</span> {normalizeCopy(currentPhase.meals.dinner)}
                          </div>
                        ) : null}
                      </div>

                      {currentPhase.supplements?.length ? (
                        <div className="mt-5 border-t border-slate-100 pt-5">
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'مكملات داعمة' : 'Supportive supplements'}</div>
                          <div className="space-y-3">
                            {currentPhase.supplements.map((item) => (
                              <div key={`${item.name}-${item.dose}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="font-bold text-slate-900">{normalizeCopy(item.name)}</div>
                                <div className="mt-1 text-sm text-slate-600">{normalizeCopy(item.dose)}</div>
                                <div className="mt-2 text-sm leading-7 text-slate-700">{normalizeCopy(item.reason)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </section>
                </>
              ) : (
                <section className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                      <Pill className="h-4 w-4 text-health-green" />
                      <span>{isAr ? 'ملاحظات التغذية' : 'Nutrition notes'}</span>
                    </div>
                    {injury.pageContent?.nutritionNotes?.length ? (
                      renderBulletList(injury.pageContent.nutritionNotes.map(normalizeCopy), 'accent')
                    ) : (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        {isAr ? 'حافظ على نظام غذائي متوازن وغني بالبروتين لدعم الاستشفاء.' : 'Maintain a balanced, protein-rich diet to support recovery.'}
                      </div>
                    )}
                  </div>

                  <div className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                      <ShieldAlert className="h-4 w-4 text-health-green" />
                      <span>{isAr ? 'السلامة الدوائية والمكملات' : 'Supplement safety'}</span>
                    </div>
                    {medicationNotes.length > 0 ? (
                      renderBulletList(medicationNotes, 'warning')
                    ) : (
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        {isAr ? 'لا توجد ملاحظات خاصة مسجلة لهذه الإصابة.' : 'No specific safety notes are recorded for this injury.'}
                      </div>
                    )}
                    <div className="mt-6 border-t border-slate-100 pt-6">
                      <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        {isAr ? 'فحص سريع' : 'Quick checker'}
                      </div>
                      <Suspense fallback={<div className="text-sm text-slate-500">Loading...</div>}>
                        <DrugNutrientChecker lang={lang} embedded initialQuery="" />
                      </Suspense>
                    </div>
                  </div>
                </section>
              )}

              <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'أسئلة شائعة' : 'FAQ'}</div>
                <div className="grid gap-3 md:grid-cols-2">
                  {faqItems.map((item) => (
                    <div key={item.q} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                      <div className="font-bold text-slate-900">{normalizeCopy(item.q)}</div>
                      <p className="mt-2 text-sm leading-7 text-slate-700">{normalizeCopy(item.a)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {relatedExerciseLinks.length > 0 && (
                <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'تمارين مرتبطة' : 'Related exercises'}</div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {relatedExerciseLinks.map((item) => (
                      <Link
                        key={item.slug}
                        to={item.href}
                        className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                      >
                        <div className="text-lg font-black text-slate-900">{item.label}</div>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                          {isAr ? 'افتح القسم' : 'Open section'}
                          <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {relatedRehabLinks.length > 0 && (
                <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'صفحات تأهيل مرتبطة' : 'Related rehab pages'}</div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedRehabLinks.map((item) => (
                      <Link
                        key={item.slug}
                        to={item.href}
                        className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                      >
                        <div className="text-lg font-black text-slate-900">{item.label}</div>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                          {isAr ? 'افتح الصفحة' : 'Open page'}
                          <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {relatedInjuries.length > 0 && (
                <section className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 text-sm font-black text-slate-900">{isAr ? 'إصابات مشابهة' : 'Related injury pages'}</div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {relatedInjuries.map((item) => (
                      <Link
                        key={item.id}
                        to={buildPath(item.id, lang)}
                        className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-health-green/30 hover:bg-health-green/5"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{getLocalizedInjuryName(item.id, item.name, lang)}</div>
                          <div className="mt-1 text-xs text-slate-500">{item.category} • {item.bodyRegion}</div>
                        </div>
                        <ArrowRight className={`h-4 w-4 text-slate-400 ${isAr ? 'rotate-180' : ''}`} />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
