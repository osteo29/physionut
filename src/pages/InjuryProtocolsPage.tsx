import {useEffect, useMemo, useRef, useState} from 'react';
import {AlertTriangle, ArrowRight, Beef, ClipboardList, Pill, ShieldAlert, Timer} from 'lucide-react';
import {Link} from 'react-router-dom';
import DrugNutrientChecker from '../components/ai/DrugNutrientChecker';
import AuthLockedPdfAction from '../components/pdf/AuthLockedPdfAction';
import PdfReportSheet from '../components/pdf/PdfReportSheet';
import Seo from '../components/seo/Seo';
import {getCurrentUser, isSupabaseConfigured, onSupabaseAuthChange, type User} from '../lib/supabase';
import {
  buildRecoveryPdfData,
  generatePdfReport,
} from '../services/pdfReports';
import {
  generateRecoveryPlan,
  getAllBodyRegions,
  getAllCategories,
  getAllInjuries,
  getSuggestedPhaseForWindow,
  type ActivityProfile,
  type DietStyle,
  type RecoveryGoal,
  type RecoveryWindow,
} from '../services/injuryDatabase';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

const profiles: ActivityProfile[] = ['general', 'athlete', 'older_adult', 'post_op'];
const goals: RecoveryGoal[] = ['calm', 'mobility', 'strength', 'return'];
const recoveryWindows: RecoveryWindow[] = ['under_48h', 'days_3_14', 'weeks_2_6', 'over_6_weeks'];
const diets: DietStyle[] = ['omnivore', 'vegetarian'];

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const injuries = useMemo(() => getAllInjuries(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const bodyRegions = useMemo(() => getAllBodyRegions(), []);
  const [category, setCategory] = useState('all');
  const [bodyRegion, setBodyRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState<ActivityProfile>('general');
  const [goal, setGoal] = useState<RecoveryGoal>('calm');
  const [recoveryWindow, setRecoveryWindow] = useState<RecoveryWindow>('under_48h');
  const [diet, setDiet] = useState<DietStyle>('omnivore');
  const [weightKg, setWeightKg] = useState(70);
  const [selectedInjuryId, setSelectedInjuryId] = useState(injuries[0]?.id ?? '');
  const [selectedPhaseId, setSelectedPhaseId] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfReport, setPdfReport] = useState<Awaited<ReturnType<typeof buildRecoveryPdfData>> | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return injuries.filter((injury) => {
      const byCategory = category === 'all' || injury.category === category;
      const byRegion = bodyRegion === 'all' || injury.bodyRegion === bodyRegion;
      const byQuery =
        !q ||
        injury.name.toLowerCase().includes(q) ||
        injury.overview.toLowerCase().includes(q) ||
        injury.commonIn.some((item) => item.toLowerCase().includes(q));
      return byCategory && byRegion && byQuery;
    });
  }, [bodyRegion, category, injuries, query]);

  useEffect(() => {
    const architectRaw = globalThis.window.localStorage.getItem('physiohub_architect_profile');
    const trackingRaw = globalThis.window.localStorage.getItem('physio_health_profile');

    try {
      const source = architectRaw || trackingRaw;
      if (!source) return;
      const parsed = JSON.parse(source) as {weight?: number};
      if (typeof parsed.weight === 'number' && parsed.weight > 0) {
        setWeightKg(parsed.weight);
      }
    } catch {
      // Ignore invalid saved profile payloads.
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser(null);
      return;
    }

    let mounted = true;

    void getCurrentUser()
      .then((currentUser) => {
        if (mounted) setUser(currentUser);
      })
      .catch(() => {
        if (mounted) setUser(null);
      });

    const subscription = onSupabaseAuthChange((_, session) => {
      if (!mounted) return;
      setUser(session?.user || null);
    }).data.subscription;

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const selectedInjury =
    filtered.find((injury) => injury.id === selectedInjuryId) ||
    injuries.find((injury) => injury.id === selectedInjuryId) ||
    filtered[0] ||
    injuries[0];

  useEffect(() => {
    if (!selectedInjury) return;
    const suggested = getSuggestedPhaseForWindow(selectedInjury, recoveryWindow);
    setSelectedPhaseId((current) =>
      selectedInjury.phases.some((phase) => phase.id === current) ? current : suggested.id,
    );
  }, [recoveryWindow, selectedInjury]);

  const phase =
    selectedInjury?.phases.find((item) => item.id === selectedPhaseId) || selectedInjury?.phases[0];

  const plan = useMemo(() => {
    if (!phase) return null;
    return generateRecoveryPlan({weightKg, phase, profile, goal, dietStyle: diet});
  }, [diet, goal, phase, profile, weightKg]);

  const labels = {
    title: isAr ? 'بروتوكولات الإصابات والتغذية العلاجية' : 'Injury Recovery Nutrition Protocols',
    description: isAr
      ? 'مكتبة علاجية عملية تشرح ما يهم كل إصابة في التغذية والتعافي، مع مراحل تفاعلية وخطة يومية حسب الوزن.'
      : 'A practical injury recovery library with interactive phases and a weight-based daily plan.',
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
      return: isAr ? 'العودة للملعب' : 'Return to sport',
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

  const handleDownloadRecoveryPdf = async () => {
    if (!user || !selectedInjury || !phase || !plan || isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    try {
      const report = await buildRecoveryPdfData({
        lang,
        user,
        injuryName: selectedInjury.name,
        phaseLabel: phase.label,
        phaseDuration: phase.duration,
        weightKg,
        profileLabel: labels.profile[profile],
        goalLabel: labels.goal[goal],
        dietLabel: labels.diet[diet],
        planSummary: [
          {label: isAr ? 'البروتين اليومي' : 'Daily protein', value: `${plan.proteinTotalGrams} g`},
          {label: isAr ? 'السوائل' : 'Hydration', value: `${plan.hydrationTargetMl} ml`},
          {label: isAr ? 'الكولاجين' : 'Collagen', value: plan.collagenDoseGrams ? `${plan.collagenDoseGrams} g` : '—'},
          {label: isAr ? 'الكرياتين' : 'Creatine', value: plan.creatineGrams ? `${plan.creatineGrams} g` : '—'},
        ],
        meals: [
          {label: isAr ? 'فطور' : 'Breakfast', value: plan.meals.breakfast},
          {label: isAr ? 'غداء' : 'Lunch', value: plan.meals.lunch},
          {label: isAr ? 'عشاء' : 'Dinner', value: plan.meals.dinner},
          ...(plan.meals.snack
            ? [{label: isAr ? 'سناك / قبل التمرين' : 'Snack / pre-rehab', value: plan.meals.snack}]
            : []),
        ],
        shoppingList: phase.meals.shoppingList,
        supplementSchedule: phase.supplements,
        safetyNotes: [...selectedInjury.safetyNotes.medications, ...selectedInjury.safetyNotes.supplements],
        redFlags: selectedInjury.redFlags,
      });

      setPdfReport(report);
      await new Promise((resolve) => window.setTimeout(resolve, 80));

      if (!pdfRef.current) {
        throw new Error('PDF report view is not ready.');
      }

      const safeName = `${selectedInjury.id}-${phase.id}`.replace(/[^a-z0-9-_]/gi, '-');
      await generatePdfReport({
        element: pdfRef.current,
        fileName: `${safeName}-physionutrition-recovery-report.pdf`,
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <Seo title={labels.title} description={labels.description} canonicalPath="/injury-protocols" />
      <PageLayout title={labels.title}>
        <div className="space-y-8 not-prose">
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{isAr ? 'مكتبة علاجية عملية' : 'Practical rehab library'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {isAr ? 'اعرف ماذا يهم كل إصابة في التغذية والتعافي' : 'See what matters nutritionally at each stage'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{labels.description}</p>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Timer className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'مساعد التعافي السريع' : 'Quick recovery tool'}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isAr ? 'ابحث: ACL أو shoulder أو running' : 'Search: ACL, shoulder, running'}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              />
              <input
                type="number"
                min="0"
                max="250"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(0, Math.min(250, Number(e.target.value) || 0)))}
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20"
              />
              <select value={recoveryWindow} onChange={(e) => setRecoveryWindow(e.target.value as RecoveryWindow)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {recoveryWindows.map((item) => (
                  <option key={item} value={item}>
                    {labels.window[item]}
                  </option>
                ))}
              </select>
              <select value={profile} onChange={(e) => setProfile(e.target.value as ActivityProfile)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {profiles.map((item) => (
                  <option key={item} value={item}>
                    {labels.profile[item]}
                  </option>
                ))}
              </select>
              <select value={goal} onChange={(e) => setGoal(e.target.value as RecoveryGoal)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {goals.map((item) => (
                  <option key={item} value={item}>
                    {labels.goal[item]}
                  </option>
                ))}
              </select>
              <select value={diet} onChange={(e) => setDiet(e.target.value as DietStyle)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                {diets.map((item) => (
                  <option key={item} value={item}>
                    {labels.diet[item]}
                  </option>
                ))}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                <option value="all">{isAr ? 'كل الفئات' : 'All categories'}</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select value={bodyRegion} onChange={(e) => setBodyRegion(e.target.value)} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-health-green focus:ring-2 focus:ring-health-green/20">
                <option value="all">{isAr ? 'كل المناطق' : 'All body regions'}</option>
                {bodyRegions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-2">
                {filtered.map((injury) => (
                  <button
                    key={injury.id}
                    type="button"
                    onClick={() => setSelectedInjuryId(injury.id)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      selectedInjury?.id === injury.id
                        ? 'border-health-green bg-health-green/5'
                        : 'border-slate-200 bg-slate-50 hover:border-health-green/30'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{injury.name}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {injury.category} • {injury.bodyRegion}
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {selectedInjury && phase ? (
              <section className="space-y-6">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-soft-blue px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-medical-blue">
                    <Timer className="h-3.5 w-3.5" />
                    <span>
                      {selectedInjury.category} • {selectedInjury.bodyRegion}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">{selectedInjury.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{selectedInjury.overview}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {selectedInjury.phases.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedPhaseId(item.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          item.id === phase.id
                            ? 'border-health-green bg-health-green/5'
                            : 'border-slate-200 bg-slate-50 hover:border-health-green/30'
                        }`}
                      >
                        <div className="font-black text-slate-900">{item.label}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.duration}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {plan ? (
                  <div className="rounded-[2rem] border border-health-green/20 bg-health-green/5 p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-sm font-bold text-health-green-dark">
                      <Beef className="h-4 w-4" />
                      <span>{isAr ? 'خطة يومية حسب الوزن' : 'Weight-based daily plan'}</span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-4">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'البروتين' : 'Protein'}</div>
                        <div className="mt-2 text-2xl font-black text-slate-900">{plan.proteinTotalGrams} g</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'السوائل' : 'Hydration'}</div>
                        <div className="mt-2 text-2xl font-black text-slate-900">{plan.hydrationTargetMl} ml</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'الكولاجين' : 'Collagen'}</div>
                        <div className="mt-2 text-2xl font-black text-slate-900">{plan.collagenDoseGrams ? `${plan.collagenDoseGrams} g` : '—'}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{isAr ? 'الكرياتين' : 'Creatine'}</div>
                        <div className="mt-2 text-2xl font-black text-slate-900">{plan.creatineGrams ? `${plan.creatineGrams} g` : '—'}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'توزيع البروتين' : 'Protein distribution'}</div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{isAr ? 'فطور' : 'Breakfast'}: {plan.proteinDistribution.breakfast} g</div>
                          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{isAr ? 'غداء' : 'Lunch'}: {plan.proteinDistribution.lunch} g</div>
                          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{isAr ? 'عشاء' : 'Dinner'}: {plan.proteinDistribution.dinner} g</div>
                          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{isAr ? 'سناك' : 'Snack'}: {plan.proteinDistribution.snack} g</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'أمثلة الوجبات' : 'Meal examples'}</div>
                        <div className="space-y-2 text-sm text-slate-700">
                          <div className="rounded-xl bg-slate-50 px-3 py-2">{isAr ? 'فطور' : 'Breakfast'}: {plan.meals.breakfast}</div>
                          <div className="rounded-xl bg-slate-50 px-3 py-2">{isAr ? 'غداء' : 'Lunch'}: {plan.meals.lunch}</div>
                          <div className="rounded-xl bg-slate-50 px-3 py-2">{isAr ? 'عشاء' : 'Dinner'}: {plan.meals.dinner}</div>
                          {plan.meals.snack ? (
                            <div className="rounded-xl bg-slate-50 px-3 py-2">{isAr ? 'سناك' : 'Snack'}: {plan.meals.snack}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-6 xl:grid-cols-2">
                  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="font-black text-slate-900">{phase.label}</div>
                    <div className="mt-1 text-sm text-slate-500">{phase.duration}</div>
                    <div className="mt-4 grid gap-4">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'أهداف المرحلة' : 'Stage goals'}</div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {phase.goals.map((item) => (
                            <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'محاور التغذية' : 'Nutrition focus'}</div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {phase.nutritionFocus.map((item) => (
                            <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'المكملات الشائعة' : 'Common supplements'}</div>
                        <div className="space-y-2">
                          {phase.supplements.map((item) => (
                            <div key={item.name} className="rounded-xl bg-white px-3 py-3 text-sm text-slate-700 shadow-sm">
                              <div className="font-bold text-slate-900">{item.name} • {item.dose}</div>
                              <div className="mt-1">{item.reason}</div>
                              {item.timing ? <div className="mt-1 text-xs font-semibold text-health-green-dark">{item.timing}</div> : null}
                              {item.caution ? <div className="mt-1 text-xs font-semibold text-amber-700">{item.caution}</div> : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="font-bold text-slate-900">{isAr ? 'الأكل العملي الآن' : 'Practical food support now'}</div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="mb-2 font-bold text-slate-900">{isAr ? 'مناسب الآن' : 'Helpful foods now'}</div>
                          <ul className="space-y-2 text-sm text-slate-700">
                            {phase.recommendedFoods.map((item) => (
                              <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-amber-50 p-4">
                          <div className="mb-2 font-bold text-slate-900">{isAr ? 'الأشياء الأقل فائدة' : 'Less helpful right now'}</div>
                          <ul className="space-y-2 text-sm text-slate-700">
                            {phase.avoidFoods.map((item) => (
                              <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'قائمة تسوق سريعة' : 'Mini shopping list'}</div>
                        <div className="flex flex-wrap gap-2">
                          {phase.meals.shoppingList.map((item) => (
                            <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="font-bold text-slate-900">{isAr ? 'الحركة والسلامة' : 'Movement and safety'}</div>
                      <div className="mt-4 grid gap-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="mb-2 font-bold text-slate-900">{isAr ? 'تركيزات مناسبة' : 'Useful rehab focus'}</div>
                          <ul className="space-y-2 text-sm text-slate-700">
                            {phase.exercises.map((item) => (
                              <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-rose-50 p-4">
                          <div className="mb-2 font-bold text-slate-900">{isAr ? 'حركات ممنوعة الآن' : 'Movements to avoid now'}</div>
                          <ul className="space-y-2 text-sm text-slate-700">
                            {phase.prohibitedMovements.map((item) => (
                              <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
                  <div className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <span>{isAr ? 'راجع مختص بسرعة إذا ظهر التالي' : 'Seek prompt medical review if these appear'}</span>
                  </div>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {selectedInjury.redFlags.map((item) => (
                      <li key={item} className="rounded-xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <ShieldAlert className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'افحص أمان المكملات مع أدويتك' : 'Check supplement safety against medications'}</span>
                  </div>
                  <DrugNutrientChecker lang={lang} embedded initialQuery={phase.supplements.map((item) => item.name).join(' and ')} />
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Pill className="h-4 w-4 text-health-green" />
                    <span>{isAr ? 'تقرير PDF للتعافي' : 'Recovery PDF report'}</span>
                  </div>
                  <p className="mb-4 text-sm leading-7 text-slate-600">
                    {isAr
                      ? 'أنشئ تقريرًا أنيقًا للطباعة يحتوي على المرحلة الحالية، أرقامك المخصصة، الوجبات، المكملات، وتنبيهات الأمان.'
                      : 'Generate a polished printable report with the current phase, personalized targets, meals, supplements, and safety notes.'}
                  </p>
                  <AuthLockedPdfAction
                    isAuthenticated={Boolean(user)}
                    lang={lang}
                    onAuthorized={() => {
                      void handleDownloadRecoveryPdf();
                    }}
                    buttonLabel={isGeneratingPdf ? (isAr ? 'جارٍ تجهيز التقرير...' : 'Preparing report...') : isAr ? 'تحميل تقرير التعافي PDF' : 'Download recovery PDF'}
                    teaserTitle={isAr ? 'سجّل الدخول لفتح تقرير التعافي' : 'Sign in to unlock the recovery report'}
                  />
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-500">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>{isAr ? 'مهم قبل التطبيق' : 'Before applying anything'}</span>
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-slate-700">
                    {isAr
                      ? 'هذه الصفحة تعليمية وعملية وليست وصفة طبية شخصية. لو عندك جراحة حديثة، مرض مزمن، أدوية يومية، ألم مستمر، أو أعراض عصبية، راجع مختص قبل تعديل المكملات أو خطة الأكل.'
                      : 'This page is practical education, not a personal prescription. If you have recent surgery, chronic disease, daily medications, persistent pain, or neurological symptoms, review supplement and nutrition changes with a qualified clinician.'}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link to="/calculators" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white">
                      <span>{isAr ? `طبّق هدف البروتين (${plan?.proteinTotalGrams ?? 0} جم)` : `Use the ${plan?.proteinTotalGrams ?? 0} g protein target`}</span>
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                    <Link to="/assistant" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700">
                      {isAr ? 'اسأل المساعد عن هذه الحالة' : 'Ask the assistant about this injury'}
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
        <div className="fixed -left-[200vw] top-0 opacity-0 pointer-events-none">
          {pdfReport ? (
            <div ref={pdfRef}>
              <PdfReportSheet report={pdfReport} />
            </div>
          ) : null}
        </div>
      </PageLayout>
    </>
  );
}
