import {Fragment, lazy, Suspense, useEffect, useMemo, useState} from 'react';
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
import {
  generateRecoveryPlan,
  getAllInjuries,
  getSuggestedPhaseForWindow,
  type ActivityProfile,
  type DietStyle,
  type InjuryProtocol,
  type RecoveryGoal,
  type RecoveryWindow,
} from '../services/injuryDatabase';
import {getRehabStagePlans} from '../services/injuryRehabProtocols';
import {getInjuryExerciseLinks} from '../services/injuryExerciseLinks';
import {getInjuryRehabLinks} from '../services/injuryRehabLinks';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
  textLooksArabic,
} from '../services/injuryLocalization';
import {getInjuryProtocolBySlugWithFallback} from '../services/injuryService';
import {INJURY_CANONICAL_PARENT_MAP} from '../services/seoAliases';
import {decodeMojibake} from '../services/textEncoding';
import {navigationPaths} from '../utils/langUrlHelper';
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

function buildPlainLanguageInjurySummary(
  injuryDisplayName: string,
  bodyRegionDisplay: string,
  categoryDisplay: string,
  commonSymptoms: string[],
  lang: 'en' | 'ar',
) {
  const topSymptoms = commonSymptoms.slice(0, 2);

  if (lang === 'ar') {
    const symptomsText = topSymptoms.length ? ` وغالبًا يظهر على شكل ${topSymptoms.join(' أو ')}.` : '.';
    return `${injuryDisplayName} هو وصف مبسط لمشكلة تصيب ${bodyRegionDisplay} وتؤثر على الحركة أو التحميل اليومي. غالبًا يندرج تحت فئة ${categoryDisplay}${symptomsText}`;
  }

  const symptomsText = topSymptoms.length ? ` It often shows up as ${topSymptoms.join(' or ')}.` : '';
  return `${injuryDisplayName} is a plain-language way to describe a ${categoryDisplay.toLowerCase()} problem affecting the ${bodyRegionDisplay.toLowerCase()}, often making movement or loading less comfortable.${symptomsText}`;
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

function getArabicFallbackFaq(
  injuryDisplayName: string,
  phaseLabel: string,
  bodyRegion: string,
  redFlags: string[],
  phaseGoals: string[],
) {
  const topGoals = phaseGoals.slice(0, 2);

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
    {
      q: `ما الأولوية في مرحلة ${phaseLabel}؟`,
      a: topGoals.length
        ? `الأولوية الآن هي ${topGoals.join(' ثم ')}, مع مراقبة استجابة ${bodyRegion} بعد التمرين وفي اليوم التالي.`
        : `الأولوية في هذه المرحلة هي التدرج الهادئ ومراقبة استجابة ${bodyRegion} للحمل.`,
    },
  ];
}

function buildRehabMatchReason({
  injuryName,
  bodyRegion,
  phaseLabel,
  phaseFocus,
  rehabLabel,
  lang,
}: {
  injuryName: string;
  bodyRegion: string;
  phaseLabel: string;
  phaseFocus: string;
  rehabLabel: string;
  lang: 'en' | 'ar';
}) {
  if (lang === 'ar') {
    const focusText = phaseFocus
      ? ` وفي هذه المرحلة (${phaseLabel}) يكون التركيز على ${phaseFocus}.`
      : ` خصوصًا في مرحلة ${phaseLabel}.`;
    return `صفحة ${rehabLabel} مناسبة لحالة ${injuryName} لأنها تجمع التحميل التدريجي والتمارين الأقرب لاحتياج ${bodyRegion}.${focusText}`;
  }

  const focusText = phaseFocus ? ` In the ${phaseLabel} phase, the focus is ${phaseFocus}.` : ` This is especially useful during the ${phaseLabel} phase.`;
  return `${rehabLabel} fits ${injuryName} because it groups the closest graded-loading exercises for the ${bodyRegion.toLowerCase()}.${focusText}`;
}


export default function InjuryDetailPage() {
  const {slug = ''} = useParams();
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [injury, setInjury] = useState<InjuryProtocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [remoteIds, setRemoteIds] = useState<string[]>([]);
  const [customContentMap, setCustomContentMap] = useState<Record<string, unknown> | null>(null);

  const [profile, setProfile] = useState<ActivityProfile>('general');
  const [goal, setGoal] = useState<RecoveryGoal>('calm');
  const [recoveryWindow, setRecoveryWindow] = useState<RecoveryWindow>('under_48h');
  const [diet, setDiet] = useState<DietStyle>('omnivore');
  const [weightKg, setWeightKg] = useState(70);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      const result = await getInjuryProtocolBySlugWithFallback(slug, lang);

      if (!active) return;
      setInjury(result.injury);
      setRemoteIds(result.remoteIds);
      setLoading(false);
    };

    void load();

    return () => {
      active = false;
    };
  }, [lang, slug]);

  useEffect(() => {
    let active = true;

    const loadCustomContent = async () => {
      const module = await import('../services/injuryPageContentCatalog');
      if (active) setCustomContentMap(module.injuryPageContentCatalog);
    };

    void loadCustomContent();

    return () => {
      active = false;
    };
  }, []);

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
  const activePhase = injury.phases.find((p) => p.id === selectedStagePlan?.phaseId) ?? suggestedPhase;
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

  const customContent = (injury.pageContent ||
    (customContentMap?.[injury.id] as
    | {intro?: string; symptoms?: string[]; faq?: Array<{q: string; a: string}>}
    | undefined));
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
  const plainLanguageSummary = buildPlainLanguageInjurySummary(
    injuryDisplayName,
    bodyRegionDisplay,
    categoryDisplay,
    commonSymptoms,
    lang,
  );

  const redFlags =
    isAr && !listHasArabic(injury.redFlags)
      ? getArabicFallbackRedFlags(bodyRegionDisplay)
      : injury.redFlags.map(normalizeCopy);

  const phaseGoals =
    isAr && !listHasArabic(activePhase.goals) ? getArabicFallbackGoals(bodyRegionDisplay) : activePhase.goals.map(normalizeCopy);

  const exerciseFocus = selectedStagePlan?.exercises?.length
    ? selectedStagePlan.exercises.map(normalizeCopy)
    : isAr && !listHasArabic(suggestedPhase.exercises)
      ? getArabicFallbackExercises(injury.category, bodyRegionDisplay)
      : suggestedPhase.exercises.map(normalizeCopy);

  const stageFocusText = selectedStagePlan ? normalizeCopy(selectedStagePlan.focus) : '';
  const relatedRehabCards = relatedRehabLinks.map((item) => ({
    ...item,
    phaseReason: buildRehabMatchReason({
      injuryName: injuryDisplayName,
      bodyRegion: bodyRegionDisplay,
      phaseLabel: normalizeCopy(activePhase.label),
      phaseFocus: stageFocusText,
      rehabLabel: item.label,
      lang,
    }),
  }));

  const nutritionFocus =
    isAr && !listHasArabic(activePhase.nutritionFocus)
      ? getArabicFallbackNutritionFocus()
      : activePhase.nutritionFocus.map(normalizeCopy);

  const medicationNotes = [...injury.safetyNotes.medications, ...injury.safetyNotes.supplements].map(normalizeCopy);
  const askPhasePrompt = isAr
    ? `أنا في ${normalizeCopy(activePhase.label)} من ${injuryDisplayName}. اشرح لي ماذا أركز عليه الآن، ما التمارين المناسبة، ما الذي أتجنبه، ومتى أستطيع الانتقال للمرحلة التالية؟`
    : `I am in the ${normalizeCopy(activePhase.label)} phase of ${injuryDisplayName}. Explain what I should focus on now, which exercises fit this phase, what I should avoid, and when I can move to the next phase.`;
  const askPhaseLink = `/${lang}/assistant?prompt=${encodeURIComponent(askPhasePrompt)}`;

  const faqItems =
    isAr &&
    (!customContent?.faq?.length ||
      !customContent.faq.some(
        (item) => textLooksArabic(normalizeCopy(item.q)) || textLooksArabic(normalizeCopy(item.a)),
      ))
      ? getArabicFallbackFaq(injuryDisplayName, normalizeCopy(activePhase.label), bodyRegionDisplay, redFlags, phaseGoals)
      : (customContent?.faq || getArabicFallbackFaq(injuryDisplayName, normalizeCopy(activePhase.label), bodyRegionDisplay, redFlags, phaseGoals)).map((item) => ({
          q: normalizeCopy(item.q),
          a: normalizeCopy(item.a),
        }));

  const path = buildPath(injury.id, lang);
  const canonicalInjuryId = INJURY_CANONICAL_PARENT_MAP[injury.id] || injury.id;
  const canonicalPath = buildPath(canonicalInjuryId, lang);
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
    {lang: 'en', href: `https://physionutrition.vercel.app${buildPath(canonicalInjuryId, 'en')}`},
    {lang: 'ar', href: `https://physionutrition.vercel.app${buildPath(canonicalInjuryId, 'ar')}`},
  ];

  const structuredData = [
    {
      id: `injury-page-${injury.id}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: labels.title,
        description: labels.description,
        url: `https://physionutrition.vercel.app${canonicalPath}`,
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
          '@id': `https://physionutrition.vercel.app${canonicalPath}#${buildStageAnchor(stage.phaseId, index)}`,
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
          url: `https://physionutrition.vercel.app${canonicalPath}#${buildStageAnchor(stage.phaseId, index)}`,
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
    {
      id: `injury-breadcrumbs-${injury.id}`,
      json: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isAr ? 'مكتبة الإصابات' : 'Injury Protocol Library',
            item: `https://physionutrition.vercel.app${navigationPaths.injuries(lang)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: injuryDisplayName,
            item: `https://physionutrition.vercel.app${canonicalPath}`,
          },
        ],
      },
    },
    ...(relatedExerciseLinks.length
      ? [
          {
            id: `injury-related-exercises-${injury.id}`,
            json: {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: isAr ? `تمارين مرتبطة بـ ${injuryDisplayName}` : `Exercises related to ${injuryDisplayName}`,
              itemListElement: relatedExerciseLinks.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
                url: `https://physionutrition.vercel.app${item.href}`,
              })),
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <Seo
        title={labels.title}
        description={labels.description}
        canonicalPath={canonicalPath}
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
            <p className="mt-3 max-w-3xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
              {plainLanguageSummary}
            </p>
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
              {relatedExerciseLinks[0] ? (
                <Link
                  to={relatedExerciseLinks[0].href}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {isAr ? 'افتح التمارين المناسبة' : 'Open matching exercises'}
                </Link>
              ) : null}
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

          {relatedExerciseLinks.length > 0 ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {isAr ? 'تمارين قد تفيد هذه الإصابة' : 'Exercises that may support this injury'}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {isAr
                      ? 'هذه روابط داخلية إلى أقسام التمارين الأقرب لهذه الحالة، حتى ينتقل المستخدم من البروتوكول إلى التمارين المناسبة داخل الموقع نفسه.'
                      : 'These internal links point to the closest matching exercise sections so users can move from protocol guidance into practical exercise selection.'}
                  </p>
                </div>
                <Link
                  to={navigationPaths.exercises(lang)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {isAr ? 'كل التمارين' : 'All exercises'}
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedExerciseLinks.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.href}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-health-green">
                      {isAr ? 'تمارين مرتبطة' : 'Related exercises'}
                    </div>
                    <div className="mt-2 text-lg font-black text-slate-900">{item.label}</div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.reason}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                      {isAr ? 'انتقل إلى القسم' : 'Go to section'}
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedRehabCards.length > 0 ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {isAr ? 'صفحات التأهيل الموجه المناسبة' : 'Targeted rehab pages'}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {isAr
                      ? 'هذه الصفحات تربط بروتوكول الإصابة بصفحات تأهيل أوسع وموجهة، لتسهيل الانتقال من مرحلة العلاج إلى تحميل تدريجي أكثر تنظيمًا.'
                      : 'These pages bridge the injury protocol into broader rehab-focused exercise hubs, helping users move from symptom management into more organized graded loading.'}
                  </p>
                </div>
                <Link
                  to={navigationPaths.exercises(lang)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {isAr ? 'مكتبة التمارين' : 'Exercise hub'}
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {relatedRehabCards.map((item) => (
                  <Link
                    key={item.slug}
                    to={item.href}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-health-green">
                      {isAr ? 'صفحة تأهيل' : 'Rehab page'}
                    </div>
                    <div className="mt-2 text-lg font-black text-slate-900">{item.label}</div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.phaseReason}</p>
                    <div className="mt-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-3 text-xs leading-6 text-slate-500">
                      {item.reason}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                      {isAr ? 'افتح الصفحة' : 'Open page'}
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-black text-slate-900">
              <Timer className="h-4 w-4 text-health-green" />
              <h2>{isAr ? 'مرحلتك في رحلة التعافي' : 'Your recovery stage'}</h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {recoveryWindows.map((window, index) => {
                const isActive = window === recoveryWindow;
                const isPast = recoveryWindows.indexOf(recoveryWindow) > index;

                return (
                  <Fragment key={window}>
                    <button
                      type="button"
                      onClick={() => setRecoveryWindow(window)}
                      className="group flex flex-1 min-w-[88px] flex-col items-center gap-1.5"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-black transition ${
                          isActive
                            ? 'border-health-green bg-health-green text-white'
                            : isPast
                              ? 'border-health-green bg-health-green/10 text-health-green-dark'
                              : 'border-slate-200 bg-white text-slate-400'
                        }`}
                      >
                        {isPast ? '✓' : index + 1}
                      </div>
                      <span
                        className={`text-center text-xs font-semibold leading-5 transition ${
                          isActive ? 'text-health-green-dark' : 'text-slate-500 group-hover:text-slate-700'
                        }`}
                      >
                        {labels.window[window]}
                      </span>
                    </button>

                    {index < recoveryWindows.length - 1 && (
                      <div
                        className={`h-1 flex-1 rounded-full ${
                          recoveryWindows.indexOf(recoveryWindow) > index ? 'bg-health-green' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <div className="font-bold text-slate-900">{labels.window[recoveryWindow]}</div>
              <div className="mt-1 text-sm text-slate-500">
                {isAr ? 'اضغط على أي مرحلة للتغيير' : 'tap any stage to switch'}
              </div>
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
                  {isAr && !textLooksArabic(normalizeCopy(activePhase.label))
                    ? labels.window[recoveryWindow]
                    : normalizeCopy(activePhase.label)}
                </div>
                <div className="mt-1 text-xs text-slate-500">{normalizeCopy(activePhase.duration)}</div>
                {stageFocusText ? <p className="mt-3 text-sm leading-7 text-slate-700">{stageFocusText}</p> : null}
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {phaseGoals.map((item) => <li key={item} className="rounded-xl bg-white px-3 py-2">{item}</li>)}
                </ul>

                {selectedStagePlan?.progressionMarkers?.length ? (
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'علامات الانتقال للمرحلة التالية' : 'Ready to progress when'}
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedStagePlan.progressionMarkers.map((item) => (
                        <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {selectedStagePlan?.cautions?.length ? (
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'تجنب' : 'Avoid'}
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedStagePlan.cautions.map((item) => (
                        <li key={item} className="rounded-xl bg-amber-50 px-3 py-2">{normalizeCopy(item)}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activePhase.nutritionNotes?.length ? (
                  <div className="mt-4">
                    <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      {isAr ? 'ملاحظات التغذية لهذه المرحلة' : 'Nutrition notes for this phase'}
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {activePhase.nutritionNotes.map((item) => (
                        <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-health-green/20 bg-health-green/5 p-6 shadow-sm">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-health-green-dark">
                  Ask AI About Your Phase
                </div>
                <div className="text-lg font-black text-slate-900">
                  {isAr ? 'اسأل الذكاء الاصطناعي عن مرحلتك الحالية' : 'Ask AI about your current stage'}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {isAr
                    ? `سيفتح لك المساعد بسؤال جاهز عن ${normalizeCopy(activePhase.label)} في ${injuryDisplayName}.`
                    : `This opens the assistant with a ready-made question about the ${normalizeCopy(activePhase.label)} phase for ${injuryDisplayName}.`}
                </p>
                <Link
                  to={askPhaseLink}
                  className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-health-green px-4 py-3 text-sm font-bold text-white"
                >
                  {isAr ? 'افتح المساعد لهذه المرحلة' : 'Open AI for this phase'}
                </Link>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التمارين المناسبة' : 'Rehab exercise focus'}</div>
                {activePhase.exercisePlans?.length ? (
                  <div className="space-y-3">
                    {activePhase.exercisePlans.map((plan, idx) => (
                      <div key={`${plan.label}-${idx}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="font-bold text-slate-900">{normalizeCopy(plan.label)}</div>
                        {(plan.sets || plan.reps || plan.rest || plan.equipment) ? (
                          <div className="mt-2 space-y-1 text-sm text-slate-700">
                            {plan.sets ? <div><span className="font-semibold">{isAr ? 'سِت:' : 'Sets'} </span>{normalizeCopy(plan.sets)}</div> : null}
                            {plan.reps ? <div><span className="font-semibold">{isAr ? 'تكرارات:' : 'Reps'} </span>{normalizeCopy(plan.reps)}</div> : null}
                            {plan.rest ? <div><span className="font-semibold">{isAr ? 'راحة:' : 'Rest'} </span>{normalizeCopy(plan.rest)}</div> : null}
                            {plan.equipment ? <div><span className="font-semibold">{isAr ? 'معدات:' : 'Equipment'} </span>{normalizeCopy(plan.equipment)}</div> : null}
                          </div>
                        ) : null}

                        {plan.alternatives?.length ? (
                          <div className="mt-3 text-sm">
                            <div className="font-bold text-slate-900">{isAr ? 'بدائل:' : 'Alternatives:'}</div>
                            <ul className="mt-2 space-y-1">
                              {plan.alternatives.map((item) => (
                                <li key={item} className="rounded-xl bg-white px-3 py-2 text-slate-700">{normalizeCopy(item)}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {plan.cues?.length ? (
                          <div className="mt-3 text-sm">
                            <div className="font-bold text-slate-900">{isAr ? 'ملاحظات التنفيذ:' : 'Cues:'}</div>
                            <ul className="mt-2 space-y-1">
                              {plan.cues.map((item) => (
                                <li key={item} className="rounded-xl bg-white px-3 py-2 text-slate-700">{normalizeCopy(item)}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm text-slate-700">
                    {exerciseFocus.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
                  </ul>
                )}
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'التركيز الغذائي' : 'Nutrition focus now'}</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {nutritionFocus.map((item) => <li key={item} className="rounded-xl bg-slate-50 px-3 py-3">{item}</li>)}
                </ul>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 font-black text-slate-900">{isAr ? 'الأطعمة والوجبات لهذه المرحلة' : 'Foods & meals for this phase'}</div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{isAr ? 'أطعمة موصى بها' : 'Recommended foods'}</div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {activePhase.recommendedFoods.length
                        ? activePhase.recommendedFoods.map((item) => (
                            <li key={item} className="rounded-xl bg-white px-3 py-2">
                              {normalizeCopy(item)}
                            </li>
                          ))
                        : <li className="rounded-xl bg-white px-3 py-2 text-slate-500">{isAr ? '—' : '—'}</li>}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{isAr ? 'أطعمة يجب تجنبها' : 'Avoid foods'}</div>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {activePhase.avoidFoods.length
                        ? activePhase.avoidFoods.map((item) => (
                            <li key={item} className="rounded-xl bg-amber-50 px-3 py-2">
                              {normalizeCopy(item)}
                            </li>
                          ))
                        : <li className="rounded-xl bg-amber-50 px-3 py-2 text-slate-500">{isAr ? '—' : '—'}</li>}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 text-sm font-bold text-slate-900">{isAr ? 'أمثلة الوجبات' : 'Meal examples'}</div>

                  <div className="space-y-2 text-sm text-slate-700">
                    <div><span className="font-semibold">{isAr ? 'الإفطار' : 'Breakfast'}:</span> {normalizeCopy(activePhase.meals.breakfast)}</div>
                    <div><span className="font-semibold">{isAr ? 'الغداء' : 'Lunch'}:</span> {normalizeCopy(activePhase.meals.lunch)}</div>
                    <div><span className="font-semibold">{isAr ? 'العشاء' : 'Dinner'}:</span> {normalizeCopy(activePhase.meals.dinner)}</div>
                    {activePhase.meals.snack ? (
                      <div><span className="font-semibold">{isAr ? 'سناك' : 'Snack'}:</span> {normalizeCopy(activePhase.meals.snack)}</div>
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{isAr ? 'قائمة التسوق' : 'Shopping list'}</div>
                    {activePhase.meals.shoppingList.length ? (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {activePhase.meals.shoppingList.map((item) => (
                          <li key={item}>{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-slate-500">{isAr ? 'لا توجد قائمة تسوق.' : 'No shopping list.'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Full phase-by-phase protocol</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  This section shows every rehab phase in sequence, including goals, precautions, progression markers, and detailed exercise plans.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {injury.phases.map((phase, index) => (
                <article
                  key={`${phase.id}-${index}`}
                  id={buildStageAnchor(phase.id, index)}
                  className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{`Phase ${index + 1}`}</div>
                      <h3 className="mt-1 text-lg font-black text-slate-900">{normalizeCopy(phase.label)}</h3>
                      <div className="mt-1 text-sm text-slate-500">{normalizeCopy(phase.duration)}</div>
                    </div>
                    {phase.focus ? (
                      <div className="max-w-xl rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                        {normalizeCopy(phase.focus)}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Goals</div>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {phase.goals.map((item) => (
                          <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Precautions</div>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {(phase.cautions?.length ? phase.cautions : ['No extra precautions recorded.']).map((item) => (
                          <li key={item} className="rounded-xl bg-amber-50 px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Progression markers</div>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {(phase.progressionMarkers?.length ? phase.progressionMarkers : ['No extra progression markers recorded.']).map((item) => (
                          <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <div className="mb-3 text-sm font-black text-slate-900">Detailed exercise plan</div>
                    {phase.exercisePlans?.length ? (
                      <div className="space-y-3">
                        {phase.exercisePlans.map((plan, planIndex) => (
                          <div key={`${plan.label}-${planIndex}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="font-bold text-slate-900">{normalizeCopy(plan.label)}</div>
                            {plan.sets ? (
                              <div className="mt-2 text-sm text-slate-700">
                                <span className="font-semibold">Dose: </span>
                                {normalizeCopy(plan.sets)}
                              </div>
                            ) : null}
                            {plan.cues?.length ? (
                              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                {plan.cues.map((item) => (
                                  <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2 text-sm text-slate-700">
                        {phase.exercises.map((item) => (
                          <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {phase.nutritionNotes?.length ? (
                    <div className="mt-4 rounded-2xl bg-health-green/5 p-4">
                      <div className="mb-2 text-sm font-black text-slate-900">Nutrition notes for this phase</div>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {phase.nutritionNotes.map((item) => (
                          <li key={item} className="rounded-xl bg-white px-3 py-2">{normalizeCopy(item)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-black text-slate-900">
                <Pill className="h-4 w-4 text-health-green" />
                <span>{isAr ? 'المكملات والسلامة' : 'Supplements and safety'}</span>
              </div>
              <div className="space-y-2">
                {activePhase.supplements.map((item) => (
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
                <DrugNutrientChecker lang={lang} embedded initialQuery={activePhase.supplements.map((item) => item.name).join(' and ')} />
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





