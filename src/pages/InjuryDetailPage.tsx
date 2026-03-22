import {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Beef,
  ClipboardList,
  Pill,
  ShieldAlert,
  Timer,
} from 'lucide-react';
import {Link, Navigate, useParams} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {injuryPageContent} from '../services/injuryPageContent';
import {
  generateRecoveryPlan,
  getAllInjuries,
  getInjuryBySlug,
  getSuggestedPhaseForWindow,
  type ActivityProfile,
  type DietStyle,
  type InjuryProtocol,
  type RecoveryGoal,
  type RecoveryWindow,
} from '../services/injuryDatabase';
import {fetchCompleteInjuryProtocol, fetchInjuriesFromSupabase} from '../services/injurySupabaseService';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

const profiles: ActivityProfile[] = ['general', 'athlete', 'older_adult', 'post_op'];
const goals: RecoveryGoal[] = ['calm', 'mobility', 'strength', 'return'];
const recoveryWindows: RecoveryWindow[] = ['under_48h', 'days_3_14', 'weeks_2_6', 'over_6_weeks'];
const diets: DietStyle[] = ['omnivore', 'vegetarian'];
const DrugNutrientChecker = lazy(() => import('../components/ai/DrugNutrientChecker'));

function inferCommonSymptoms(name: string, bodyRegion: string, category: string) {
  const lower = name.toLowerCase();

  if (lower.includes('fracture')) {
    return [
      `Pain localized around the ${bodyRegion.toLowerCase()}`,
      'Swelling or bruising after loading or trauma',
      'Reduced tolerance for weight-bearing or gripping',
    ];
  }

  if (category === 'Tendon' || lower.includes('tendin')) {
    return [
      `Pain that builds with repeated loading around the ${bodyRegion.toLowerCase()}`,
      'Morning stiffness or pain when activity starts',
      'Reduced tolerance for jumping, gripping, or overhead work',
    ];
  }

  if (category === 'Ligament') {
    return [
      `Instability or fear of movement at the ${bodyRegion.toLowerCase()}`,
      'Swelling after twists, pivots, or awkward landings',
      'Pain with directional changes or impact',
    ];
  }

  if (category === 'Joint') {
    return [
      `Pain or pinching around the ${bodyRegion.toLowerCase()}`,
      'Clicking, catching, or stiffness during movement',
      'Reduced confidence in range of motion or loading',
    ];
  }

  return [
    `Pain, tightness, or weakness around the ${bodyRegion.toLowerCase()}`,
    'Loss of confidence with loading or quick movement',
    'Symptoms that increase after activity and settle with smarter pacing',
  ];
}

function buildPath(id: string, lang: string) {
  return `/${lang}/injuries/${id.replace(/_/g, '-')}`;
}

export default function InjuryDetailPage() {
  const {slug = ''} = useParams();
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const fallbackInjury = useMemo(() => getInjuryBySlug(slug), [slug]);
  const [injury, setInjury] = useState<InjuryProtocol | null>(fallbackInjury ?? null);
  const [loading, setLoading] = useState(true);
  const [remoteIds, setRemoteIds] = useState<string[]>([]);

  const [profile, setProfile] = useState<ActivityProfile>('general');
  const [goal, setGoal] = useState<RecoveryGoal>('calm');
  const [recoveryWindow, setRecoveryWindow] = useState<RecoveryWindow>('under_48h');
  const [diet, setDiet] = useState<DietStyle>('omnivore');
  const [weightKg, setWeightKg] = useState(70);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const [protocol, rows] = await Promise.all([
        fetchCompleteInjuryProtocol(slug, lang),
        fetchInjuriesFromSupabase(),
      ]);
      if (!active) return;
      setInjury(protocol ?? fallbackInjury ?? null);
      setRemoteIds(rows.map((row) => row.injury_id_slug));
      setLoading(false);
    };

    void load();

    return () => {
      active = false;
    };
  }, [fallbackInjury, lang, slug]);

  if (!injury && !loading) {
    return <Navigate to={`/${lang}/injuries`} replace />;
  }

  if (!injury) {
    return (
      <PageLayout title={isAr ? 'جارٍ تحميل البروتوكول' : 'Loading protocol'}>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          {isAr ? 'جارٍ تحميل تفاصيل الإصابة...' : 'Loading injury details...'}
        </div>
      </PageLayout>
    );
  }

  const injuryDisplayName = injury.name;
  const categoryDisplay = injury.category;
  const bodyRegionDisplay = injury.bodyRegion;
  const suggestedPhase = getSuggestedPhaseForWindow(injury, recoveryWindow);
  const plan = generateRecoveryPlan({
    weightKg,
    phase: suggestedPhase,
    profile,
    goal,
    dietStyle: diet,
  });

  const relatedInjuries = getAllInjuries()
    .filter((item) => item.id !== injury.id)
    .filter((item) => item.category === injury.category || item.bodyRegion === injury.bodyRegion)
    .filter((item) => !remoteIds.length || !remoteIds.includes(item.id))
    .slice(0, 6);

  const customContent = injuryPageContent[injury.id];
  const commonSymptoms =
    customContent?.symptoms || inferCommonSymptoms(injury.name, injury.bodyRegion, injury.category);
  const faqItems = customContent?.faq || [
    {
      q: isAr ? `ما أهم هدف في بداية ${injuryDisplayName}؟` : `What matters most early in ${injuryDisplayName}?`,
      a: isAr
        ? 'الهدف الأول هو تهدئة الأعراض، حماية التحميل الزائد، والحفاظ على البروتين والطاقة حتى لا يتباطأ التعافي.'
        : 'Early priorities are calming symptoms, avoiding overload, and keeping protein and energy intake steady so recovery does not stall.',
    },
    {
      q: isAr ? 'متى أراجع مختص بسرعة؟' : 'When should I get medical review quickly?',
      a: isAr
        ? `إذا ظهر واحد من العلامات التحذيرية التالية: ${injury.redFlags.slice(0, 3).join('، ')}.`
        : `Seek prompt review if you notice any of these red flags: ${injury.redFlags.slice(0, 3).join(', ')}.`,
    },
    {
      q: isAr ? 'هل التغذية وحدها تكفي؟' : 'Is nutrition enough on its own?',
      a: isAr
        ? 'لا. التغذية تدعم التعافي، لكنها تعمل أفضل مع تشخيص مناسب، تحميل تدريجي، ونوم جيد.'
        : 'No. Nutrition supports the process, but it works best alongside good diagnosis, graded loading, and enough sleep.',
    },
  ];

  const path = buildPath(injury.id, lang);
  const labels = {
    title: isAr ? `بروتوكول ${injuryDisplayName}` : `${injuryDisplayName} Recovery Protocol`,
    description: isAr
      ? `دليل عملي للتغذية العلاجية والتأهيل في ${injuryDisplayName} مع الأعراض الشائعة، المراحل، التمارين، وخطة يومية حسب الوزن.`
      : `A practical rehab nutrition guide for ${injuryDisplayName} with common symptoms, rehab phases, exercises, and a weight-based daily plan.`,
    profile: {
      general: isAr ? 'عام' : 'General',
      athlete: isAr ? 'رياضي' : 'Athlete',
      older_adult: isAr ? 'كبار سن' : 'Older adult',
      post_op: isAr ? 'بعد جراحة' : 'Post-op',
    },
    goal: {
      calm: isAr ? 'تقليل الالتهاب' : 'Calm inflammation',
      mobility: isAr ? 'استعادة الحركة' : 'Restore mobility',
      strength: isAr ? 'بناء القوة' : 'Rebuild strength',
      return: isAr ? 'العودة للنشاط' : 'Return to activity',
    },
    window: {
      under_48h: isAr ? 'أقل من 48 ساعة' : 'Under 48 hours',
      days_3_14: isAr ? '3 إلى 14 يوم' : '3 to 14 days',
      weeks_2_6: isAr ? '2 إلى 6 أسابيع' : '2 to 6 weeks',
      over_6_weeks: isAr ? 'أكثر من 6 أسابيع' : 'Over 6 weeks',
    },
    diet: {
      omnivore: isAr ? 'عادي' : 'Omnivore',
      vegetarian: isAr ? 'نباتي' : 'Vegetarian',
    },
  } as const;

  const structuredData = [
    {
      id: `injury-page-${injury.id}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: labels.title,
        description: labels.description,
        url: `https://physionutrition.vercel.app${path}`,
        about: {
          '@type': 'MedicalCondition',
          name: injuryDisplayName,
          associatedAnatomy: bodyRegionDisplay,
          signOrSymptom: commonSymptoms.map((item) => ({
            '@type': 'MedicalSymptom',
            name: item,
          })),
        },
      },
    },
  ];

  return (
    <>
      <Seo title={labels.title} description={labels.description} canonicalPath={path} structuredData={structuredData} />
      <PageLayout title={labels.title}>
        <div className="space-y-8 not-prose">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{categoryDisplay} • {bodyRegionDisplay}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{injuryDisplayName}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {customContent?.intro || injury.overview}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">{injury.rehabSummary}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={`/${lang}/injuries`}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
              >
                {isAr ? 'العودة لمكتبة الإصابات' : 'Back to injury directory'}
              </Link>
              <Link
                to={`/${lang}/assistant`}
                className="inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
              >
                {isAr ? 'اسأل المساعد عن هذه الحالة' : 'Ask the assistant about this injury'}
              </Link>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 font-black text-slate-900">{isAr ? 'الأعراض الشائعة' : 'Common symptoms'}</div>
              <ul className="space-y-2 text-sm text-slate-700">
                {commonSymptoms.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>{isAr ? 'علامات تستدعي مراجعة سريعة' : 'Red flags that need faster review'}</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {injury.redFlags.map((item) => (
                  <li key={item} className="rounded-xl bg-white px-3 py-3">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Timer className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'مخصص خطة التعافي' : 'Recovery plan customizer'}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <input type="number" min="0" max="250" value={weightKg} onChange={(e) => setWeightKg(Math.max(0, Math.min(250, Number(e.target.value) || 0)))} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20" />
              <select value={recoveryWindow} onChange={(e) => setRecoveryWindow(e.target.value as RecoveryWindow)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {recoveryWindows.map((item) => <option key={item} value={item}>{labels.window[item]}</option>)}
              </select>
              <select value={profile} onChange={(e) => setProfile(e.target.value as ActivityProfile)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {profiles.map((item) => <option key={item} value={item}>{labels.profile[item]}</option>)}
              </select>
              <select value={goal} onChange={(e) => setGoal(e.target.value as RecoveryGoal)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {goals.map((item) => <option key={item} value={item}>{labels.goal[item]}</option>)}
              </select>
              <select value={diet} onChange={(e) => setDiet(e.target.value as DietStyle)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {diets.map((item) => <option key={item} value={item}>{labels.diet[item]}</option>)}
              </select>
            </div>
          </section>

          {plan ? (
            <section className="rounded-[2rem] border border-health-green/20 bg-health-green/5 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-health-green-dark">
                <Beef className="h-4 w-4" />
                <span>{isAr ? 'الخطة اليومية حسب الوزن' : 'Weight-based daily plan'}</span>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'البروتين' : 'Protein'}</div><div className="mt-2 text-2xl font-black text-slate-900">{plan.proteinTotalGrams} g</div></div>
                <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'السوائل' : 'Hydration'}</div><div className="mt-2 text-2xl font-black text-slate-900">{plan.hydrationTargetMl} ml</div></div>
                <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'الكولاجين' : 'Collagen'}</div><div className="mt-2 text-2xl font-black text-slate-900">{plan.collagenDoseGrams ? `${plan.collagenDoseGrams} g` : '-'}</div></div>
                <div className="rounded-2xl bg-white p-4 shadow-sm"><div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'الكرياتين' : 'Creatine'}</div><div className="mt-2 text-2xl font-black text-slate-900">{plan.creatineGrams ? `${plan.creatineGrams} g` : '-'}</div></div>
              </div>
            </section>
          ) : null}

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-black text-slate-900">
                <Timer className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'مراحل التأهيل' : 'Rehab stages'}</span>
              </div>
              <div className="space-y-4">
                {injury.phases.map((phase) => (
                  <div key={phase.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="font-bold text-slate-900">{phase.label}</div>
                    <div className="mt-1 text-xs text-slate-500">{phase.duration}</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {phase.goals.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التمارين المناسبة' : 'Rehab exercise focus'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {suggestedPhase.exercises.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التركيز الغذائي' : 'Nutrition focus now'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {suggestedPhase.nutritionFocus.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
                <Pill className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'المكملات والسلامة' : 'Supplements and safety'}</span>
              </div>
              <div className="space-y-2">
                {suggestedPhase.supplements.map((item) => (
                  <div key={`${item.name}-${item.dose}`} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <div className="font-bold text-slate-900">{item.name} • {item.dose}</div>
                    <div className="mt-1">{item.reason}</div>
                    {item.timing ? <div className="mt-1 text-xs font-semibold text-health-green-dark">{item.timing}</div> : null}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-4">
                <div className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'ملاحظات مهمة' : 'Medication and supplement notes'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[...injury.safetyNotes.medications, ...injury.safetyNotes.supplements].map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-black text-slate-900">
                <ShieldAlert className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'افحص أمان المكملات' : 'Check supplement safety'}</span>
              </div>
              <Suspense fallback={<div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">{isAr ? 'جارٍ تحميل فاحص الأمان...' : 'Loading supplement safety checker...'}</div>}>
                <DrugNutrientChecker lang={lang} embedded initialQuery={suggestedPhase.supplements.map((item) => item.name).join(' and ')} />
              </Suspense>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 font-black text-slate-900">{isAr ? 'أسئلة شائعة' : 'FAQ'}</div>
            <div className="space-y-3">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl bg-slate-50 p-4">
                  <div className="font-bold text-slate-900">{item.q}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedInjuries.length > 0 ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 font-black text-slate-900">{isAr ? 'إصابات مرتبطة' : 'Related injury pages'}</div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {relatedInjuries.map((item) => (
                  <Link key={item.id} to={buildPath(item.id, lang)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-health-green/30 hover:bg-health-green/5">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="mt-2 text-xs text-slate-500">{item.category} • {item.bodyRegion}</div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-500">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>{isAr ? 'قبل تطبيق أي خطة' : 'Before you apply anything'}</span>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-700">
              {isAr
                ? 'هذه الصفحة تعليمية وعملية وليست وصفة طبية شخصية. إذا كان عندك جراحة حديثة، مرض مزمن، أدوية يومية، أو ألم مستمر، راجع مختص قبل تعديل المكملات أو خطة الأكل.'
                : 'This page is practical education, not a personal prescription. If you have recent surgery, chronic disease, daily medications, or persistent pain, review supplement and nutrition changes with a qualified clinician.'}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to={`/${lang}/calculators`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white">
                <span>{isAr ? `استخدم هدف البروتين (${plan?.proteinTotalGrams ?? 0} جم)` : `Use the ${plan?.proteinTotalGrams ?? 0} g protein target`}</span>
                <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
              </Link>
              <Link to={`/${lang}/injuries`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">
                {isAr ? 'تصفح كل البروتوكولات' : 'Browse all protocols'}
              </Link>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
