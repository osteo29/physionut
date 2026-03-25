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
import {getRehabStagePlans} from '../services/injuryRehabProtocols';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
  textLooksArabic,
} from '../services/injuryLocalization';
import {fetchCompleteInjuryProtocol, fetchInjuriesFromSupabase} from '../services/injurySupabaseService';
import {decodeMojibake} from '../services/textEncoding';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

const profiles: ActivityProfile[] = ['general', 'athlete', 'older_adult', 'post_op'];
const goals: RecoveryGoal[] = ['calm', 'mobility', 'strength', 'return'];
const recoveryWindows: RecoveryWindow[] = ['under_48h', 'days_3_14', 'weeks_2_6', 'over_6_weeks'];
const diets: DietStyle[] = ['omnivore', 'vegetarian'];
const DrugNutrientChecker = lazy(() => import('../components/ai/DrugNutrientChecker'));

function normalizeCopy(value: string) {
  return decodeMojibake(value);
}

function listHasArabic(items: string[]) {
  return items.some((item) => textLooksArabic(normalizeCopy(item)));
}

function inferCommonSymptoms(name: string, bodyRegion: string, category: string, lang: 'en' | 'ar') {
  const lower = name.toLowerCase();
  const localizedBodyRegion =
    lang === 'ar' ? getLocalizedBodyRegion(bodyRegion, 'ar') : bodyRegion.toLowerCase();

  if (lang === 'ar') {
    if (lower.includes('fracture')) {
      return [
        `ألم موضعي حول ${localizedBodyRegion}`,
        'تورم أو كدمات بعد التحميل أو الصدمة',
        'صعوبة في التحميل أو الاستخدام الطبيعي',
      ];
    }

    if (category === 'Tendon' || lower.includes('tendin')) {
      return [
        `ألم يزيد مع التكرار أو التحميل حول ${localizedBodyRegion}`,
        'تيبس صباحي أو ألم مع بداية الحركة',
        'ضعف في تحمل الجري أو القفز أو الرفع',
      ];
    }

    if (category === 'Ligament') {
      return [
        `إحساس بعدم الثبات في ${localizedBodyRegion}`,
        'تورم بعد اللف أو الهبوط أو الحركة المفاجئة',
        'ألم مع تغيير الاتجاه أو التحميل',
      ];
    }

    if (category === 'Joint') {
      return [
        `ألم أو انحشار حول ${localizedBodyRegion}`,
        'تيبس أو طقطقة أو صعوبة أثناء الحركة',
        'انخفاض الثقة في المدى الحركي أو التحميل',
      ];
    }

    return [
      `ألم أو شد أو ضعف حول ${localizedBodyRegion}`,
      'تراجع في تحمل الحركة أو النشاط',
      'زيادة الأعراض بعد النشاط وتحسنها مع التدرج والراحة المناسبة',
    ];
  }

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

function buildStageAnchor(phaseId: string, index: number) {
  const normalized = phaseId?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return normalized || `phase-${index + 1}`;
}

function getArabicFallbackRedFlags(bodyRegion: string) {
  return [
    `ألم شديد أو تورم سريع في ${bodyRegion}`,
    'عدم القدرة على التحميل أو استخدام الطرف بشكل طبيعي',
    'خدر أو ضعف متزايد أو تدهور واضح بعد الإصابة',
  ];
}

function getArabicFallbackGoals(bodyRegion: string) {
  return [
    `تقليل الألم وحماية ${bodyRegion}`,
    'استعادة الحركة والتحميل بشكل تدريجي',
    'تحسين الثبات والقوة والعودة الآمنة للنشاط',
  ];
}

function getArabicFallbackExercises(category: string, bodyRegion: string) {
  if (category === 'Ligament') {
    return [
      `تمارين مدى حركة خفيفة لـ ${bodyRegion}`,
      'تمارين ثبات وتحكم تدريجية',
      'تحميل وظيفي تدريجي حسب تحمل الأعراض',
    ];
  }

  if (category === 'Tendon') {
    return [
      `تمارين تحميل تدريجي للأوتار حول ${bodyRegion}`,
      'تمارين إيزومترية لتقليل التهيج في البداية',
      'الانتقال إلى تمارين مقاومة أبطأ ثم أقوى مع التحسن',
    ];
  }

  if (category === 'Bone') {
    return [
      `حماية ${bodyRegion} من التحميل الزائد في البداية`,
      'تمارين مسموحة منخفضة التأثير حسب الإرشاد الطبي',
      'العودة التدريجية للقوة ثم التحمل الوظيفي',
    ];
  }

  return [
    `حركات علاجية مناسبة لـ ${bodyRegion}`,
    'تقوية تدريجية مع مراقبة الأعراض',
    'تمارين وظيفية للعودة للنشاط اليومي أو الرياضي',
  ];
}

function getArabicFallbackNutritionFocus() {
  return [
    'توزيع البروتين جيدًا على الوجبات اليومية',
    'الحفاظ على الترطيب والطاقة الكافية لدعم التعافي',
    'تجنب النقص الشديد في السعرات أثناء فترة العلاج',
  ];
}

function getArabicFallbackFaq(injuryDisplayName: string, redFlags: string[]) {
  return [
    {
      q: `ما أهم هدف في بداية ${injuryDisplayName}؟`,
      a: 'الهدف الأول هو تهدئة الأعراض، حماية التحميل الزائد، والحفاظ على البروتين والطاقة حتى لا يتباطأ التعافي.',
    },
    {
      q: 'متى أراجع مختص بسرعة؟',
      a: `إذا ظهر واحد من العلامات التحذيرية التالية: ${redFlags.slice(0, 3).join('، ')}.`,
    },
    {
      q: 'هل التغذية وحدها تكفي؟',
      a: 'لا. التغذية تدعم التعافي، لكنها تعمل أفضل مع تشخيص مناسب، تحميل تدريجي، ونوم جيد.',
    },
  ];
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

  const injuryDisplayName = getLocalizedInjuryName(injury.id, injury.name, lang);
  const categoryDisplay = getLocalizedCategory(injury.category, lang);
  const bodyRegionDisplay = getLocalizedBodyRegion(injury.bodyRegion, lang);
  const suggestedPhase = getSuggestedPhaseForWindow(injury, recoveryWindow);
  const rehabStagePlans = getRehabStagePlans(injury, lang);
  const selectedStagePlan =
    rehabStagePlans.find((item) => item.phaseId === suggestedPhase.id) ??
    rehabStagePlans.find((item, index) => injury.phases[index]?.window === suggestedPhase.window) ??
    rehabStagePlans[0];
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
  const introText = getLocalizedInjuryOverview(
    injuryDisplayName,
    injury.category,
    injury.bodyRegion,
    normalizeCopy(customContent?.intro || injury.overview),
    lang,
  );

  const commonSymptoms =
    isAr && (!customContent?.symptoms?.length || !customContent.symptoms.some((item) => textLooksArabic(normalizeCopy(item))))
      ? inferCommonSymptoms(injury.name, injury.bodyRegion, injury.category, 'ar')
      : (customContent?.symptoms || inferCommonSymptoms(injury.name, injury.bodyRegion, injury.category, 'en')).map(normalizeCopy);

  const redFlags =
    isAr && !listHasArabic(injury.redFlags)
      ? getArabicFallbackRedFlags(bodyRegionDisplay)
      : injury.redFlags.map(normalizeCopy);

  const phaseGoals =
    isAr && !listHasArabic(suggestedPhase.goals)
      ? getArabicFallbackGoals(bodyRegionDisplay)
      : suggestedPhase.goals.map(normalizeCopy);

  const exerciseFocus = selectedStagePlan?.exercises?.length
    ? selectedStagePlan.exercises.map(normalizeCopy)
    : isAr && !listHasArabic(suggestedPhase.exercises)
      ? getArabicFallbackExercises(injury.category, bodyRegionDisplay)
      : suggestedPhase.exercises.map(normalizeCopy);

  const stageFocusText = selectedStagePlan ? normalizeCopy(selectedStagePlan.focus) : '';

  const nutritionFocus =
    isAr && !listHasArabic(suggestedPhase.nutritionFocus)
      ? getArabicFallbackNutritionFocus()
      : suggestedPhase.nutritionFocus.map(normalizeCopy);

  const medicationNotes = [...injury.safetyNotes.medications, ...injury.safetyNotes.supplements].map(normalizeCopy);

  const faqItems =
    isAr &&
    (!customContent?.faq?.length ||
      !customContent.faq.some(
        (item) => textLooksArabic(normalizeCopy(item.q)) || textLooksArabic(normalizeCopy(item.a)),
      ))
      ? getArabicFallbackFaq(injuryDisplayName, redFlags)
      : (customContent?.faq || getArabicFallbackFaq(injuryDisplayName, redFlags)).map((item) => ({
          q: normalizeCopy(item.q),
          a: normalizeCopy(item.a),
        }));

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

  const hreflangs = [
    {lang: 'en', href: `https://physionutrition.vercel.app${buildPath(injury.id, 'en')}`},
    {lang: 'ar', href: `https://physionutrition.vercel.app${buildPath(injury.id, 'ar')}`},
  ];

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
        hasPart: rehabStagePlans.map((stage, index) => ({
          '@type': 'WebPageElement',
          '@id': `https://physionutrition.vercel.app${path}#${buildStageAnchor(stage.phaseId, index)}`,
          name: normalizeCopy(stage.phaseLabel),
          description: normalizeCopy(stage.focus),
        })),
      },
    },
    {
      id: `injury-condition-${injury.id}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'MedicalCondition',
        name: injuryDisplayName,
        description: introText,
        associatedAnatomy: bodyRegionDisplay,
        signOrSymptom: commonSymptoms,
        possibleTreatment: rehabStagePlans.map((stage, index) => ({
          '@type': 'TherapeuticProcedure',
          name: normalizeCopy(stage.phaseLabel),
          description: `${normalizeCopy(stage.focus)} ${stage.exercises.map(normalizeCopy).join(', ')}`,
          url: `https://physionutrition.vercel.app${path}#${buildStageAnchor(stage.phaseId, index)}`,
        })),
      },
    },
    {
      id: `injury-faq-${injury.id}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    },
  ];

  return (
    <>
      <Seo
        title={labels.title}
        description={labels.description}
        canonicalPath={path}
        structuredData={structuredData}
        hreflangs={hreflangs}
      />
      <PageLayout title={labels.title}>
        <div className="space-y-8 not-prose">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{categoryDisplay} • {bodyRegionDisplay}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">{injuryDisplayName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{introText}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
              {isAr && !textLooksArabic(normalizeCopy(injury.rehabSummary))
                ? `يعتمد التعافي هنا على ضبط الحمل التدريبي، والمتابعة الجيدة للأعراض، ودعم الأنسجة بالتغذية المناسبة حتى تستعيد ${bodyRegionDisplay} كفاءته تدريجيًا.`
                : normalizeCopy(injury.rehabSummary)}
            </p>
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
                {redFlags.map((item) => (
                  <li key={item} className="rounded-xl bg-white px-3 py-3">{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-black text-slate-900">
              <ClipboardList className="h-4 w-4 text-health-green" />
              <h2>{isAr ? 'بروتوكول التأهيل حسب المرحلة' : 'Phase-by-phase rehab protocol'}</h2>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {rehabStagePlans.map((stage, index) => {
                const anchorId = buildStageAnchor(stage.phaseId, index);
                const linkLabel =
                  isAr && !textLooksArabic(normalizeCopy(stage.phaseLabel))
                    ? `المرحلة ${index + 1}`
                    : normalizeCopy(stage.phaseLabel);

                return (
                  <a
                    key={`nav-${stage.phaseId}-${index}`}
                    href={`#${anchorId}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-health-green/40 hover:bg-health-green/5 hover:text-health-green-dark"
                  >
                    {linkLabel}
                  </a>
                );
              })}
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {rehabStagePlans.map((stage, index) => {
                const isActive = stage.phaseId === selectedStagePlan?.phaseId;
                const anchorId = buildStageAnchor(stage.phaseId, index);
                const labelText =
                  isAr && !textLooksArabic(normalizeCopy(stage.phaseLabel))
                    ? `المرحلة ${index + 1}`
                    : normalizeCopy(stage.phaseLabel);

                return (
                  <article
                    id={anchorId}
                    key={`${stage.phaseId}-${stage.duration}`}
                    className={`rounded-[1.5rem] border p-5 ${
                      isActive ? 'border-health-green bg-health-green/5' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                          {isAr ? `المرحلة ${index + 1}` : `Phase ${index + 1}`}
                        </div>
                        <h3 className="mt-1 font-black text-slate-900">
                          <a href={`#${anchorId}`} className="transition hover:text-health-green-dark">
                            {labelText}
                          </a>
                        </h3>
                      </div>
                      <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                        {normalizeCopy(stage.duration)}
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-700">{normalizeCopy(stage.focus)}</p>

                    <div className="mt-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        {isAr ? 'التمارين المناسبة' : 'Exercises'}
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {stage.exercises.map((item) => (
                          <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        {isAr ? 'علامات الانتقال للمرحلة التالية' : 'Ready to progress when'}
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {stage.progressionMarkers.map((item) => (
                          <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                        {isAr ? 'تجنب' : 'Avoid'}
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {stage.cautions.map((item) => (
                          <li key={item} className="rounded-xl bg-amber-50 px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
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
                <span>{isAr ? 'مرحلة التركيز الحالية' : 'Current focus stage'}</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-bold text-slate-900">
                  {isAr && !textLooksArabic(normalizeCopy(suggestedPhase.label))
                    ? labels.window[recoveryWindow]
                    : normalizeCopy(suggestedPhase.label)}
                </div>
                <div className="mt-1 text-xs text-slate-500">{normalizeCopy(suggestedPhase.duration)}</div>
                {stageFocusText ? <p className="mt-3 text-sm leading-7 text-slate-700">{stageFocusText}</p> : null}
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {phaseGoals.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التمارين المناسبة' : 'Rehab exercise focus'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {exerciseFocus.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التركيز الغذائي' : 'Nutrition focus now'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {nutritionFocus.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
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
                    <div className="font-bold text-slate-900">{normalizeCopy(item.name)} • {normalizeCopy(item.dose)}</div>
                    <div className="mt-1">{normalizeCopy(item.reason)}</div>
                    {item.timing ? <div className="mt-1 text-xs font-semibold text-health-green-dark">{normalizeCopy(item.timing)}</div> : null}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-amber-50 p-4">
                <div className="mb-2 text-sm font-bold text-slate-900">{isAr ? 'ملاحظات مهمة' : 'Medication and supplement notes'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {medicationNotes.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}
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
                    <div className="font-bold text-slate-900">{getLocalizedInjuryName(item.id, item.name, lang)}</div>
                    <div className="mt-2 text-xs text-slate-500">
                      {getLocalizedCategory(item.category, lang)} • {getLocalizedBodyRegion(item.bodyRegion, lang)}
                    </div>
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
