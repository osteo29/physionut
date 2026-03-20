import {useMemo, useState} from 'react';
import {AlertTriangle, ArrowRight, ClipboardList, Droplets, ShieldAlert, Timer, WheatOff} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import {getAllCategories, injuryDatabase, type Injury} from '../services/injuryDatabase';

function decodeMojibake(value?: string) {
  if (!value) return '';
  if (!/[ØÙÂ]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(value.split('').map((char) => char.charCodeAt(0)));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return value;
  }
}

function formatList(items?: string[]) {
  return (items || []).map((item) => decodeMojibake(item)).filter(Boolean);
}

function getStageOrder(injury: Injury) {
  return Object.entries(injury.stages);
}

export default function InjuryProtocolsPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const injuries = useMemo(() => Object.values(injuryDatabase), []);
  const categories = useMemo(() => getAllCategories(), []);
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const filteredInjuries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return injuries.filter((injury) => {
      const inCategory = category === 'all' || injury.category === category;
      const matchesQuery =
        !normalizedQuery ||
        injury.name.toLowerCase().includes(normalizedQuery) ||
        injury.category.toLowerCase().includes(normalizedQuery);
      return inCategory && matchesQuery;
    });
  }, [injuries, category, query]);
  const [selectedInjuryId, setSelectedInjuryId] = useState<string>(filteredInjuries[0]?.id || injuries[0]?.id || '');

  const selectedInjury =
    filteredInjuries.find((injury) => injury.id === selectedInjuryId) ||
    injuries.find((injury) => injury.id === selectedInjuryId) ||
    filteredInjuries[0] ||
    injuries[0];

  const title = isAr ? 'بروتوكولات الإصابات والتغذية العلاجية' : 'Injury Recovery Nutrition Protocols';
  const description = isAr
    ? 'صفحة عملية تجمع إصابات العلاج الطبيعي الشائعة مع مراحل التعافي، العناصر الغذائية، الأطعمة المقترحة، والتنبيهات المهمة.'
    : 'A practical library of common physical therapy injuries with recovery phases, key nutrients, suggested foods, and important cautions.';

  return (
    <>
      <Seo title={title} description={description} canonicalPath="/injury-protocols" />
      <PageLayout title={title}>
        <div className="space-y-8 not-prose">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>{isAr ? 'مكتبة علاجية عملية' : 'Practical rehab library'}</span>
            </div>
            <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {isAr ? 'اعرف ماذا يهم كل إصابة في التغذية والتعافي' : 'See what matters nutritionally at each stage of recovery'}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              {isAr
                ? 'بدل قائمة عامة للمكملات أو نصائح مبعثرة، الصفحة دي تنظم لك الإصابات الشائعة حسب الفئة ومرحلة التعافي، مع التركيز على ما يدعم الالتئام، القوة، الحركة، والسلامة.'
                : 'Instead of generic supplement advice, this page organizes common injuries by category and recovery stage so users can quickly understand what may support healing, strength, movement, and safety.'}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'عدد الإصابات' : 'Injuries'}
                </div>
                <div className="mt-2 text-3xl font-black text-slate-900">{injuries.length}</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'الفئات' : 'Categories'}
                </div>
                <div className="mt-2 text-3xl font-black text-slate-900">{categories.length}</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {isAr ? 'ماذا ستجد' : 'What you get'}
                </div>
                <div className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                  {isAr ? 'مراحل التعافي، مغذيات، أطعمة، ومحاذير' : 'Recovery phases, nutrients, foods, and cautions'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-slate-900">
                  {isAr ? 'ابحث عن الإصابة' : 'Search injury'}
                </label>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={isAr ? 'مثل ACL أو low back' : 'For example ACL or low back'}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-health-green focus:ring-2 focus:ring-health-green/20"
                />
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm font-bold text-slate-900">
                  {isAr ? 'الفئة' : 'Category'}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('all')}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      category === 'all' ? 'bg-health-green text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isAr ? 'الكل' : 'All'}
                  </button>
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        category === item ? 'bg-health-green text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-900">
                  {isAr ? 'الإصابات المتاحة' : 'Available injuries'}
                </div>
                <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
                  {filteredInjuries.map((injury) => {
                    const isSelected = selectedInjury?.id === injury.id;
                    return (
                      <button
                        key={injury.id}
                        type="button"
                        onClick={() => setSelectedInjuryId(injury.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                          isSelected
                            ? 'border-health-green bg-health-green/5'
                            : 'border-slate-200 bg-slate-50 hover:border-health-green/30'
                        }`}
                      >
                        <div className="font-bold text-slate-900">{injury.name}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {injury.category} • {injury.recoveryWeeks} {isAr ? 'أسبوعًا تقريبًا' : 'weeks approx.'}
                        </div>
                      </button>
                    );
                  })}
                  {!filteredInjuries.length ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                      {isAr ? 'لا توجد نتائج مطابقة الآن.' : 'No matching injuries found.'}
                    </div>
                  ) : null}
                </div>
              </div>
            </aside>

            {selectedInjury ? (
              <section className="space-y-6">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-soft-blue px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-medical-blue">
                        <Timer className="h-3.5 w-3.5" />
                        <span>{selectedInjury.category}</span>
                      </div>
                      <h2 className="text-3xl font-black text-slate-900">{selectedInjury.name}</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        {isAr
                          ? `هذا الملخص يساعدك على فهم ما قد يفيد في التغذية خلال التعافي الممتد تقريبًا إلى ${selectedInjury.recoveryWeeks} أسبوعًا، مع بقاء التقييم السريري هو الأساس.`
                          : `This overview helps users understand what may matter nutritionally over an estimated ${selectedInjury.recoveryWeeks}-week recovery window, while keeping clinical assessment as the priority.`}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm text-slate-700">
                      <div className="font-bold text-slate-900">{isAr ? 'المدة التقريبية' : 'Estimated recovery'}</div>
                      <div className="mt-1">
                        {selectedInjury.recoveryWeeks} {isAr ? 'أسبوعًا' : 'weeks'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {getStageOrder(selectedInjury).map(([stageKey, stage]) => (
                    <article key={stageKey} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                            {stageKey}
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">{decodeMojibake(stage.phase)}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            <span className="font-bold text-slate-900">{isAr ? 'التركيز: ' : 'Focus: '}</span>
                            {decodeMojibake(stage.focus)}
                          </p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {stage.proteinRequirement ? (
                            <div className="rounded-2xl bg-health-green/5 px-4 py-3 text-sm text-slate-700">
                              <div className="font-bold text-slate-900">{isAr ? 'البروتين' : 'Protein target'}</div>
                              <div>{decodeMojibake(stage.proteinRequirement)}</div>
                            </div>
                          ) : null}
                          {stage.waterRequirement ? (
                            <div className="rounded-2xl bg-medical-blue/5 px-4 py-3 text-sm text-slate-700">
                              <div className="flex items-center gap-2 font-bold text-slate-900">
                                <Droplets className="h-4 w-4 text-medical-blue" />
                                <span>{isAr ? 'السوائل' : 'Hydration'}</span>
                              </div>
                              <div>{decodeMojibake(stage.waterRequirement)}</div>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                          <h4 className="mb-3 font-bold text-slate-900">
                            {isAr ? 'المغذيات والمكملات الشائعة' : 'Key nutrients and supplements'}
                          </h4>
                          <div className="space-y-3">
                            {stage.nutrients.map((nutrient) => (
                              <div key={`${stageKey}-${nutrient.name}`} className="rounded-2xl bg-white p-4 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="font-bold text-slate-900">{nutrient.name}</div>
                                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                    {nutrient.dosage}
                                  </div>
                                </div>
                                <div className="mt-2 text-sm text-slate-600">
                                  {decodeMojibake(nutrient.purpose)}
                                </div>
                                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                                  {nutrient.evidence}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {formatList(stage.foods).length ? (
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                              <h4 className="mb-3 font-bold text-slate-900">
                                {isAr ? 'أطعمة مناسبة في هذه المرحلة' : 'Foods that may fit this stage'}
                              </h4>
                              <ul className="space-y-2 text-sm text-slate-700">
                                {formatList(stage.foods).map((item) => (
                                  <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {formatList(stage.avoid).length ? (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                              <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                                <WheatOff className="h-4 w-4 text-amber-600" />
                                <span>{isAr ? 'ما قد يبطئ التعافي أو يزعج المرحلة' : 'What may be less helpful now'}</span>
                              </h4>
                              <ul className="space-y-2 text-sm text-slate-700">
                                {formatList(stage.avoid).map((item) => (
                                  <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {formatList(stage.exercises).length ? (
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                              <h4 className="mb-3 font-bold text-slate-900">
                                {isAr ? 'ملاحظات تأهيلية مرتبطة بالمرحلة' : 'Rehab notes for this stage'}
                              </h4>
                              <ul className="space-y-2 text-sm text-slate-700">
                                {formatList(stage.exercises).map((item) => (
                                  <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {decodeMojibake(stage.protocol) ? (
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
                              <div className="font-bold text-slate-900">{isAr ? 'بروتوكول ملحوظ' : 'Named protocol'}</div>
                              <div className="mt-2">{decodeMojibake(stage.protocol)}</div>
                            </div>
                          ) : null}

                          {decodeMojibake(stage.position) ? (
                            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
                              <div className="font-bold text-slate-900">{isAr ? 'وضع أو حركة تحتاج انتباهًا' : 'Position note'}</div>
                              <div className="mt-2">{decodeMojibake(stage.position)}</div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {selectedInjury.contraindications ? (
                  <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-slate-900">
                      <ShieldAlert className="h-5 w-5 text-amber-600" />
                      <span>{isAr ? 'تنبيهات وتداخلات مهمة' : 'Important cautions and interactions'}</span>
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'مع أدوية معينة' : 'Medication notes'}</div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {formatList(selectedInjury.contraindications.medications).map((item) => (
                            <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mb-2 font-bold text-slate-900">{isAr ? 'مع مكملات معينة' : 'Supplement notes'}</div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {formatList(selectedInjury.contraindications.supplements).map((item) => (
                            <li key={item} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-500">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>{isAr ? 'مهم قبل التطبيق' : 'Before applying anything'}</span>
                  </div>
                  <p className="max-w-3xl text-sm leading-7 text-slate-700">
                    {isAr
                      ? 'هذه الصفحة تعليمية وليست وصفة علاجية شخصية. لو عندك جراحة حديثة، مرض مزمن، أدوية يومية، ألم مستمر، أو أعراض عصبية، راجع مختص علاج طبيعي أو طبيب أو أخصائي تغذية قبل تعديل المكملات أو الخطة الغذائية.'
                      : 'This page is educational, not a personal prescription. If the user has recent surgery, chronic disease, daily medications, persistent pain, or neurological symptoms, review any supplement or nutrition change with a physiotherapist, physician, or dietitian.'}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/calculators"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-health-green px-5 py-3 text-sm font-bold text-white"
                    >
                      <span>{isAr ? 'افتح الحاسبات المناسبة' : 'Open relevant calculators'}</span>
                      <ArrowRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                    <Link
                      to="/assistant"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
                    >
                      {isAr ? 'اسأل المساعد عن الحالة' : 'Ask the assistant about this injury'}
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
