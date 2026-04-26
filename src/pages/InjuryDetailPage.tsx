import {Fragment, lazy, Suspense, useEffect, useState} from 'react';
import {ArrowRight, AlertTriangle, Pill, ShieldAlert} from 'lucide-react';
import {Link, Navigate, useParams} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import {
  type InjuryProtocol,
} from '../services/injuryDatabase';
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

export default function InjuryDetailPage() {
  const {slug = ''} = useParams();
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const [injury, setInjury] = useState<InjuryProtocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [catalogInjuries, setCatalogInjuries] = useState<InjuryCatalogEntry[]>([]);
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
      setCatalogInjuries(catalog.injuries);
      setLoading(false);
    };

    void load();
    return () => { active = false; };
  }, [lang, slug]);

  // When injury loads, make sure active tab is reset or within bounds
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
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
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

  const relatedInjuries = catalogInjuries
    .filter((item) => item.id !== injury.id)
    .filter((item) => item.category === categoryDisplay || item.bodyRegion === bodyRegionDisplay)
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

  const medicationNotes = [...injury.safetyNotes.medications, ...injury.safetyNotes.supplements].map(normalizeCopy);
  const askPhasePrompt = isAr
    ? `أنا في مرحلة التعافي من ${injuryDisplayName}. اشرح لي ماذا أركز عليه الآن، ما التمارين المناسبة، ومتى أستطيع الانتقال للمرحلة التالية؟`
    : `I am recovering from ${injuryDisplayName}. Explain what I should focus on now, which exercises fit this phase, and when I can move to the next phase.`;
  const askPhaseLink = `/${lang}/assistant?prompt=${encodeURIComponent(askPhasePrompt)}`;

  const faqItems = [
    {
      q: isAr ? 'ما هو الهدف الأساسي من هذا البروتوكول؟' : 'What is the main goal of this protocol?',
      a: isAr ? 'التدرج الآمن في التحميل وإعادة الأنسجة لطبيعتها لتجنب الإصابة مرة أخرى.' : 'Gradual safe loading and restoring tissue capacity to prevent re-injury.'
    },
    {
      q: isAr ? 'متى أراجع طبيباً؟' : 'When should I see a doctor?',
      a: isAr ? 'إذا زاد الألم بشكل حاد، أو ظهر تورم مفاجئ، أو عدم استقرار ملحوظ في المفصل.' : 'If you experience sharp pain, sudden swelling, or noticeable joint instability.'
    }
  ];

  const path = buildPath(injury.id, lang);
  const canonicalInjuryId = INJURY_CANONICAL_PARENT_MAP[injury.id] || injury.id;
  const canonicalPath = buildPath(canonicalInjuryId, lang);
  
  const labels = {
    title: isAr ? `بروتوكول ${injuryDisplayName}` : `${injuryDisplayName} Recovery Protocol`,
    description: isAr
      ? `البروتوكول الطبي لـ ${injuryDisplayName} شامل التمارين، المعايير الطبية، والتدرج في كل مرحلة.`
      : `Clinical rehab protocol for ${injuryDisplayName} including exercises, medical criteria, and phased progression.`,
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
          
          <section className="text-center py-6">
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">{injuryDisplayName}</h1>
            <div className="mt-4 flex justify-center gap-2">
               <span className="inline-flex items-center rounded-full bg-health-green/10 px-3 py-1 text-sm font-semibold text-health-green-dark">
                 {categoryDisplay}
               </span>
               <span className="inline-flex items-center rounded-full bg-health-green/10 px-3 py-1 text-sm font-semibold text-health-green-dark">
                 {bodyRegionDisplay}
               </span>
            </div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {isAr 
                ? 'بروتوكول التأهيل مفصل خطوة بخطوة للعودة لوظيفتك الطبيعية. التزم بالتمارين والمعايير المحددة في كل مرحلة لضمان استشفاء آمن وفعال.' 
                : 'Step-by-step clinical rehab protocol to restore function. Follow the prescribed exercises and progression criteria in each phase.'}
            </p>
          </section>

          {/* TABS HEADER */}
          <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar pb-1 gap-6">
            {injury.phases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap px-4 py-3 font-bold transition-all border-b-4 ${
                  activeTab === index 
                  ? 'border-health-green text-health-green-dark' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {isAr ? `مرحلة ${index + 1}: ${normalizeCopy(phase.label)}` : `Phase ${index + 1}: ${normalizeCopy(phase.label)}`}
              </button>
            ))}
            <button
              onClick={() => setActiveTab(injury.phases.length)}
              className={`whitespace-nowrap px-4 py-3 font-bold transition-all border-b-4 ${
                isNutritionTab
                ? 'border-amber-500 text-amber-700' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {isAr ? 'التغذية والمكملات' : 'Nutrition & Supplements'}
            </button>
          </div>

          {/* ACTIVE TAB CONTENT */}
          {currentPhase && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
               <div className="lg:col-span-2">
                 <h2 className="text-xl font-black text-slate-900 mb-4">{isAr ? 'التمارين العلاجية' : 'Therapeutic Exercises'}</h2>
                 <div className="space-y-4">
                   {currentPhase.exercisePlans?.length ? (
                     currentPhase.exercisePlans.map((plan, idx) => (
                       <div key={idx} className="bg-white p-5 rounded-[1.5rem] border-l-4 border-l-health-green border-y border-r border-slate-200 shadow-sm transition hover:shadow-md">
                         <h3 className="font-black text-lg text-slate-900">{normalizeCopy(plan.label)}</h3>
                         {plan.sets && (
                           <div className="mt-2 text-sm font-semibold text-slate-600 bg-slate-50 inline-block px-3 py-1 rounded-lg border border-slate-100">
                             {isAr ? 'الجرعة (Prescription):' : 'Prescription:'} <span className="text-health-green-dark">{normalizeCopy(plan.sets)}</span>
                           </div>
                         )}
                         {plan.cues?.length ? (
                           <div className="mt-3 text-sm text-slate-700 space-y-1">
                             {plan.cues.map((cue, i) => (
                               <div key={i} className="flex gap-2 items-start">
                                 <span className="text-health-green mt-0.5">•</span>
                                 <p className="leading-relaxed">{normalizeCopy(cue)}</p>
                               </div>
                             ))}
                           </div>
                         ) : null}
                       </div>
                     ))
                   ) : (
                     <div className="text-slate-500 bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                       {isAr ? 'لا توجد تمارين مفصلة مسجلة لهذه المرحلة.' : 'No detailed exercises recorded for this phase.'}
                     </div>
                   )}
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-200 shadow-sm">
                   <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                      {isAr ? 'الأهداف (Goals)' : 'Goals'}
                   </h3>
                   <ul className="space-y-2 text-sm text-slate-700">
                     {currentPhase.goals.map((goal, idx) => (
                       <li key={idx} className="flex gap-2 items-start">
                         <span className="text-health-green mt-0.5">✓</span>
                         <span className="leading-relaxed">{normalizeCopy(goal)}</span>
                       </li>
                     ))}
                   </ul>
                 </div>

                 <div className="bg-amber-50 p-5 rounded-[1.5rem] border border-amber-200 shadow-sm">
                   <h3 className="font-black text-amber-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {isAr ? 'المحاذير (Precautions)' : 'Precautions'}
                   </h3>
                   <ul className="space-y-2 text-sm text-amber-900">
                     {currentPhase.cautions?.length ? currentPhase.cautions.map((prec, idx) => (
                       <li key={idx} className="flex gap-2 items-start">
                         <span className="text-amber-500 mt-0.5">•</span>
                         <span className="leading-relaxed">{normalizeCopy(prec)}</span>
                       </li>
                     )) : <li>{isAr ? 'لا يوجد محاذير إضافية.' : 'No extra precautions.'}</li>}
                   </ul>
                 </div>

                 <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-200 shadow-sm">
                   <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                      {isAr ? 'معايير الانتقال للمرحلة التالية' : 'Criteria to Progress'}
                   </h3>
                   <ul className="space-y-2 text-sm text-slate-700">
                     {currentPhase.progressionMarkers?.length ? currentPhase.progressionMarkers.map((crit, idx) => (
                       <li key={idx} className="flex gap-2 items-start">
                         <span className="text-blue-500 mt-0.5">→</span>
                         <span className="leading-relaxed">{normalizeCopy(crit)}</span>
                       </li>
                     )) : <li>{isAr ? 'حسب توجيهات الأخصائي.' : 'As directed by clinician.'}</li>}
                   </ul>
                 </div>
               </div>
             </div>
          )}

          {isNutritionTab && (
            <div className="animate-in fade-in duration-300 grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 mb-4">{isAr ? 'ملاحظات التغذية السريعة' : 'Nutrition Notes'}</h2>
                  {injury.pageContent?.nutritionNotes?.length ? (
                    <ul className="space-y-3 text-slate-700">
                      {injury.pageContent.nutritionNotes.map((n, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-amber-500 mt-0.5">•</span>
                          <span className="leading-relaxed">{normalizeCopy(n)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm">
                      {isAr ? 'حافظ على نظام غذائي متوازن وغني بالبروتين لدعم الاستشفاء.' : 'Maintain a balanced, protein-rich diet to support recovery.'}
                    </div>
                  )}
               </div>

               <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 font-black text-slate-900">
                    <Pill className="h-5 w-5 text-health-green" />
                    <h2 className="text-xl">{isAr ? 'المكملات والسلامة' : 'Supplements and safety'}</h2>
                  </div>
                  {medicationNotes.length > 0 ? (
                    <ul className="space-y-3 text-slate-700">
                      {medicationNotes.map((item, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-health-green mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-xl text-slate-600 text-sm mb-6">
                      {isAr ? 'لا توجد ملاحظات خاصة بالمكملات لهذه الإصابة.' : 'No specific supplement notes for this injury.'}
                    </div>
                  )}
                  
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="mb-3 flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <ShieldAlert className="h-4 w-4 text-health-green" />
                      <span>{isAr ? 'افحص أمان المكملات' : 'Check supplement safety'}</span>
                    </div>
                    <Suspense fallback={<div className="text-slate-500 text-sm">Loading...</div>}>
                      <DrugNutrientChecker lang={lang} embedded initialQuery={""} />
                    </Suspense>
                  </div>
               </div>
            </div>
          )}

          {/* BOTTOM SECTIONS - PRESERVED */}
          <div className="pt-10 mt-10 border-t border-slate-200 space-y-6">
            <div className="rounded-[2rem] border border-health-green/20 bg-health-green/5 p-6 sm:p-8 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-health-green-dark">
                  Ask AI
                </div>
                <div className="text-lg font-black text-slate-900">
                  {isAr ? 'اسأل الذكاء الاصطناعي عن هذه الإصابة' : 'Ask AI about this protocol'}
                </div>
              </div>
              <Link
                to={askPhaseLink}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-6 py-4 text-sm font-bold text-white hover:bg-health-green-dark transition-colors whitespace-nowrap"
              >
                {isAr ? 'افتح المساعد' : 'Open AI Assistant'}
              </Link>
            </div>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 font-black text-slate-900">{isAr ? 'أسئلة شائعة' : 'FAQ'}</div>
              <div className="grid gap-3 md:grid-cols-2">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-2xl bg-slate-50 p-5">
                    <div className="font-bold text-slate-900">{item.q}</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {relatedExerciseLinks.length > 0 && (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-black text-slate-900">
                    {isAr ? 'تمارين قد تفيد هذه الإصابة' : 'Exercises that may support this injury'}
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {relatedExerciseLinks.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.href}
                      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                    >
                      <div className="mt-2 text-lg font-black text-slate-900">{item.label}</div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-health-green">
                        {isAr ? 'انتقل إلى القسم' : 'Go to section'}
                        <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            
            {relatedRehabLinks.length > 0 && (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-black text-slate-900">
                    {isAr ? 'صفحات التأهيل الموجه المناسبة' : 'Targeted rehab pages'}
                  </h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {relatedRehabLinks.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.href}
                      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-health-green/30 hover:bg-health-green/5"
                    >
                      <div className="mt-2 text-lg font-black text-slate-900">{item.label}</div>
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
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 font-black text-slate-900">{isAr ? 'إصابات مرتبطة' : 'Related injury pages'}</div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {relatedInjuries.map((item) => (
                    <Link key={item.id} to={buildPath(item.id, lang)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-health-green/30 hover:bg-health-green/5 flex items-center justify-between">
                      <div className="font-bold text-slate-900">{getLocalizedInjuryName(item.id, item.name, lang)}</div>
                      <ArrowRight className={`h-4 w-4 text-slate-400 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
